const Contact = () => {
  return (
    <section className="min-h-screen bg-black px-6 md:px-12 lg:px-20 py-24">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-8">

          {/* TITLE */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-cyan-400 tracking-wide">
              Built by the <span className="text-white">Risk Rangers</span>
            </h2>
            <span className="block h-[2px] w-40 bg-gradient-to-r from-cyan-400 to-blue-500 mt-2"></span>
          </div>

          {/* MAIN HEADING */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <span className="text-white">Built for </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 bg-clip-text text-transparent">
              Guidewire DevTrails Hack 2026
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
            GigShield is an AI-powered parametric income insurance platform 
            designed to protect gig workers from income loss due to real-world disruptions.
          </p>

          {/* TEAM INFO */}
          <div className="space-y-2 text-gray-400 text-sm md:text-base">
            <p> Team: Risk Rangers</p>
            <p> Idea: Parametric Income Insurance</p>
            <p> Payouts: Instant via UPI</p>
            <p> Contact : rohanam390@gmail.com</p>
          </div>

        </div>

      </div>

      {/* FOOTER LINE */}
      <div className="text-center mt-20 text-gray-500 text-sm">
        © 2026 GigShield • Built for Guidewire DevTrails Hackathon
      </div>

    </section>
  );
};

export default Contact;