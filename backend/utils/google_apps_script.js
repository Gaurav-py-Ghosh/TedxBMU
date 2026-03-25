// =============================================================
// TEDxBMU — Google Apps Script for Registration Sync
// =============================================================
// SETUP INSTRUCTIONS:
//
// 1. Open Google Sheets → Extensions → Apps Script
// 2. Delete the default code and paste this entire file
// 3. Click "Deploy" → "New deployment"
// 4. Type = "Web app"
//    - Execute as: "Me"
//    - Who has access: "Anyone"
// 5. Click "Deploy" and copy the Web app URL
// 6. Paste the URL as GOOGLE_SHEET_SCRIPT_URL in backend/.env
// 7. Copy the Google Sheet URL and paste as
//    NEXT_PUBLIC_GOOGLE_SHEET_URL in tedx/.env.local
// =============================================================

function doPost(e) {
    try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        var data = JSON.parse(e.postData.contents);

        // Auto-create headers if the sheet is empty
        if (sheet.getLastRow() === 0) {
            sheet.appendRow([
                "Name",
                "Email",
                "Phone",
                "College",
                "Ticket ID",
                "Payment Status",
                "Registered At",
            ]);
            // Bold the header row
            sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
        }

        // Handle bulk sync (array of registrations)
        if (Array.isArray(data)) {
            data.forEach(function (row) {
                appendRegistration(sheet, row);
            });
            return ContentService.createTextOutput(
                JSON.stringify({ status: "ok", count: data.length })
            ).setMimeType(ContentService.MimeType.JSON);
        }

        // Single registration
        appendRegistration(sheet, data);

        return ContentService.createTextOutput(
            JSON.stringify({ status: "ok" })
        ).setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
        return ContentService.createTextOutput(
            JSON.stringify({ status: "error", message: err.message })
        ).setMimeType(ContentService.MimeType.JSON);
    }
}

function appendRegistration(sheet, row) {
    sheet.appendRow([
        row.name || "",
        row.email || "",
        row.phone || "",
        row.college || "",
        row.ticket_id || "",
        row.payment_status || "",
        row.created_at
            ? new Date(row.created_at).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
            })
            : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    ]);
}
