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
//
// Notes:
// - This works with serverless backend flow where each successful registration
//   sends one sync request immediately.
// - It also supports optional bulk backfill payloads (array of registrations).
// =============================================================

var HEADERS = [
    "Name",
    "Email",
    "Phone",
    "College",
    "Shift",
    "Ticket ID",
    "Payment Status",
    "Payment ID",
    "Order ID",
    "Amount",
    "QR Code URL",
    "Email Sent",
    "Attendance Marked",
    "Registered At",
];

function doPost(e) {
    try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        if (!e || !e.postData || !e.postData.contents) {
            return ContentService.createTextOutput(
                JSON.stringify({ status: "error", message: "Empty request body" })
            ).setMimeType(ContentService.MimeType.JSON);
        }

        var data = JSON.parse(e.postData.contents);

        ensureHeaders(sheet);

        if (!data) {
            return ContentService.createTextOutput(
                JSON.stringify({ status: "error", message: "Invalid payload" })
            ).setMimeType(ContentService.MimeType.JSON);
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

function ensureHeaders(sheet) {
    if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS);
        sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }
}

function appendRegistration(sheet, row) {
    var ticketId = row.ticket_id || "";
    var existingRow = findRowByTicketId(sheet, ticketId);
    var values = [
        row.name || "",
        row.email || "",
        row.phone || "",
        row.college || "",
        row.shift || "",
        row.ticket_id || "",
        row.payment_status || "",
        row.payment_id || "",
        row.order_id || "",
        row.amount || "",
        row.qr_code_url || "",
        toBooleanString(row.email_sent),
        toBooleanString(row.attendance_marked),
        row.created_at
            ? new Date(row.created_at).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
            })
            : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    ];

    // Upsert by ticket ID to avoid duplicate rows during periodic backfill.
    if (existingRow > 0) {
        sheet.getRange(existingRow, 1, 1, values.length).setValues([values]);
    } else {
        sheet.appendRow(values);
    }
}

function findRowByTicketId(sheet, ticketId) {
    if (!ticketId || sheet.getLastRow() <= 1) {
        return -1;
    }

    // Ticket ID is column 6 in the current sheet schema.
    var values = sheet.getRange(2, 6, sheet.getLastRow() - 1, 1).getValues();

    for (var i = 0; i < values.length; i++) {
        if (String(values[i][0]) === String(ticketId)) {
            return i + 2;
        }
    }

    return -1;
}

function toBooleanString(value) {
    return String(value === true || value === "true" || value === 1 || value === "1");
}
