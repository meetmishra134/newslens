import { fetchAllNews } from "../services/newsFetcher.service";
console.info("Starting news fetch test...");
fetchAllNews()
  .then(() => {
    console.info("[TEST] Fetch completed successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("[TEST] Fetch failed:", err);
    process.exit(1);
  });
