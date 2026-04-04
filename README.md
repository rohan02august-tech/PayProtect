
# 🛡️ PayProtect

### AI-Powered Parametric Income Insurance for Gig Workers

---

## Executive Summary

**Problem:**
1.2 crore gig workers in India lose **20–30% of their monthly income** due to external disruptions like heavy rain, AQI spikes, platform outages, and curfews.
There is **no insurance product** that covers *lost income*.

**Solution:**
GigShield provides **parametric income insurance**:

*  ₹45/week → up to **70% income replacement**
*  **Zero paperwork** → payouts in ~15 minutes via UPI
*  **PWA Web App** → works on low-end phones
*  AI-powered → smart pricing, fraud detection, WhatsApp alerts

---

##  Primary Persona: Raju (Blinkit Partner)

| Attribute | Details                   |
| --------- | ------------------------- |
| Age       | 26                        |
| Role      | Delivery Partner          |
| Work      | 10–14 hrs/day             |
| Earnings  | ₹18K–24K/month            |
| Risk      | Rain = ₹300–₹400 loss/day |

 **Reality:**
Heavy rain → waits 3–4 hours → earns ₹0 → no protection

---

##  Real-World Scenarios

###  Scenario 1: Heavy Rain

* IMD detects **58mm/hr rainfall**
* Raju waits 3.5 hrs → ₹357 lost
*  GigShield triggers payout
*  ₹238 credited in 12 mins

---

###  Scenario 2: Platform Outage

* Blinkit crashes during peak hours
* GPS confirms presence at store
*  Standby payout: ₹40/hr

 **World-first: Platform Outage Insurance**

---

##  Product Workflow

 **Signup (45 sec)**
Aadhaar OTP → Platform ID → UPI

 **Weekly Premium**
₹45 auto-debited via UPI

**Real-Time Monitoring**
Live zone status + coverage

 **Instant Payouts**
Trigger → AI validation → Money credited

---

##  Pricing Model

| Plan     | ₹/Week | Coverage          | Max Payout |
| -------- | ------ | ----------------- | ---------- |
| Basic    | ₹19–35 | Rain              | ₹500       |
| Standard | ₹35–60 | Rain + AQI + Heat | ₹800       |
| Premium  | ₹60–95 | All triggers      | ₹1200      |

**Formula:**
Payout = EarningsDNA × 70% × (Disruption Hours / 8)

---

##  Parametric Triggers

| Trigger      | Source   | Threshold     |
| ------------ | -------- | ------------- |
| Rain         | IMD      | >50mm/hr      |
| Heatwave     | IMD      | >43°C         |
| AQI          | CPCB     | AQI > 300     |
| Curfew       | Govt     | Section 144   |
| App Outage   | Platform | Orders < 5%   |
| Waterlogging | Maps     | Roads blocked |

---

##  AI/ML Models

| Model              | Purpose          |
| ------------------ | ---------------- |
| XGBoost            | Premium pricing  |
| Time Series        | Earnings DNA     |
| Multi-signal Model | Zone Trust Score |
| Isolation Forest   | Fraud detection  |

---

##  System Architecture

| Layer     | Tech                   |
| --------- | ---------------------- |
| Frontend  | React + Tailwind (PWA) |
| Backend   | Node.js + Express      |
| ML Engine | Python + Flask         |
| Database  | MySQL + Redis          |
| Payments  | Razorpay UPI           |
| Infra     | AWS S3 + Fly.io        |

---

# Adversarial Defense & Anti-Spoofing Strategy

 ** Update:** Added for "Market Crash" adversarial scenario


---

##  Threat Model

Fraud ring attempts to:

* Fake GPS locations
* Simulate idle time
* Trigger false payouts
* Drain liquidity

---

##  Defense Strategy (4 Layers)

###  Reality Check (External Truth)

* Cross-verify IMD, AQI, Traffic, Platform APIs
* Ensure disruption actually exists

 Stops fake events

---

### Behavior Check (User Authenticity)

We analyze:

* Earnings history
* Movement trajectory (NOT just GPS point)
* Idle vs working patterns

 Flags:

* Static GPS
* Unrealistic consistency
* Sudden behavior change

---

###  Network Check (Fraud Ring Detection)

We detect:

* Multiple users claiming in same zone
* Same timing patterns
* Device/IP clustering

 Uses graph-based anomaly detection

---

### 4️ Confidence Score Engine

Final Fraud Score based on:

* Behavior anomaly
* Network anomaly
* Trigger strength

| Score  | Action               |
| ------ | -------------------- |
| Low    | Instant payout       |
| Medium | Delayed verification |
| High   | Block + review       |

---

##  Fairness Mechanism

To avoid harming honest users:

* Grace thresholds for new users
* Soft verification before rejection
* Reputation score reduces friction

---

## Before vs After Attack

**Before:**
Fake GPS → payout triggered

**After:**
Multi-layer validation → fraud blocked

---

##  Key Insight

> “Fraud rings fail when systems track behavior, not just location.”

---

##  Financial Model

* 50K users → ₹11.7 Cr revenue
* Claims → ₹3.6 Cr
* Loss ratio → 65% (healthy)

---

##  Repository Structure

```
gigshield/
├── README.md
├── docs/
├── data/
├── prototype/
├── api-docs/
└── LICENSE
```

---

## Innovations

*  Platform Outage Insurance
*  Earnings DNA
*  Zone Trust Score
*  PWA-first approach
*  Weekly value visibility

---

##  Compliance

* IRDAI Sandbox compliant
* SEWA parametric precedent
* Rajasthan Gig Workers Act aligned

---

 ##  Demo Video  

Watch our complete product walkthrough here:  
https://www.youtube.com/watch?v=nBOrC-knwFg

##  Team

**Risk Rangers**

Built for real-world resilience 

---


---
>>>>>>> 2d0bed276d91cc3ec648bfb5b64ee527698e0626
