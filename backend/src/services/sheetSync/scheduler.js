const supabase = require("../../config/db");
const { syncToGoogleSheet } = require("../../../utils/syncToGoogleSheet");

const PAGE_SIZE = Number(process.env.SHEET_SYNC_PAGE_SIZE || 500);
const SELECT_COLUMNS =
  "name, email, phone, college, shift, ticket_id, payment_status, payment_id, order_id, amount, qr_code_url, email_sent, attendance_marked, created_at";

const syncPagedQuery = async (buildQuery, modeLabel) => {
  let from = 0;
  let pageCount = 0;
  let totalRowsSynced = 0;

  while (true) {
    const to = from + PAGE_SIZE - 1;
    const query = buildQuery(to, from);
    const { data, error } = await query;

    if (error) {
      throw new Error(`Sheet ${modeLabel} fetch failed: ${error.message}`);
    }

    if (!data || data.length === 0) {
      break;
    }

    await syncToGoogleSheet(data);

    totalRowsSynced += data.length;
    pageCount += 1;

    if (data.length < PAGE_SIZE) {
      break;
    }

    from += PAGE_SIZE;
  }

  return { totalRowsSynced, pageCount };
};

const syncAllRegistrations = async () => {
  if (!process.env.GOOGLE_SHEET_SCRIPT_URL) {
    throw new Error("GOOGLE_SHEET_SCRIPT_URL missing");
  }

  const { totalRowsSynced, pageCount } = await syncPagedQuery(
    (to, from) =>
      supabase
        .from("registrations")
        .select(SELECT_COLUMNS)
        .order("created_at", { ascending: true })
        .range(from, to),
    "full backfill"
  );

  console.log(
    `[SHEET SYNC] Full backfill complete. Rows=${totalRowsSynced}, Pages=${pageCount}`
  );

  return { totalRowsSynced, pageCount };
};

module.exports = {
  syncAllRegistrations,
};
