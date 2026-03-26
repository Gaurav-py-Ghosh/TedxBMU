const Razorpay = require("razorpay");
const crypto = require("crypto");
const supabase = require("../../config/db");
const { createRegistration } = require("../registration/registration.service");

// Lazy-init Razorpay instance
let razorpayInstance = null;
const getRazorpay = () => {
    if (!razorpayInstance) {
        const key_id = process.env.RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;
        if (!key_id || !key_secret) {
            throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in .env");
        }
        razorpayInstance = new Razorpay({ key_id, key_secret });
    }
    return razorpayInstance;
};

/**
 * Step 1: Create a Razorpay order BEFORE any registration.
 * Stores user details in a temporary "pending_orders" table
 * so we can complete registration after payment verification.
 *
 * @param {Object} userData - { name, email, phone, college }
 * @returns {{ order_id, amount, currency, key_id }}
 */
const createOrder = async (userData) => {
    const { name, email, phone, college } = userData;
    const amount = parseInt(process.env.EVENT_PRICE) || 499;

    // ── Check for existing paid registration (duplicate prevention) ──
    const { data: existingEmail, error: emailCheckErr } = await supabase
        .from("registrations")
        .select("email")
        .eq("email", email)
        .maybeSingle();

    if (emailCheckErr) {
        console.error("Email check error:", emailCheckErr);
        throw new Error("Failed to verify registration status");
    }

    if (existingEmail) {
        const err = new Error(`User with email ${email} is already registered`);
        err.code = "DUPLICATE_EMAIL";
        throw err;
    }

    const { data: existingPhone, error: phoneCheckErr } = await supabase
        .from("registrations")
        .select("phone")
        .eq("phone", phone)
        .maybeSingle();

    if (phoneCheckErr) {
        console.error("Phone check error:", phoneCheckErr);
        throw new Error("Failed to verify registration status");
    }

    if (existingPhone) {
        const err = new Error(`Phone number ${phone} is already registered`);
        err.code = "DUPLICATE_PHONE";
        throw err;
    }

    // ── Create Razorpay order ──
    const razorpay = getRazorpay();
    const amountInPaise = amount * 100;

    const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        notes: { name, email, phone, college },
    });

    // ── Store in pending_orders so we can retrieve user data after payment ──
    const { error: insertErr } = await supabase
        .from("pending_orders")
        .upsert(
            {
                order_id: order.id,
                name,
                email,
                phone,
                college,
                amount,
                status: "created",
            },
            { onConflict: "email" }
        );

    if (insertErr) {
        console.error("Failed to store pending order:", insertErr);
        throw new Error("Failed to initiate payment");
    }

    return {
        order_id: order.id,
        amount: amountInPaise,
        currency: "INR",
        key_id: process.env.RAZORPAY_KEY_ID,
    };
};

/**
 * Step 2: Verify Razorpay payment signature, then complete full registration.
 * Only AFTER verification: save to DB → generate ticket → QR → upload → email.
 *
 * @param {{ razorpay_order_id, razorpay_payment_id, razorpay_signature }}
 * @returns {{ success, registration }}
 */
const verifyAndRegister = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    // ── 1. Verify HMAC signature — NEVER trust frontend ──
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        const err = new Error("Invalid payment signature");
        err.code = "INVALID_SIGNATURE";
        throw err;
    }

    // ── 2. Retrieve pending order data ──
    const { data: pendingOrder, error: lookupErr } = await supabase
        .from("pending_orders")
        .select("*")
        .eq("order_id", razorpay_order_id)
        .maybeSingle();

    if (lookupErr || !pendingOrder) {
        console.error("Pending order lookup error:", lookupErr);
        const err = new Error("Order not found");
        err.code = "NOT_FOUND";
        throw err;
    }

    // ── 3. Check if already processed (idempotent) ──
    if (pendingOrder.status === "completed") {
        const { data: existingReg } = await supabase
            .from("registrations")
            .select("*")
            .eq("email", pendingOrder.email)
            .maybeSingle();

        return {
            success: true,
            already_processed: true,
            registration: existingReg,
        };
    }

    // ── 4. Complete registration (ticket → QR → upload → email → DB) ──
    const registration = await createRegistration({
        name: pendingOrder.name,
        email: pendingOrder.email,
        phone: pendingOrder.phone,
        college: pendingOrder.college,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        amount: pendingOrder.amount,
        payment_status: "paid",
    });

    // ── 5. Mark pending order as completed ──
    await supabase
        .from("pending_orders")
        .update({ status: "completed" })
        .eq("order_id", razorpay_order_id);

    return {
        success: true,
        already_processed: false,
        registration,
    };
};

module.exports = { createOrder, verifyAndRegister };
