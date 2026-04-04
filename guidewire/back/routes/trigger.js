const express = require("express");
const router = express.Router();
const { eventQueue } = require("../queue/queue");

// Feature mock of an ML microservice
const mockXGBoostPredict = (rainfall, aqi, wind) => {
  // Simple weighted mock model to represent an ML Risk Probability tree
  let risk = (rainfall * 0.05) + (wind * 0.01) + (aqi * 0.005);
  return Math.min(0.99, risk); // Cap at 99%
};

router.post("/ingest", async (req, res) => {
  const { city, rainfall, aqi, wind, workerId } = req.body;
  
  if (global.io) {
    global.io.emit("log", `[INGEST] Ingesting IoT Telemetry for ${city}...`);
  }

  // 1. Pass through Risk Model
  const riskProbability = mockXGBoostPredict(rainfall, aqi, wind);
  const confidence = (riskProbability * 100).toFixed(1);

  if (global.io) {
    global.io.emit("log", `[XGBOOST] Risk Model executed. Disruption Probability: ${confidence}%`);
  }

  // 2. Smart Trigger Logic: 4 distinct Params + Traffic Disruption
  const activeTriggers = [];
  if (rainfall >= 50) activeTriggers.push("HEAVY_RAINFALL");
  if (wind >= 50) activeTriggers.push("SEVERE_WIND");
  if (aqi >= 150) activeTriggers.push("SEVERE_AQI_HAZARD");
  if (rainfall >= 30) activeTriggers.push("TRAFFIC_FLOOD_GRIDLOCK");

  if (activeTriggers.length > 0) {
    if (global.io) {
       global.io.emit("log", `[TRIGGER] 🚨 System detected ${activeTriggers.length} localized disruption trigger(s): ${activeTriggers.join(', ')}.`);
    }

    // 3. Publish Event
    await eventQueue.add(
      "CLAIM_TRIGGER",
      { city, rainfall, wind, aqi, riskProbability, workerId, activeTriggers },
      { attempts: 3, backoff: { type: "exponential", delay: 2000 } }
    );
  } else {
    if (global.io) {
       global.io.emit("log", `[TRIGGER] Status Nominal. No smart contract execution required.`);
    }
  }

  res.json({ message: "Telemetry ingested", riskProbability });
});

router.post("/predict", (req, res) => {
  const { rainfall, aqi, wind } = req.body;
  const riskProbability = mockXGBoostPredict(rainfall, aqi, wind);
  
  // Dynamic Premium Calculation based on risk (Structured strictly as a WEEKLY pricing model)
  // Base premium is ₹39/week for Gig Workers. 
  let basePremium = 39;
  
  // AI-Integration: Adjust the Weekly premium based on hyper-local risk factors.
  // The model charges ₹2 less per week if the worker's zone has structurally low risk (e.g. low predicted rainfall)
  if (rainfall < 20 && wind < 20) {
    basePremium -= 2;
  }
  
  const dynamicPremium = Math.round(basePremium * (1 + (riskProbability * 1.5)));

  res.json({ 
    model: "XGBoost Ensembled v3",
    riskProbability,
    confidence: (riskProbability * 100).toFixed(1),
    recommendedPremium: dynamicPremium
  });
});

module.exports = router;