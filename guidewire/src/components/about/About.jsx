const About = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">

      {/* GRADIENT BACKGROUND */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_40%),
             radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.2),transparent_40%)]">
      </div>

      {/* NOISE TEXTURE */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')]"></div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* SECTION TITLE */}
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-400 relative inline-block tracking-wide">
                About GigShield
                <span className="block h-[2px] w-full bg-gradient-to-r from-blue-400 to-cyan-300 mt-2"></span>
              </h2>
            </div>

            {/* MAIN HEADING */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-white">Protecting </span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Gig Workers' Income
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              India has over <span className="text-cyan-300 font-semibold">1.2 crore gig workers</span> 
              who lose income daily due to rain, heatwaves, pollution, and app outages.
              Traditional insurance does not cover this.
            </p>

            <p className="text-blue-300/80 text-sm md:text-base max-w-lg">
              GigShield introduces <span className="text-cyan-300 font-semibold">parametric income insurance</span> — 
              where payouts are triggered automatically using real-world data like weather, AQI, and platform activity.
              No claims. No paperwork. Just instant protection.
            </p>

            {/* HIGHLIGHT LINE */}
            <p className="text-blue-400 font-medium">
              ⚡ “If you can’t work, you still earn.”
            </p>

          </div>

          {/* RIGHT SIDE - FEATURE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:scale-105 hover:border-blue-400/40 transition duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">💸 ₹45/week (Differs according to location)</h3>
              <p className="text-gray-400 text-sm">
                Affordable insurance designed for daily earners.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:scale-105 hover:border-cyan-400/40 transition duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">⚡ 15 min Payout</h3>
              <p className="text-gray-400 text-sm">
                Instant UPI payouts without claims or paperwork.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:scale-105 hover:border-blue-400/40 transition duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">🤖 AI Powered</h3>
              <p className="text-gray-400 text-sm">
                Smart pricing, fraud detection, and risk analysis.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:scale-105 hover:border-cyan-400/40 transition duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">🌍 Real-Time Data</h3>
              <p className="text-gray-400 text-sm">
                IMD, AQI, maps & platform signals trigger payouts automatically.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;