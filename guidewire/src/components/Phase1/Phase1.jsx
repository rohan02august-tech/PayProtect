import React from "react";

const triggers = [
  { title: "🌧 Heavy Rain", desc: "Automatic payout when rainfall exceeds threshold (IMD data)." },
  { title: "🔥 Heatwave", desc: "Protection when temperature crosses 43°C." },
  { title: "🌫 High AQI", desc: "Payout triggered when AQI > 300 (unsafe conditions)." },
  { title: "📱 App Outage", desc: "Earn even when platforms go down during peak hours." },
  { title: "🚧 Waterlogging", desc: "Blocked roads detected via maps trigger compensation." },
  { title: "🚫 Curfew", desc: "Government restrictions automatically activate payouts." },
  { title: "📍 Location Verified", desc: "AI ensures real presence to prevent fraud." },
  { title: "🤖 Smart AI Engine", desc: "Dynamic pricing & fraud detection for fairness." },
];

function Coverage() {
  return (
    <section className="min-h-screen bg-black py-20 px-6">

      {/* HEADING */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          What <span className="text-cyan-400">GigShield Covers</span>
        </h2>
        <p className="text-gray-400 mt-4">
          Real-world disruptions that affect your daily income.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

        {triggers.map((item, index) => (
          <div
            key={index}
            className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
            hover:border-cyan-400/40 transition duration-300 hover:scale-105 cursor-pointer"
          >

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-white mb-2">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="text-gray-400 text-sm">
              {item.desc}
            </p>

            {/* SUBTLE GLOW */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 
              bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl rounded-2xl"></div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default Coverage;//