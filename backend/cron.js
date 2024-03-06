const cron = require("node-cron");
const Movie = require("./models/Movie");

function initCronJobs() {
  cron.schedule("0 0 * * *", async () => {
    try {
      const thresholdDate = new Date();
      thresholdDate.setFullYear(thresholdDate.getFullYear() - 1);

      const result = await Movie.deleteMany({
        views: { $eq: 0 },
        year: { $lt: thresholdDate.getFullYear() },
      });
      console.log(`${result.deletedCount} movies were deleted.`);
    } catch (error) {
      console.error("An error occurred while running cron job:", error);
    }
  });
}

module.exports = { init: initCronJobs };
