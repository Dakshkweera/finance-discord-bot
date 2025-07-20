const { askQuestion } = require('./services/perplexityService');

(async () => {
  try {
    const answer = await askQuestion("What is inflation?");
    console.log("✅ API is working. Response:");
    console.log(answer);
  } catch (err) {
    console.error("❌ API call failed:");
    console.error(err.response?.data || err.message);
  }
})();
