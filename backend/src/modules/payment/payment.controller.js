const paymentService = require("./payment.service");

/**
 * POST /api/payment/create-order
 * Body: { name, email, phone, college }
 *
 * Creates a Razorpay order. No registration happens yet.
 */
const createOrder = async (req, res) => {
    try {
        const { name, email, phone, college } = req.body;

        // ── Validate required fields ──
        if (!name || !email || !phone || !college) {
            return res.status(400).json({
                message: "All fields are required: name, email, phone, college",
            });
        }

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof phone !== "string" ||
            typeof college !== "string"
        ) {
            return res.status(400).json({ message: "All fields must be strings" });
        }

        // ── Sanitize ──
        const cleanEmail = email.trim().toLowerCase();
        const cleanPhone = phone.trim();

        // ── Basic validation ──
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({ message: "Invalid email address format" });
        }

        const phoneDigits = cleanPhone.replace(/[\s\-().+]/g, "");
        if (!/^\d{10,13}$/.test(phoneDigits)) {
            return res.status(400).json({ message: "Invalid phone number" });
        }

        const order = await paymentService.createOrder({
            name: name.trim(),
            email: cleanEmail,
            phone: cleanPhone,
            college: college.trim(),
        });

        return res.status(201).json({
            message: "Order created successfully",
            data: order,
        });
    } catch (error) {
        if (error.code === "DUPLICATE_EMAIL") {
            return res.status(409).json({ message: error.message, code: "DUPLICATE_EMAIL" });
        }
        if (error.code === "DUPLICATE_PHONE") {
            return res.status(409).json({ message: error.message, code: "DUPLICATE_PHONE" });
        }

        console.error("Create order error:", error);
        return res.status(500).json({ message: "Failed to create payment order" });
    }
};

/**
 * POST /api/payment/verify
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 *
 * Verifies payment, then completes full registration:
 * save → generate ticket → QR → upload → send email
 */
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                message: "razorpay_order_id, razorpay_payment_id, and razorpay_signature are required",
            });
        }

        const result = await paymentService.verifyAndRegister({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        return res.json({
            message: result.already_processed
                ? "Payment was already verified"
                : "Payment verified & registration complete",
            data: result,
        });
    } catch (error) {
        if (error.code === "INVALID_SIGNATURE") {
            return res.status(400).json({ message: error.message, code: "INVALID_SIGNATURE" });
        }
        if (error.code === "NOT_FOUND") {
            return res.status(404).json({ message: error.message });
        }
        if (error.code === "DUPLICATE_EMAIL" || error.code === "DUPLICATE_RACE") {
            return res.status(409).json({ message: error.message });
        }

        console.error("Verify payment error:", error);
        return res.status(500).json({ message: "Payment verification failed" });
    }
};

module.exports = { createOrder, verifyPayment };
