const supabase = require("../../config/db");
const { syncToGoogleSheet } = require("../../../utils/syncToGoogleSheet");

const SYNC_INTERVAL_MS = Number(process.env.SHEET_SYNC_INTERVAL_MS || 10 * 60 * 1000);
const SAFETY_OVERLAP_MS = 2 * 60 * 1000;
const DEFAULT_LOOKBACK_MS = 15 * 60 * 1000;
const PAGE_SIZE = Number(process.env.SHEET_SYNC_PAGE_SIZE || 500);

let lastSuccessfulSyncAt = null;

const getSyncStartIso = () => {
  const now = Date.now();

  if (!lastSuccessfulSyncAt) {
    return new Date(now - DEFAULT_LOOKBACK_MS).toISOString();
  }

  return new Date(lastSuccessfulSyncAt - SAFETY_OVERLAP_MS).toISOString();
};

const syncRecentRegistrations = async () => {
  if (!process.env.GOOGLE_SHEET_SCRIPT_URL) {
    return;
  }

  const syncStartIso = getSyncStartIso();

  let from = 0;
  let pageCount = 0;
  let totalRowsSynced = 0;

  while (true) {
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("registrations")
      .select(
        "name, email, phone, college, shift, ticket_id, payment_status, payment_id, order_id, amount, qr_code_url, email_sent, attendance_marked, created_at"
      )
      .gte("created_at", syncStartIso)
      .order("created_at", { ascending: true })
      .range(from, to);

    if (error) {
      throw new Error(`Sheet scheduler fetch failed: ${error.message}`);
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

  lastSuccessfulSyncAt = Date.now();

  if (totalRowsSynced > 0) {
    console.log(
      `[SHEET SYNC] Synced ${totalRowsSynced} registrations in ${pageCount} page(s). Start=${syncStartIso}`
    );
  }
};

const startSheetSyncScheduler = () => {
  if (!process.env.GOOGLE_SHEET_SCRIPT_URL) {
    console.log("[SHEET SYNC] GOOGLE_SHEET_SCRIPT_URL missing. Scheduler disabled.");
    return;
  }

  console.log(`[SHEET SYNC] Scheduler enabled. Interval=${SYNC_INTERVAL_MS}ms`);

  // Initial best-effort backfill on startup.
  syncRecentRegistrations().catch((err) => {
    console.error("[SHEET SYNC] Initial sync failed:", err.message);
  });

  setInterval(() => {
    syncRecentRegistrations().catch((err) => {
      console.error("[SHEET SYNC] Periodic sync failed:", err.message);
    });
  }, SYNC_INTERVAL_MS);
};

module.exports = {
  startSheetSyncScheduler,
  syncRecentRegistrations,
};
