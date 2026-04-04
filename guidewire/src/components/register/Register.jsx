import React, { useState } from "react";
import { Shield, Lock, X, IndianRupee, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleLogin = () => {
    setMessage(null);

    if (!name.trim()) {
      setMessage({ type: "error", text: "Please enter your full name." });
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setMessage({ type: "error", text: "Please enter a valid 10-digit phone number." });
      return;
    }

    // Save user info to localStorage so Dashboard can read it
    localStorage.setItem("pp_user_name", name.trim());
    localStorage.setItem("pp_user_email", email.trim());
    localStorage.setItem("pp_user_phone", phone.trim());

    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen w-full font-sans bg-white relative z-50 overflow-hidden">
      {/* LEFT SIDE - Dark Section */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-[#0a1121] relative text-white p-12 overflow-hidden">
        {/* Background Grid & Visuals */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#203a55 1px, transparent 1px), linear-gradient(90deg, #203a55 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        ></div>
        {/* Decorative Circles */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#0ea5e9] opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>

        {/* Header - Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-[#16b39c] rounded-xl shadow-lg">
            <Shield className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-[20px] font-bold leading-tight tracking-wide">PayProtect</h1>
            <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase">Parametric Income Insurance</p>
          </div>
        </div>

        {/* Center - Visual */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 my-10">
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Hexagon Outline Concept */}
            <svg className="absolute w-full h-full text-[#144857] opacity-60" viewBox="0 0 100 100">
              <polygon points="50 3, 95 25, 95 75, 50 97, 5 75, 5 25" fill="rgba(10, 35, 45, 0.4)" stroke="currentColor" strokeWidth="1" />
              <polygon points="50 10, 85 30, 85 70, 50 90, 15 70, 15 30" fill="transparent" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            <div className="relative bg-[#0d2a37] p-8 rounded-full shadow-[0_0_40px_rgba(22,179,156,0.15)] border border-[#16b39c]/20">
               <IndianRupee className="w-12 h-12 text-[#16b39c]" />
            </div>

            {/* Floating Badges */}
            <div className="absolute left-[-20%] bottom-8 bg-[#12243e] border border-blue-900/50 backdrop-blur-md rounded-lg py-2 px-4 shadow-xl">
              <p className="text-[10px] text-[#16b39c] font-medium">Active Coverage</p>
              <p className="text-sm font-bold text-white">₹28,500/mo</p>
            </div>

            <div className="absolute right-[-10%] bottom-4 bg-[#12243e] border border-blue-900/50 backdrop-blur-md rounded-lg py-2 px-4 shadow-xl">
              <p className="text-[10px] text-[#0ea5e9] font-medium">Protected Days</p>
              <p className="text-sm font-bold text-white">47 this year</p>
            </div>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10 max-w-lg mb-4">
          <h2 className="text-3xl font-semibold mb-4 text-white leading-snug">
            Your income, protected against every downpour.
          </h2>
          <p className="text-gray-400 text-[15px] mb-8 leading-relaxed max-w-md">
            Automatic payouts when extreme weather disrupts your work day. No claims, no hassle.
          </p>

          <div className="flex gap-4 mb-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-700/60 bg-gray-800/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs text-gray-300">IRDAI Registered</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-700/60 bg-gray-800/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs text-gray-300">ISO 27001</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-700/60 bg-gray-800/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs text-gray-300">256-bit SSL</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-500">
            © 2025 PayProtect Technologies Pvt. Ltd. - IRDAI Reg No. IRD/WBA24/2025
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Light Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white relative p-6 overflow-y-auto w-full">
        <div className="w-full max-w-[420px]">

          {/* Header */}
          <h2 className="text-[32px] font-bold text-[#111827] mb-2 tracking-tight">
            Welcome to PayProtect
          </h2>
          <p className="text-[15px] text-slate-500 mb-8">
            Enter your details to get started
          </p>

          {/* Message Alert */}
          {message && (
            <div className={`p-3 mb-4 text-sm rounded-lg ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
              {message.text}
            </div>
          )}

          {/* Input Form */}
          <div className="space-y-4 mb-6">
            {/* Full Name */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <input
                id="login-name"
                type="text"
                placeholder="e.g. Raju Kumar"
                className="w-full px-4 py-3 outline-none text-slate-800 placeholder-slate-400 text-[15px] border border-slate-200 rounded-lg focus:border-[#16b39c] focus:ring-1 focus:ring-[#16b39c] transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 outline-none text-slate-800 placeholder-slate-400 text-[15px] border border-slate-200 rounded-lg focus:border-[#16b39c] focus:ring-1 focus:ring-[#16b39c] transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                Phone Number
              </label>
              <div className="flex overflow-hidden rounded-lg border border-slate-200 focus-within:border-[#16b39c] focus-within:ring-1 focus-within:ring-[#16b39c] transition-all bg-white">
                <div className="bg-slate-50 px-4 py-3 border-r border-slate-200 flex items-center justify-center text-slate-600 font-medium text-[15px]">
                  IN +91
                </div>
                <input
                  id="login-phone"
                  type="tel"
                  placeholder="98765 43210"
                  className="w-full px-4 py-3 outline-none text-slate-800 placeholder-slate-400 text-[15px]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            id="login-submit"
            onClick={handleLogin}
            className="w-full bg-[#16b39c] hover:bg-[#129985] text-white font-medium py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 mb-6"
          >
            Get Protected <span className="text-lg leading-none transform translate-y-[-1px]">→</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center py-2 mb-6">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">or</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Demo Mode Button */}
          <button
            id="demo-mode"
            onClick={() => {
              localStorage.setItem("pp_user_name", "Demo User");
              localStorage.setItem("pp_user_email", "demo@payprotect.in");
              localStorage.setItem("pp_user_phone", "+91 00000 00000");
              navigate("/dashboard");
            }}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-medium py-3 rounded-lg transition-colors duration-200 mb-10"
          >
            Continue without login (Demo Mode)
          </button>

          {/* Security Banner */}
          <div className="bg-[#f8fafc] rounded-xl p-4 flex gap-3 text-[12px] text-slate-500 border border-slate-100">
            <Lock className="w-5 h-5 text-[#16b39c] flex-shrink-0" />
            <p className="leading-relaxed">
              Your data is protected with AES encryption. We never store your financial credentials on our servers.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}