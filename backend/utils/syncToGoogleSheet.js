/**
 * Push registration data to Google Sheets via Apps Script web app.
 * Fire-and-forget: logs errors but never fails the registration flow.
 */
const syncToGoogleSheet = async (registrationData) => {
    const scriptUrl = process.env.GOOGLE_SHEET_SCRIPT_URL;

    if (!scriptUrl) {
        // Silently skip if not configured
        return;
    }

    try {
        const payload = {
            name: registrationData.name,
            email: registrationData.email,
            phone: registrationData.phone,
            college: registrationData.college,
            ticket_id: registrationData.ticket_id,
            payment_status: registrationData.payment_status || "free",
            created_at: registrationData.created_at || new Date().toISOString(),
        };

        const res = await fetch(scriptUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            redirect: "follow",
        });

        if (!res.ok) {
            console.error("Google Sheet sync failed:", res.status, await res.text());
        }
    } catch (err) {
        console.error("Google Sheet sync error (non-blocking):", err.message);
    }
};

module.exports = syncToGoogleSheet;
