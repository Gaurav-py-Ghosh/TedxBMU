require("dotenv").config();

const { syncAllRegistrations } = require("../services/sheetSync/scheduler");

const main = async () => {
  try {
    const result = await syncAllRegistrations();
    console.log(
      `[SHEET SYNC] Backfill succeeded. Rows=${result.totalRowsSynced}, Pages=${result.pageCount}`
    );
    process.exit(0);
  } catch (err) {
    console.error("[SHEET SYNC] Backfill failed:", err.message);
    process.exit(1);
  }
};

main();
