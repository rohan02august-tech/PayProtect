# PayProtect: AI-Driven Parametric Income Insurance for Gig Workers ☂️

> **End-to-End Hackathon Solution built for Phase 2: Submission Deliverables**

PayProtect completely eliminates the friction of traditional insurance for gig economy workers (Swiggy, Zomato, Zepto) by moving from a reactive claims process to a proactive, automated **Parametric Smart Contract System**. 

There is no filing. No investigation. No approval. If the weather severely triggers a localized disruption, the worker is automatically paid through our BullMQ smart pipeline.

---

## 🚀 Key Features Matrix

1. **Registration Process**: Seamlessly onboarded with simulated hardcoded OTP (Mobile/Email toggles + UPI Linking).
2. **Dynamic Premium Calculation**: An AI-Driven Risk microservice computes localized dynamic pricing premiums by analyzing historical weather datasets via statistical simulation bounds.
3. **Insurance Policy Management**: Tiered policy dashboards where workers can view their specific parametric coverage parameters (Gig Worker Essential vs Pro).
4. **Automated Claims Management**: Total elimination of manual claims. Payouts are systematically executed through a fault-tolerant BullMQ pipeline instantly logged directly to the frontend.

## 🛠 Tech Stack Architecture

- **Frontend Interface:** React.js, Vite, Tailwind CSS, Lucide Icons.
- **Backend API & Microservices:** Node.js, Express.js.
- **Parametric Trigger Engine:** Custom Mock XGBoost Algorithmic Probability Engine.
- **Pipeline & Event Execution:** Redis, BullMQ (3-tier worker nodes).
- **Live System Telemetry:** WebSockets / Socket.IO (Visualizing internal engine logs into the UI dashboard).

---

## ⚙️ Environment Setup & Installation

To run this solution locally as per the Phase 2 requirements:

### Prerequisites:
- Node.js (v18+)
- Local Redis instance running on port `6379` (critical for BullMQ).

### 1. Backend Setup (Event Engine & Microservices)
Open a terminal and navigate to the backend service:
```bash
cd back
npm install
node server.js
```
*The backend will boot up on `http://localhost:4000` with WebSockets & Redis Queue pipelines attached natively.*

### 2. Frontend Setup (Dashboard UI)
Open a new terminal and navigate to the root frontend directory:
```bash
npm install
npm run dev
```
*The React UI will securely boot up on `http://localhost:5173`.*

---

## 🕹 How to Demo the Live End-to-End Pipeline

1. **The Telemetry Engine:** Open the Dashboard. Observe the live localized weather fetching (Rainfall, Wind, AQI).
2. **AI Actuarial Inference:** Navigate to the **AI Risk Engine** Tab. Simulate training on our 10-year Tamil Nadu CPCB dataset, and use the interactive slider to watch the XGBoost algorithm construct dynamic actuarial premiums locally.
3. **Automated Pipeline Logs:** Navigate back to the Dashboard. When you see extreme rainfall trigger the parameters on the left grid, watch the **Live System Console** precisely log the backend generating the claim, clearing fraud via Worker 2, and finalizing the Razorpay transfer via Worker 3 fully asynchronously!

*System architecture built natively for the Guidewire Software Hackathon Phase 2.*
