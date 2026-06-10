/**
 * Push registration or feedback data to Google Sheets via Apps Script web app.
 * Supports single object and array payloads.
 * Fire-and-forget safe: logs errors but does not throw.
 */

const mapRegistration = (registrationData) => ({
    kind: "registration",
    name: registrationData.name,
    email: registrationData.email,
    phone: registrationData.phone,
    college: registrationData.college,
    shift: registrationData.shift,
    ticket_id: registrationData.ticket_id,
    payment_status: registrationData.payment_status || "free",
    payment_id: registrationData.payment_id || "",
    order_id: registrationData.order_id || "",
    amount: registrationData.amount || "",
    qr_code_url: registrationData.qr_code_url || registrationData.qr_url || "",
    email_sent: Boolean(registrationData.email_sent),
    attendance_marked: Boolean(registrationData.attendance_marked),
    created_at: registrationData.created_at || new Date().toISOString(),
});

const mapFeedback = (feedbackData) => ({
    kind: "feedback",
    name: feedbackData.name,
    email: feedbackData.email,
    phone: feedbackData.phone,
    rating: feedbackData.rating,
    feedback: feedbackData.feedback,
    recipient_name: feedbackData.recipient_name || feedbackData.recipientName || "",
    recipient_role: feedbackData.recipient_role || feedbackData.recipientRole || "",
    match_type: feedbackData.match_type || feedbackData.matchType || "",
    certificate_file: feedbackData.certificate_file || feedbackData.certificateFile || "",
    certificate_sent: Boolean(feedbackData.certificate_sent),
    certificate_email_id: feedbackData.certificate_email_id || "",
    created_at: feedbackData.created_at || new Date().toISOString(),
});

const postToSheet = async (payload) => {
    const scriptUrl = process.env.GOOGLE_SHEET_SCRIPT_URL;
    if (!scriptUrl) return;

    const res = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
    });

    if (!res.ok) {
        console.error("Google Sheet sync failed:", res.status, await res.text());
    }
};

const syncToGoogleSheet = async (data) => {
    const scriptUrl = process.env.GOOGLE_SHEET_SCRIPT_URL;

    if (!scriptUrl || !data) {
        return;
    }

    try {
        const mapper = data && typeof data === "object" && "feedback" in data ? mapFeedback : mapRegistration;
        const payload = Array.isArray(data) ? data.map(mapper) : mapper(data);

        await postToSheet(payload);
    } catch (err) {
        console.error("Google Sheet sync error (non-blocking):", err.message);
    }
};

module.exports = {
    syncToGoogleSheet,
    mapRegistration,
    mapFeedback,
};
