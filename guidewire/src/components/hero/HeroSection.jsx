import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/images/hero-bg.jpg";

export default function HeroSection() {
  const navigate = useNavigate(); 

  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Gig workers"
          className="w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex items-center justify-start min-h-screen px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl space-y-6 text-left">

          {/* TAG */}
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400 text-blue-200 text-sm">
            AI-Powered Parametric Insurance
          </div>

          {/* HEADING */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            Income Protection for{" "}
            <span className="text-blue-400">Gig Workers</span>
          </h1>

          {/* SUBTEXT */}
          <p className="text-blue-100 text-lg md:text-xl leading-relaxed">
            Rain, heatwave, or app outage — get up to{" "}
            <span className="text-cyan-300 font-semibold">
              70% income replacement
            </span>{" "}
            in ~15 minutes. Starting at just ₹19/week.
          </p>

          {/* FEATURES */}
          <div className="flex flex-wrap gap-6 text-sm text-blue-200">
            <span> Zero Paperwork</span>
            <span>⏱ ~15 Min Payouts</span>
            <span>🛡 IRDAI Compliant</span>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">

           
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold hover:opacity-90 transition"
            >
              Get Protected →
            </button>

            <a
              href="https://www.youtube.com/watch?v=nBOrC-knwFg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition"
            >
              Watch Demo 🎥
            </a>

          </div>

          {/* TRUST */}
          <p className="text-blue-400/70 text-sm pt-4">
            Trusted by gig workers • Powered by AI • Instant UPI payouts
          </p>

        </div>
      </div>
    </section>
  );
}