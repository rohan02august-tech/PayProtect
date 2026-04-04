import React from "react";

const scenarios = [
  {
    title: "🌧 Heavy Rain",
    desc: "IMD detects 58mm/hr rainfall. Worker unable to deliver for 3.5 hours.",
    impact: "₹357 income lost",
    payout: "₹238 credited in 12 mins",
  },
  {
    title: "📱 Platform Outage",
    desc: "Delivery app crashes during peak hours. Worker remains idle at store.",
    impact: "₹0 earned for 2 hours",
    payout: "₹40/hour standby payout",
  },
  {
    title: "🌫 AQI Spike",
    desc: "AQI crosses 320. Unsafe for outdoor work.",
    impact: "Reduced working hours",
    payout: "Automatic compensation triggered",
  },
];

function Scenarios() {
  return (
    <section className="min-h-screen bg-black py-20 px-6">

      {/* HEADING */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Real <span className="text-cyan-400">Scenarios</span>
        </h2>
        <p className="text-gray-400 mt-4">
          How GigShield protects income in real-world situations.
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto space-y-12">

        {scenarios.map((item, index) => (
          <div
            key={index}
            className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
            hover:border-cyan-400/40 transition duration-300"
          >

            {/* TITLE */}
            <h3 className="text-2xl font-semibold text-white mb-4">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="text-gray-400 mb-6">
              {item.desc}
            </p>

            {/* IMPACT + PAYOUT */}
            <div className="grid sm:grid-cols-2 gap-4">

              <div className="bg-red-500/10 border border-red-400/20 p-4 rounded-lg">
                <p className="text-red-300 font-semibold">{item.impact}</p>
                <p className="text-xs text-gray-400">Income Loss</p>
              </div>

              <div className="bg-green-500/10 border border-green-400/20 p-4 rounded-lg">
                <p className="text-green-300 font-semibold">{item.payout}</p>
                <p className="text-xs text-gray-400">GigShield Payout</p>
              </div>

            </div>

            {/* GLOW */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 
              bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl rounded-2xl"></div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default Scenarios;//