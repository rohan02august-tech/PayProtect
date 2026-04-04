import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import {
  Shield,
  Search,
  Bell,
  Info,
  Home,
  LayoutDashboard,
  FileText,
  CloudLightning,
  CreditCard,
  User,
  Settings,
  MapPin,
  Clock,
  ArrowUpRight,
  AlertTriangle,
  Cpu,
  Database,
  TrendingUp,
  Play,
  Terminal,
  BookOpen,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Download,
  CalendarDays,
  Banknote,
  BadgeCheck,
  Pencil,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// --- TAB COMPONENTS ---
const AiPredictionTab = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTrained, setIsTrained] = useState(false);
  
  // Test Calculator State
  const [rain, setRain] = useState(10);
  const [wind, setWind] = useState(20);
  const [aqi, setAqi] = useState(100);
  const [calcResult, setCalcResult] = useState(null);

  const startTraining = () => {
    setIsTraining(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          setIsTrained(true);
          return 100;
        }
        return p + Math.floor(Math.random() * 15 + 5);
      });
    }, 400);
  };

  const handlePredict = async () => {
    try {
      const res = await fetch("http://localhost:4000/trigger/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rainfall: rain, wind, aqi })
      });
      const data = await res.json();
      setCalcResult(data);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
       <div className="mb-6">
         <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
           <Cpu className="w-6 h-6 text-[#16b39c]"/> AI Risk Engine & Actuarial Model
         </h2>
         <p className="text-sm text-slate-500 mt-1">Train predictive XGBoost models on historical data to dynamically underwrite risk and calculate real-time localized premiums.</p>
       </div>
       
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Training Module */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
             <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Database className="w-5 h-5 text-slate-500" /> Historical Dataset Training</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-[13px] text-slate-600 font-mono shadow-inner">
                <p className="font-bold text-slate-700 mb-2">// Ingestion Context</p>
                <p>Dataset Name: <span className="text-[#16b39c]">chennai_imd_cpcb_10years.csv</span></p>
                <p>Records: <span className="text-blue-500">87,600 hours</span> of telemetry</p>
                <p>Target: <span className="text-orange-500">disruption_probability</span> (Float)</p>
                <p>Features: <span className="text-purple-500">[rainfall_mm, wind_mph, aqi, traffic_index]</span></p>
              </div>
              
              {!isTrained ? (
                <button 
                  onClick={startTraining} 
                  disabled={isTraining}
                  className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isTraining ? 'bg-slate-100 text-slate-400 border border-slate-200' : 'bg-[#16b39c] hover:bg-[#129985] text-white shadow-md hover:shadow-lg'}`}
                >
                  <Play className="w-4 h-4"/> {isTraining ? "Compiling XGBoost Trees..." : "Initiate Model Training"}
                </button>
              ) : (
                <div className="w-full py-3 bg-[#ecfdf5] border border-[#a7f3d0] text-[#059669] font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm">
                  Model Trained & Validated Successfully
                </div>
              )}

              {isTraining && (
                <div className="mt-6">
                  <div className="flex justify-between text-[11px] uppercase font-bold text-slate-500 mb-2">
                    <span>Optimization Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#16b39c] h-full transition-all duration-300" style={{width: `${progress}%`}}></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Inference / Dynamic Premium Predictor */}
          <div className={`transition-all duration-500 ${isTrained ? 'opacity-100 scale-100' : 'opacity-40 grayscale pointer-events-none'}`}>
            <div className="bg-white rounded-2xl border-2 border-[#16b39c] shadow-md p-6 h-full flex flex-col">
               <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#16b39c]" /> Dynamic Premium Simulator</h3>
               
               <div className="space-y-5 flex-1">
                 <div>
                   <label className="text-xs font-bold text-slate-500 flex justify-between mb-1.5"><span>Predicted Rainfall (mm)</span> <span className="text-slate-800">{rain} mm</span></label>
                   <input type="range" min="0" max="250" value={rain} onChange={e=>setRain(Number(e.target.value))} className="w-full accent-[#16b39c] h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"/>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-slate-500 flex justify-between mb-1.5"><span>Sustained Wind (mph)</span> <span className="text-slate-800">{wind} mph</span></label>
                   <input type="range" min="0" max="100" value={wind} onChange={e=>setWind(Number(e.target.value))} className="w-full accent-[#16b39c] h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"/>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-slate-500 flex justify-between mb-1.5"><span>Forecasted City AQI</span> <span className="text-slate-800">{aqi}</span></label>
                   <input type="range" min="0" max="500" value={aqi} onChange={e=>setAqi(Number(e.target.value))} className="w-full accent-[#16b39c] h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"/>
                 </div>

                 <button onClick={handlePredict} className="w-full py-2.5 mt-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold rounded-lg transition-colors shadow-sm">Calculate Actuarial Risk</button>

                 {calcResult && (
                   <div className="mt-4 p-5 bg-[#f8fafc] border border-slate-200 rounded-xl animate-in fade-in slide-in-from-bottom-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Risk Factor Confidence</p>
                          <p className={`text-2xl font-black ${Number(calcResult.confidence) > 80 ? 'text-red-500' : 'text-[#16b39c]'}`}>{calcResult.confidence}%</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Dynamic Base Premium</p>
                          <p className="text-2xl font-black text-slate-800">₹{calcResult.recommendedPremium}</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-4 flex items-start gap-1">
                        <AlertTriangle className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" /> Underwritten by statistical XGBoost forecasting bounds for localized ward parameters.
                      </p>
                   </div>
                 )}
               </div>
            </div>
          </div>
       </div>
    </div>
  );
};

// --- TAB COMPONENTS ---
const TerminalTab = ({ sysLogs, bottomRef, triggerMockStorm }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl h-full flex flex-col">
    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Terminal className="text-[#16b39c]"/> Backend Telemetry Feed</h2>
    <div className="bg-[#0f172a] rounded-xl overflow-hidden shadow-lg flex flex-col flex-1 min-h-[500px] border border-slate-700 relative">
      <div className="bg-[#1e293b] px-4 py-3 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">Live WebSocket Streaming</span>
        <button onClick={triggerMockStorm} className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded shadow-sm hover:bg-red-500 hover:text-white transition-colors">
          ☢️ Force Storm Event
        </button>
      </div>
      <div className="p-4 overflow-y-auto space-y-2 flex-1 font-mono text-[11px] text-[#4ade80]">
        {sysLogs.length === 0 ? (
          <p className="text-slate-500 italic">Listening for XGBoost payloads on port 4000...</p>
        ) : (
          sysLogs.map((log) => (
            <div key={log.id} className={`${log.msg.includes('🚨') || log.msg.includes('❌') ? 'text-red-400' : log.msg.includes('💰') ? 'text-yellow-400 font-bold bg-yellow-900/30 py-0.5 px-1 rounded -mx-1' : log.msg.includes('✅') || log.msg.includes('🛡️') ? 'text-cyan-400' : 'text-[#4ade80]'}`}>
              ❯ {log.msg}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  </div>
);

const RiskWeatherTab = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2"><CloudLightning className="text-[#16b39c]"/> Risk & Weather Intelligence</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
       {/* Live GIS Map / Location */}
       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col h-[400px]">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-[#16b39c]" /> Localized Hazard Feed</h3>
          <div className="w-full flex-1 rounded-xl overflow-hidden shadow-inner bg-slate-50 relative pointer-events-none border border-slate-200">
             <iframe 
                width="100%" height="100%" frameBorder="0"
                src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=%C2%B0C&metricWind=km%2Fh&zoom=10&overlay=wind&product=ecmwf&level=surface&lat=13.0827&lon=80.2707" 
             ></iframe>
          </div>
          <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Tracking Area: Chennai METRO</span>
            <span className="text-[#16b39c] animate-pulse font-bold flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-[#16b39c] rounded-full"></div> Streaming Real-Time Currents</span>
          </div>
       </div>

       {/* Feed Risk */}
       <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-lg p-6 text-white grid grid-rows-3 gap-4">
          <div className="flex justify-between items-center bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-inner">
             <div>
                <p className="text-[12px] text-slate-400 font-bold uppercase tracking-wider mb-1">XGBoost Risk Matrix</p>
                <h4 className="text-xl font-black text-rose-400">High Disruption Phase</h4>
             </div>
             <div className="w-14 h-14 rounded-full border-4 border-rose-500 flex items-center justify-center font-bold text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]">86%</div>
          </div>

          <div className="flex justify-between items-center bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-inner">
             <div>
                <p className="text-[12px] text-slate-400 font-bold uppercase tracking-wider mb-1">Parametric Density</p>
                <h4 className="text-lg font-bold text-yellow-400">Active Warning</h4>
             </div>
             <Shield className="w-8 h-8 text-yellow-400 opacity-80" />
          </div>

          <div className="flex justify-between items-center bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-inner">
             <div>
                <p className="text-[12px] text-slate-400 font-bold uppercase tracking-wider mb-1">Payout Auto-Trigger</p>
                <h4 className="text-lg font-bold text-[#4ade80]">Armed & Listening</h4>
             </div>
             <FileText className="w-8 h-8 text-[#4ade80] opacity-80" />
          </div>
       </div>
    </div>

    {/* Sample Datasets */}
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
       <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Database className="w-4 h-4 text-[#16b39c]"/> Curated Training Datasets</h3>
       <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-[13px] text-slate-600">
             <thead className="border-b border-slate-200 text-slate-400 text-[11px] uppercase tracking-wider">
               <tr>
                 <th className="py-3 px-4">Dataset Name</th>
                 <th className="py-3 px-4">Source Body</th>
                 <th className="py-3 px-4">Size / Records</th>
                 <th className="py-3 px-4">Impact Weight</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100 font-medium whitespace-nowrap">
               <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                  <td className="py-3 px-4 text-slate-800 font-bold flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-blue-500 group-hover:scale-110 transition-transform"/> Historic_Monsoon_Chennai_2015-2023.csv</td>
                  <td className="py-3 px-4">Indian Meteorological Dept (IMD)</td>
                  <td className="py-3 px-4 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> 2.4m</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 bg-red-50 text-red-600 border border-red-100 rounded">0.45</span></td>
               </tr>
               <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                  <td className="py-3 px-4 text-slate-800 font-bold flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-yellow-500 group-hover:scale-110 transition-transform"/> Traffic_Gridlock_Spatial_Index.json</td>
                  <td className="py-3 px-4">TomTom / Zomato Fleet APIs</td>
                  <td className="py-3 px-4 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> 420k Nodes</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 bg-orange-50 text-orange-600 border border-orange-100 rounded">0.30</span></td>
               </tr>
               <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                  <td className="py-3 px-4 text-slate-800 font-bold flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-[#16b39c] group-hover:scale-110 transition-transform"/> Acknowledge_Payout_Ledger.sql</td>
                  <td className="py-3 px-4">Razorpay Sandbox</td>
                  <td className="py-3 px-4 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> 15k Contracts</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 bg-teal-50 text-teal-600 border border-teal-100 rounded">0.25</span></td>
               </tr>
             </tbody>
          </table>
       </div>
    </div>
  </div>
);

const ClaimsTab = ({ claims }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">Claim History</h2>
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 max-w-4xl">
      <div className="space-y-4">
        {claims.map((claim, i) => (
          <div key={i} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-[#ecfdf5] flex items-center justify-center text-[#16b39c]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-800">{claim.type}</p>
                <p className="text-xs text-slate-500">{claim.trigger}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#16b39c]">{claim.amount}</p>
              <p className="text-xs text-slate-400">Ref: {claim.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PlansTab = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">Weekly Coverage Pricing</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <div className="bg-white rounded-2xl border-2 border-[#16b39c] shadow-md p-6 relative">
        <div className="absolute top-0 right-0 bg-[#16b39c] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">ACTIVE</div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Gig Worker Essential</h3>
        <p className="text-sm text-slate-500 mb-6">Automated payouts for immediate weather & traffic disruption.</p>
        <p className="text-4xl font-black text-slate-800 mb-2">₹39<span className="text-sm font-normal text-slate-500">/week</span></p>
        <p className="text-[11px] font-medium text-[#16b39c] mb-6 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> AI tuned: Saving ₹2/wk (Safe zone logged)</p>
        <ul className="space-y-3 mb-8 text-sm text-slate-600">
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#16b39c]"></div> ₹500/day Rainfall & Flood Protection</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#16b39c]"></div> Extreme Heatwave Coverage</li>
        </ul>
        <button className="w-full py-3 bg-slate-100 text-slate-500 font-bold rounded-xl cursor-default">Current Weekly Plan</button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Pro Delivery</h3>
        <p className="text-sm text-slate-500 mb-6">Maximum coverage for full-time fleet drivers.</p>
         <p className="text-4xl font-black text-slate-800 mb-2">₹79<span className="text-sm font-normal text-slate-500">/week</span></p>
         <p className="text-[11px] font-medium text-slate-400 mb-6 flex items-center gap-1">Flat pricing model across all ward zones.</p>
        <ul className="space-y-3 mb-8 text-sm text-slate-600">
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> ₹1000/day All-Weather Protection</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Priority Instant UPI Payouts</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Gridlock Traffic Delay Insurance</li>
        </ul>
        <button className="w-full py-3 bg-[#16b39c] hover:bg-[#129985] transition-colors text-white font-bold rounded-xl shadow-md">Upgrade Weekly</button>
      </div>
    </div>
  </div>
);

const ProfileTab = ({ userName, userEmail, userPhone, userInitial, onSave }) => {
  const [form, setForm] = useState({ name: userName, email: userEmail, phone: userPhone, upi: "yourname@paytm", platform: "Blinkit" });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = () => {
    onSave({ name: form.name, email: form.email, phone: form.phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const displayInitial = form.name.charAt(0).toUpperCase();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Edit Profile</h2>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
          <div className="w-20 h-20 rounded-full bg-[#16b39c] text-white flex items-center justify-center text-3xl font-bold shadow-md cursor-pointer hover:bg-[#129985] transition-colors">{displayInitial}</div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">{form.name || "Your Name"}</h3>
            <p className="text-[#16b39c] font-medium text-sm cursor-pointer hover:underline mt-1">Change Profile Picture</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Full Name</label>
              <input name="name" type="text" value={form.name} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#16b39c] focus:ring-1 focus:ring-[#16b39c] shadow-sm" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Email Address</label>
              <input name="email" type="text" value={form.email} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#16b39c] focus:ring-1 focus:ring-[#16b39c] shadow-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Phone Number</label>
            <input name="phone" type="text" value={form.phone} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#16b39c] focus:ring-1 focus:ring-[#16b39c] shadow-sm" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Linked UPI ID</label>
            <input name="upi" type="text" value={form.upi} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#16b39c] focus:ring-1 focus:ring-[#16b39c] shadow-sm" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Connected Platform API</label>
            <select name="platform" value={form.platform} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#16b39c] focus:ring-1 focus:ring-[#16b39c] bg-white shadow-sm">
               <option>Blinkit</option>
               <option>Zomato Fleet</option>
               <option>Swiggy</option>
               <option>Uber Moto</option>
            </select>
          </div>

          {saved && (
            <div className="flex items-center gap-2 bg-[#ecfdf5] border border-[#a7f3d0] text-[#059669] font-bold rounded-xl px-4 py-3 text-sm animate-in fade-in slide-in-from-bottom-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Profile saved! Changes are now reflected across your dashboard.
            </div>
          )}

          <button onClick={handleSave} className="w-full bg-[#16b39c] text-white font-bold py-3.5 rounded-xl hover:bg-[#129985] transition-colors mt-2 shadow-md border border-teal-600">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── POLICY MANAGEMENT TAB ────────────────────────────────────────────────────
const PolicyManagementTab = () => {
  const [activePolicy, setActivePolicy] = useState("PP-GIG-2024-1284");
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [renewalPlan, setRenewalPlan] = useState("Essential");
  const [renewed, setRenewed] = useState(false);
  const [expandedEndorsement, setExpandedEndorsement] = useState(null);

  const policies = [
    {
      id: "PP-GIG-2024-1284",
      name: "Gig Worker Essential",
      status: "Active",
      premium: "₹39/week",
      startDate: "01 Jan 2025",
      endDate: "31 Dec 2025",
      nextRenewal: "31 Dec 2025",
      coverage: "₹500/day",
      maxCoverage: "₹18,000/year",
      platform: "Blinkit",
      zone: "Chennai Metro",
      type: "Parametric Weather",
    },
  ];

  const coverageItems = [
    { label: "Rainfall & Flood Disruption", limit: "₹500/day", used: "₹1,000", status: "active" },
    { label: "Extreme Heatwave (≥ 45°C)", limit: "₹500/day", used: "₹0", status: "active" },
    { label: "Wind Gust Disruption (≥ 50 mph)", limit: "₹300/day", used: "₹0", status: "active" },
    { label: "AQI Hazard Cover (≥ 150)", limit: "₹200/day", used: "₹0", status: "active" },
    { label: "Traffic Gridlock Delay", limit: "₹150/day", used: "₹0", status: "inactive" },
  ];

  const endorsements = [
    { id: "E-001", title: "Zone Expansion – T. Nagar", date: "15 Mar 2025", detail: "Extended coverage zone to include T. Nagar ward boundaries effective 15-Mar-2025. Auto-triggered payout thresholds remain unchanged." },
    { id: "E-002", title: "Premium Adjustment – AI Calibration", date: "01 Apr 2025", detail: "Weekly premium reduced by ₹2 based on 30-day safe-zone telemetry data. Effective from next renewal cycle." },
  ];

  const documents = [
    { name: "Policy Schedule – PP-GIG-2024-1284.pdf", size: "142 KB", icon: "📄" },
    { name: "Terms & Conditions v3.2.pdf", size: "890 KB", icon: "📋" },
    { name: "Claim History Report – FY2025.pdf", size: "56 KB", icon: "📊" },
    { name: "Coverage Summary Card.pdf", size: "34 KB", icon: "🛡️" },
  ];

  const policy = policies.find((p) => p.id === activePolicy);
  const usedPercent = 12; // simulated usage

  const handleRenew = () => {
    setRenewed(true);
    setShowRenewalModal(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#16b39c]" /> Policy Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage your active coverage, endorsements, and renewal lifecycle.</p>
        </div>
        <button
          onClick={() => setShowRenewalModal(true)}
          className="flex items-center gap-2 bg-[#16b39c] hover:bg-[#129985] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Renew Policy
        </button>
      </div>

      {renewed && (
        <div className="flex items-center gap-3 bg-[#ecfdf5] border border-[#a7f3d0] text-[#059669] font-bold rounded-xl px-5 py-3.5 text-sm mb-6 animate-in fade-in slide-in-from-bottom-2">
          <BadgeCheck className="w-5 h-5" />
          Policy renewed successfully! Your coverage continues from 01 Jan 2026.
        </div>
      )}

      {/* Active Policy Card */}
      <div className="bg-gradient-to-br from-[#0f766e] to-[#16b39c] rounded-2xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-teal-200">Active Policy</span>
              <h3 className="text-xl font-black mt-0.5">{policy.name}</h3>
              <p className="text-teal-200 text-sm font-mono mt-0.5">{policy.id}</p>
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> {policy.status}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Weekly Premium", value: policy.premium },
              { label: "Coverage/Day", value: policy.coverage },
              { label: "Policy Start", value: policy.startDate },
              { label: "Renewal Date", value: policy.nextRenewal },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] uppercase font-bold text-teal-200 tracking-wider mb-0.5">{item.label}</p>
                <p className="text-base font-bold">{item.value}</p>
              </div>
            ))}
          </div>
          {/* Coverage bar */}
          <div className="mt-5">
            <div className="flex justify-between text-[11px] text-teal-200 mb-1.5 font-medium">
              <span>Annual Coverage Used</span>
              <span>₹1,000 / {policy.maxCoverage}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
              <div className="bg-white h-full rounded-full transition-all duration-1000" style={{ width: `${usedPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Coverage Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#16b39c]" /> Coverage Breakdown
          </h3>
          <div className="space-y-3">
            {coverageItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  {item.status === "active" ? (
                    <CheckCircle2 className="w-4 h-4 text-[#16b39c] flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  )}
                  <div>
                    <p className={`text-[13px] font-semibold ${item.status === "active" ? "text-slate-700" : "text-slate-400"}`}>{item.label}</p>
                    <p className="text-[11px] text-slate-400">Used: {item.used}</p>
                  </div>
                </div>
                <span className={`text-[12px] font-bold px-2.5 py-1 rounded-lg ${
                  item.status === "active" ? "bg-[#f0fdfa] text-[#0f766e]" : "bg-slate-100 text-slate-400"
                }`}>{item.limit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Details */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-[#16b39c]" /> Policy Details
          </h3>
          <div className="space-y-3 text-[13px]">
            {[
              { label: "Policy Type", value: policy.type },
              { label: "Platform", value: policy.platform },
              { label: "Zone", value: policy.zone },
              { label: "Policy Period", value: `${policy.startDate} – ${policy.endDate}` },
              { label: "Max Annual Cover", value: policy.maxCoverage },
              { label: "Premium Cycle", value: "Weekly (auto-deduct)" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-2.5 border-b border-slate-100 last:border-0">
                <span className="text-slate-500 font-medium">{row.label}</span>
                <span className="text-slate-800 font-bold text-right">{row.value}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors">
            <Pencil className="w-3.5 h-3.5" /> Request Policy Amendment
          </button>
        </div>
      </div>

      {/* Endorsements */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Banknote className="w-4 h-4 text-[#16b39c]" /> Policy Endorsements
        </h3>
        <div className="space-y-3">
          {endorsements.map((end) => (
            <div key={end.id} className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedEndorsement(expandedEndorsement === end.id ? null : end.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f0fdfa] flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#16b39c]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-slate-800">{end.title}</p>
                    <p className="text-[11px] text-slate-400">{end.id} · Effective {end.date}</p>
                  </div>
                </div>
                {expandedEndorsement === end.id ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {expandedEndorsement === end.id && (
                <div className="px-4 pb-4 text-[13px] text-slate-600 bg-slate-50 border-t border-slate-100 pt-3 animate-in fade-in slide-in-from-top-1">
                  {end.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Document Downloads */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Download className="w-4 h-4 text-[#16b39c]" /> Policy Documents
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {documents.map((doc) => (
            <button
              key={doc.name}
              className="flex items-center gap-3 p-4 border border-slate-100 rounded-xl hover:border-[#16b39c] hover:bg-[#f0fdfa] transition-all group text-left"
            >
              <span className="text-2xl">{doc.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-slate-700 truncate group-hover:text-[#0f766e]">{doc.name}</p>
                <p className="text-[11px] text-slate-400">{doc.size}</p>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-[#16b39c] flex-shrink-0 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Renewal Modal */}
      {showRenewalModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-t-8 border-[#16b39c] animate-in zoom-in-95 duration-300">
            <h3 className="text-xl font-black text-slate-800 mb-1">Renew Your Policy</h3>
            <p className="text-slate-500 text-sm mb-6">Select a plan and confirm renewal starting 01 Jan 2026.</p>
            <div className="space-y-3 mb-6">
              {[
                { name: "Essential", price: "₹39/week", desc: "₹500/day – Rainfall, Heatwave" },
                { name: "Pro Delivery", price: "₹79/week", desc: "₹1,000/day – All-Weather + Priority UPI" },
              ].map((plan) => (
                <button
                  key={plan.name}
                  onClick={() => setRenewalPlan(plan.name)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    renewalPlan === plan.name
                      ? "border-[#16b39c] bg-[#f0fdfa]"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-slate-800">{plan.name}</p>
                    <p className="font-black text-[#16b39c]">{plan.price}</p>
                  </div>
                  <p className="text-[12px] text-slate-500 mt-1">{plan.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRenewalModal(false)}
                className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRenew}
                className="flex-1 py-3 bg-[#16b39c] hover:bg-[#129985] text-white font-bold rounded-xl shadow-md transition-colors"
              >
                Confirm Renewal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SettingsTab = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">Configuration</h2>
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div>
             <h4 className="font-bold text-slate-800">SMS Alerts</h4>
             <p className="text-sm text-slate-500 mt-1">Get notified instantly when storm fronts trigger payout thresholds.</p>
          </div>
          <div className="w-12 h-6 bg-[#16b39c] rounded-full relative cursor-pointer"><div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div></div>
        </div>
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div>
             <h4 className="font-bold text-slate-800">Auto Payout Execution</h4>
             <p className="text-sm text-slate-500 mt-1">Directly fire smart contract payouts directly to your linked UPI ID without manual claiming.</p>
          </div>
          <div className="w-12 h-6 bg-[#16b39c] rounded-full relative cursor-pointer"><div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div></div>
        </div>
        <div className="pt-4">
           <button className="text-red-500 font-bold hover:text-red-600 transition-colors">Sign Out of Device</button>
        </div>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Home");

  // Read logged-in user from localStorage into state so updates re-render the whole dashboard
  const [userName, setUserName] = useState(() => localStorage.getItem("pp_user_name") || "User");
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("pp_user_email") || "");
  const [userPhone, setUserPhone] = useState(() => localStorage.getItem("pp_user_phone") || "");
  const userInitial = userName.charAt(0).toUpperCase();

  // Called from ProfileTab when the user hits "Save Configuration"
  const handleProfileSave = ({ name, email, phone }) => {
    localStorage.setItem("pp_user_name", name);
    localStorage.setItem("pp_user_email", email);
    localStorage.setItem("pp_user_phone", phone);
    setUserName(name);
    setUserEmail(email);
    setUserPhone(phone);
  };

  // Live Telemetry Simulation
  const [rainfall, setRainfall] = useState(4.2);
  const [wind, setWind] = useState(45);
  const [aqi, setAqi] = useState(110);
  const [balance, setBalance] = useState(4250.00);
  const [pipelineState, setPipelineState] = useState(null); // null | "TRACKER" | "PAYOUT"
  const [trackerStep, setTrackerStep] = useState(0);
  const [timer, setTimer] = useState(120);
  const [sysLogs, setSysLogs] = useState([]);
  
  // Notification State
  const [notifications, setNotifications] = useState([
     { id: "init-1", title: `Welcome back, ${userName}. Your coverage is active.`, time: "System Login", read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const [claims, setClaims] = useState([{ id: "PAY-1284", type: "Parametric Weather Payout", trigger: "Auto-triggered via Heavy Rainfall Detection", amount: "+ ₹500.00" }]);
  
  const bottomRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sysLogs]);

  useEffect(() => {
    // Connect to WebSocket Server for live pipeline logs
    const socket = io("http://localhost:4000");
    socket.on("log", (msg) => {
      setSysLogs(prev => [...prev.slice(-30), { id: Date.now() + Math.random(), msg }]);
      
      // Step tracker orchestration
      if (msg.includes("[TRIGGER] 🚨")) {
         setNotifications(prev => [{ id: Date.now().toString(), title: 'Live Risk Alert: Anomalous weather detected!', time: 'Just now', read: false }, ...prev]);
         setPipelineState("TRACKER");
         setTrackerStep(1);
         setTimer(120);
      } else if (msg.includes("[WORKER 1")) {
         setTrackerStep(2);
      } else if (msg.includes("[WORKER 2")) {
         setTrackerStep(3);
      } else if (msg.includes("SUCCESS!")) {
         setTrackerStep(4);
         setNotifications(prev => [{ id: (Date.now() + 1).toString(), title: 'Amount Credited! ₹500 transferred to UPI.', time: 'Just now', read: false }, ...prev]);
         
         // Trigger final success overlay & UI updates
         setTimeout(() => {
            setPipelineState("PAYOUT");
            setBalance(prev => prev + 500); // 💰 Dashboard UI Change!
            setClaims(prev => [
              { id: `PAY-${Math.floor(Math.random()*9000)+1000}`, type: "Parametric Storm Payout", trigger: "Auto-triggered via Localized Disruption", amount: "+ ₹500.00" },
              ...prev
            ]); // 💰 Claims Tab Update!
         }, 1500);
      }
    });

    // 120-Second Virtual Tracker countdown (simulated execution bounds)
    const tInterval = setInterval(() => {
       setTimer(t => (t > 0 ? t - 1 : 0));
    }, 1000);

    const interval = setInterval(() => {
      let currentRain = 4.2;
      let currentWind = 45;
      let currentAqi = 110;

      // Rainfall: Swings between 0 and 50 so it triggers the >10 threshold aggressively
      setRainfall(prev => {
        const next = Number(prev) + (Math.random() * 8 + 1);
        if (next > 45) return 0; // Reset after storm passes
        currentRain = Number(Math.max(0, next).toFixed(1));
        return currentRain;
      });
      
      // Wind: Swings between 30 and 65 to trigger >50 threshold
      setWind(prev => {
        const next = prev + (Math.random() * 10 - 4);
        currentWind = Math.max(30, Math.min(65, Math.round(next)));
        return currentWind;
      });
      
      // AQI: Slowly creeps up and down, occasionally spiking
      setAqi(prev => {
        const next = prev + (Math.random() * 20 - 8);
        currentAqi = Math.max(40, Math.min(180, Math.round(next)));
        return currentAqi;
      });
      
      // Send Telemetry Payload to XGBoost Backend Service
      fetch("http://localhost:4000/trigger/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: "Chennai Metro",
          rainfall: currentRain,
          wind: currentWind,
          aqi: currentAqi,
          workerId: "WKR-RAJU-99X"
        }),
      }).catch(err => console.log("Backend offline or not reachable."));

    }, 3500); // Ticking every 3.5s to let the full BullMQ payout pipeline finish comfortably
    
    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);

  // DEMO BUTTON LOGIC: Force a giant storm for the presentation hack
  const triggerMockStorm = () => {
     setRainfall(120.5); // Instant severe trigger
     setWind(65);
     fetch("http://localhost:4000/trigger/ingest", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         city: "Chennai Metro",
         rainfall: 120.5,
         wind: 65,
         aqi: 220,
         workerId: "WKR-RAJU-99X"
       }),
     }).catch(err => console.log(err));
  };

  const sidebarLinks = [
    { name: "Home", icon: <Home className="w-[18px] h-[18px]" /> },
    { name: "Risk & Weather", icon: <CloudLightning className="w-[18px] h-[18px]" /> },
    { name: "AI Risk Engine", icon: <Cpu className="w-[18px] h-[18px]" /> },
    { name: "Policy", icon: <BookOpen className="w-[18px] h-[18px]" /> },
    { name: "Claims", icon: <FileText className="w-[18px] h-[18px]" /> },
    { name: "Plans", icon: <CreditCard className="w-[18px] h-[18px]" /> },
    { name: "System Terminal", icon: <Terminal className="w-[18px] h-[18px]" /> },
  ];

  const prefLinks = [
    { name: "Profile", icon: <User className="w-[18px] h-[18px]" /> },
    { name: "Settings", icon: <Settings className="w-[18px] h-[18px]" /> },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden relative">
    
      {/* PROCESSING TRACKER OVERLAY */}
      {pipelineState === "TRACKER" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300 transition-all">
           <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-500 border-t-8 border-[#16b39c]">
              <div className="mb-6 w-full flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full border-4 border-[#16b39c] border-t-transparent animate-spin mb-4"></div>
                 <h2 className="text-2xl font-black text-slate-800">Processing Parametric Claim</h2>
                 <p className="text-slate-500 text-sm mt-1">Smart Contract pipeline is actively executing.</p>
              </div>

              <div className="w-full space-y-3 mt-4">
                 <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${trackerStep >= 1 ? 'border-[#16b39c] bg-[#eefcf9] shadow-sm' : 'border-slate-100 bg-slate-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${trackerStep >= 1 ? 'bg-[#16b39c] text-white animate-pulse' : 'bg-slate-200 text-slate-400'}`}><CloudLightning className="w-4 h-4"/></div>
                    <div className="flex-1"><p className={`text-sm ${trackerStep >= 1 ? 'font-bold text-[#0f766e]' : 'text-slate-400 font-medium'}`}>1. Local Disruption Detected</p></div>
                 </div>
                 <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${trackerStep >= 2 ? 'border-[#16b39c] bg-[#eefcf9] shadow-sm' : 'border-slate-100 bg-slate-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${trackerStep >= 2 ? 'bg-[#16b39c] text-white animate-pulse' : 'bg-slate-200 text-slate-400'}`}><FileText className="w-4 h-4"/></div>
                    <div className="flex-1"><p className={`text-sm ${trackerStep >= 2 ? 'font-bold text-[#0f766e]' : 'text-slate-400 font-medium'}`}>2. Claim Initialized in Ledger</p></div>
                 </div>
                 <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${trackerStep >= 3 ? 'border-[#16b39c] bg-[#eefcf9] shadow-sm' : 'border-slate-100 bg-slate-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${trackerStep >= 3 ? 'bg-[#16b39c] text-white animate-pulse' : 'bg-slate-200 text-slate-400'}`}><Shield className="w-4 h-4"/></div>
                    <div className="flex-1"><p className={`text-sm ${trackerStep >= 3 ? 'font-bold text-[#0f766e]' : 'text-slate-400 font-medium'}`}>3. AI Fraud & Location Vetted</p></div>
                 </div>
                 <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${trackerStep >= 4 ? 'border-[#16b39c] bg-[#eefcf9] shadow-sm' : 'border-slate-100 bg-slate-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${trackerStep >= 4 ? 'bg-[#16b39c] text-white' : 'bg-slate-200 text-slate-400'}`}><CreditCard className="w-4 h-4"/></div>
                    <div className="flex-1"><p className={`text-sm ${trackerStep >= 4 ? 'font-bold text-[#0f766e]' : 'text-slate-400 font-medium'}`}>4. Releasing Funds via Razorpay UPI</p></div>
                 </div>
              </div>

              <div className="mt-8 font-mono text-xs text-slate-600 font-bold bg-slate-100 px-4 py-3 rounded-full flex items-center justify-center w-full gap-2 border border-slate-200">
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                 Maximum Processing Time Bound: <span className="text-slate-800 text-[14px] bg-white px-2 py-0.5 rounded shadow-sm">{timer}s</span>
              </div>
           </div>
        </div>
      )}

      {/* FINAL PAYOUT OVERLAY EFFECT */}
      {pipelineState === "PAYOUT" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-500 scale-110 border-4 border-[#16b39c]">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 border-8 border-green-100">
                 <div className="w-16 h-16 bg-[#16b39c] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                 </div>
              </div>
              <h2 className="text-4xl font-black text-slate-800 mb-2">Payment Credited!</h2>
              <p className="text-[#16b39c] font-black text-sm tracking-widest uppercase mb-6 flex items-center justify-center gap-2">
                 <CloudLightning className="w-4 h-4" /> ₹500.00 Transferred to Wallet
              </p>
              
              <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-3 text-[13px] text-slate-600 mb-8 font-medium shadow-inner">
                <div className="flex justify-between border-b border-slate-100 pb-2"><span>Detection Type</span> <span className="font-bold text-slate-800">Severe Disruption Event</span></div>
                <div className="flex justify-between border-b border-slate-100 pb-2"><span>Settlement</span> <span className="font-bold text-slate-800">Razorpay UPI Engine</span></div>
                <div className="flex justify-between"><span>SLA Check</span> <span className="font-bold text-[#16b39c]">Fulfilled (-{120 - timer}s)</span></div>
              </div>

              <button onClick={() => { setPipelineState(null); clearInterval(tInterval); }} className="w-full py-3.5 bg-slate-800 hover:bg-slate-900 transition-colors text-white font-bold rounded-xl shadow-md text-[15px]">
                Return to Dashboard
              </button>
           </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-[240px] bg-white border-r border-slate-200 flex flex-col hidden md:flex flex-shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-[#16b39c] p-1.5 rounded-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-[18px] text-slate-800 tracking-tight">PayProtect</span>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {/* Main Menu */}
          <div className="px-4 mb-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Main Menu</p>
            <nav className="space-y-1">
              {sidebarLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                    activeTab === item.name
                      ? "bg-[#eefcf9] text-[#16b39c]"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  <span className={`${activeTab === item.name ? "text-[#16b39c]" : "text-slate-400"}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Preferences */}
          <div className="px-4 mt-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Preferences</p>
            <nav className="space-y-1">
              {prefLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                    activeTab === item.name
                      ? "bg-[#eefcf9] text-[#16b39c]"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  <span className={`${activeTab === item.name ? "text-[#16b39c]" : "text-slate-400"}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TOP HEADER */}
        <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
          {/* Search bar */}
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-50 border border-slate-200 text-[13px] rounded-lg pl-9 pr-4 py-2 outline-none focus:bg-white focus:border-[#16b39c] transition-all text-slate-700"
            />
          </div>

          {/* User actions */}
          <div className="flex items-center gap-5">
            <div className="relative">
               <button onClick={() => { setShowNotifications(!showNotifications); setNotifications(prev => prev.map(n => ({...n, read: true}))); }} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#16b39c] hover:border-[#16b39c] transition-colors shadow-sm focus:outline-none">
                 <Bell className="w-5 h-5" />
                 {unreadCount > 0 && <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>}
                 {unreadCount > 0 && <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>}
               </button>

               {showNotifications && (
                 <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-slate-200 shadow-xl rounded-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-slate-800 flex justify-between items-center">
                       Notifications
                       <span className="text-xs bg-[#16b39c] text-white px-2 py-0.5 rounded-full">{notifications.length}</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto w-full divide-y divide-slate-100">
                       {notifications.map(n => (
                         <div key={n.id} className={`p-4 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-teal-50/50' : ''}`}>
                           <p className={`text-sm ${!n.read ? 'font-bold text-[#16b39c]' : 'font-bold text-slate-800'}`}>{n.title}</p>
                           <p className="text-xs text-slate-500 mt-1">{n.time}</p>
                         </div>
                       ))}
                    </div>
                 </div>
               )}
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <Info className="w-[18px] h-[18px]" />
            </button>
            <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right">
                <p className="text-[13px] font-semibold text-slate-800 leading-tight">{userName}</p>
                <p className="text-[11px] text-slate-500">Gig Worker Plan</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#16b39c] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                {userInitial}
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-[1200px] mx-auto">
            
            {(activeTab === "Home" || activeTab === "Dashboard") && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Page Header Area */}
                <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-[24px] font-bold text-slate-800 tracking-tight flex items-center gap-2">
                  Good Morning, {userName} <span className="text-2xl">👋</span>
                </h1>
                <p className="text-[14px] text-slate-500 mt-1">
                  Your income protection is fully active for your current shift zone.
                </p>
              </div>
              <button className="bg-[#16b39c] hover:bg-[#129985] text-white px-5 py-2 rounded-lg text-[13px] font-semibold flex items-center gap-2 shadow-sm shadow-teal-500/20 transition-all">
                <CloudLightning className="w-4 h-4" /> Upgrade Coverage
              </button>
            </div>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Card 1: Protected Income */}
              <div className="bg-[#16b39c] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <p className="text-[13px] text-teal-50 font-medium">Protected Income</p>
                  <Shield className="w-4 h-4 text-teal-100 opacity-80" />
                </div>
                <div className="relative">
                  <h2 className={`text-3xl font-bold mb-4 relative z-10 transition-colors duration-500 ${pipelineState === "PAYOUT" ? 'text-green-300' : 'text-white'}`}>
                    ₹{balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h2>
                  {pipelineState === "PAYOUT" && (
                    <div className="absolute -top-6 left-0 text-green-300 font-bold text-sm animate-bounce">
                      + ₹500.00 payout!
                    </div>
                  )}
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-[11px] font-semibold relative z-10">
                   <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></div>
                   Active Policy
                </div>
              </div>

              {/* Card 2: Current Risk Zone */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[13px] text-slate-500 font-medium">Current Risk Zone</p>
                  <div className="w-7 h-7 rounded-full bg-[#f0fdfa] flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5 text-[#16b39c]" />
                  </div>
                </div>
                <h2 className="text-[18px] font-bold text-slate-800 mb-5">Anna Nagar Sector 4</h2>
                <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#ecfdf5] text-[#059669] text-[11px] font-semibold border border-green-100">
                   Low Risk
                </div>
              </div>

              {/* Card 3: Next Payout Cycle */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[13px] text-slate-500 font-medium">Next Payout Cycle</p>
                  <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
                <h2 className="text-[18px] font-bold text-slate-800 mb-6">12 Days</h2>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#16b39c] w-[35%] h-full rounded-full relative overflow-hidden">
                     <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-[-150%] animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 2-Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Col: Params + Map */}
              <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Left Form: Live Parameter Feed */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                 <div className="flex items-center justify-between mb-6">
                   <h3 className="text-[15px] font-bold text-slate-800">Live Parameter Feed</h3>
                   <span className="px-3 py-1 bg-[#f0fdfa] text-[#0f766e] text-[11px] font-bold rounded-full border border-teal-100">
                     Auto-Monitoring
                   </span>
                 </div>

                 <div className="w-full">
                   <div className="grid grid-cols-4 pb-3 border-b border-slate-100 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                     <div>Parameter</div>
                     <div>Current Value</div>
                     <div>Threshold</div>
                     <div>Status</div>
                   </div>

                   <div className="divide-y divide-slate-100">
                     {/* Row 1 */}
                     <div className="grid grid-cols-4 py-4 text-[13px] items-center transition-all">
                       <div className="font-medium text-slate-700">Rainfall (mm/h)</div>
                       <div className={`transition-colors duration-300 ${rainfall >= 10 ? 'text-red-500 font-bold' : 'text-slate-600'}`}>{rainfall} mm</div>
                       <div className="text-slate-400">≥ 10 mm</div>
                       <div className={`${rainfall >= 10 ? 'text-red-500 bg-red-50 px-2' : 'text-[#059669]'} font-medium py-0.5 rounded inline-block w-max`}>
                          {rainfall >= 10 ? 'Triggered' : 'Nominal'}
                       </div>
                     </div>
                     
                     {/* Row 2 */}
                     <div className="grid grid-cols-4 py-4 text-[13px] items-center transition-all">
                       <div className="font-medium text-slate-700">Wind Gusts</div>
                       <div className={`transition-colors duration-300 ${wind >= 50 ? 'text-red-500' : 'text-[#d97706]'} font-bold`}>{wind} mph</div>
                       <div className="text-slate-400">≥ 50 mph</div>
                       <div className={`${wind >= 50 ? 'text-red-500 bg-red-50' : 'text-[#d97706] bg-orange-50'} font-medium px-2 py-0.5 rounded inline-block w-max`}>
                          {wind >= 50 ? 'Severe' : 'Elevated'}
                       </div>
                     </div>

                     {/* Row 3 */}
                     <div className="grid grid-cols-4 py-4 text-[13px] items-center transition-all border-b border-slate-100">
                       <div className="font-medium text-slate-700">AQI Level</div>
                       <div className={`transition-colors duration-300 ${aqi >= 150 ? 'text-red-500 font-bold' : 'text-slate-600'}`}>{aqi}</div>
                       <div className="text-slate-400">≥ 150</div>
                       <div className={`${aqi >= 150 ? 'text-red-500 bg-red-50 px-2' : 'text-[#059669]'} font-medium py-0.5 rounded inline-block w-max`}>
                          {aqi >= 150 ? 'Severe' : 'Nominal'}
                       </div>
                     </div>

                     {/* Row 4: Map/Traffic Integration */}
                     <div className="grid grid-cols-4 py-4 text-[13px] items-center transition-all border-b border-slate-100">
                       <div className="font-medium text-slate-700 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400"/> Traffic Index</div>
                       <div className={`transition-colors duration-300 ${rainfall >= 30 ? 'text-[#d97706] font-bold' : 'text-slate-600'}`}>{rainfall >= 30 ? 'High / Gridlock' : 'Flowing'}</div>
                       <div className="text-slate-400">Blocked</div>
                       <div className={`${rainfall >= 30 ? 'text-[#d97706] bg-orange-50 px-2' : 'text-[#059669]'} font-medium py-0.5 rounded inline-block w-max`}>
                          {rainfall >= 30 ? 'Alert' : 'Nominal'}
                       </div>
                     </div>

                     {/* Row 5: Temperature Heatwave */}
                     <div className="grid grid-cols-4 py-4 text-[13px] items-center transition-all border-b border-slate-100">
                       <div className="font-medium text-slate-700">Surface Temp.</div>
                       <div className="text-slate-600 font-bold">34.2 °C</div>
                       <div className="text-slate-400">≥ 45 °C</div>
                       <div className="text-[#059669] font-medium py-0.5 rounded inline-block w-max">
                          Nominal
                       </div>
                     </div>

                     {/* Row 6: Urban Waterlogging Risk */}
                     <div className="grid grid-cols-4 py-4 text-[13px] items-center transition-all border-b border-slate-100">
                       <div className="font-medium text-slate-700">Waterlogging Prob.</div>
                       <div className={`transition-colors duration-300 ${rainfall >= 20 ? 'text-red-500 font-bold' : 'text-slate-600'}`}>{rainfall >= 20 ? '89%' : '14%'}</div>
                       <div className="text-slate-400">≥ 80%</div>
                       <div className={`${rainfall >= 20 ? 'text-red-500 bg-red-50 px-2' : 'text-[#059669]'} font-medium py-0.5 rounded inline-block w-max`}>
                          {rainfall >= 20 ? 'Critical' : 'Nominal'}
                       </div>
                     </div>

                     {/* Row 7: Barometric Pressure */}
                     <div className="grid grid-cols-4 py-4 text-[13px] items-center transition-all">
                       <div className="font-medium text-slate-700">Barometric P.</div>
                       <div className={`transition-colors duration-300 ${wind >= 60 ? 'text-[#d97706] font-bold' : 'text-slate-600'}`}>{wind >= 60 ? '988 hPa' : '1008 hPa'}</div>
                       <div className="text-slate-400">≤ 990 hPa</div>
                       <div className={`${wind >= 60 ? 'text-[#d97706] bg-orange-50 px-2' : 'text-[#059669]'} font-medium py-0.5 rounded inline-block w-max`}>
                          {wind >= 60 ? 'Cyclone Alert' : 'Stable'}
                       </div>
                     </div>
                   </div>
                 </div>
              </div>
              </div>

              {/* Right Col: Quick Actions */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-[15px] font-bold text-slate-800 mb-6">Quick Actions</h3>
                
                <div className="space-y-3 mb-6">
                  <button className="w-full flex items-center justify-between p-3.5 border border-slate-100 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors text-left group">
                    <span className="text-[13px] font-medium text-slate-700">File Manual Claim</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#16b39c] transition-colors" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3.5 border border-slate-100 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors text-left group">
                    <span className="text-[13px] font-medium text-slate-700">View Policy Docs</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#16b39c] transition-colors" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3.5 border border-slate-100 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors text-left group">
                    <span className="text-[13px] font-medium text-slate-700">Update Work Zones</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#16b39c] transition-colors" />
                  </button>
                </div>

                <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-[#d97706]" />
                    <h4 className="text-[12px] font-bold text-[#b45309]">Monsoon Warning</h4>
                  </div>
                  <p className="text-[11px] text-[#92400e] leading-relaxed">
                    Severe weather expected in Chennai Metro. Payout triggers automatically lowered to protect shift hours.
                  </p>
                </div>

              </div>
            </div>
            </div>
            )}

            {activeTab === "AI Risk Engine" && <AiPredictionTab />}
            {activeTab === "System Terminal" && <TerminalTab sysLogs={sysLogs} bottomRef={bottomRef} triggerMockStorm={triggerMockStorm} />}
            {activeTab === "Risk & Weather" && <RiskWeatherTab />}
            {activeTab === "Claims" && <ClaimsTab claims={claims} />}
            {activeTab === "Policy" && <PolicyManagementTab />}
            {activeTab === "Plans" && <PlansTab />}
            {activeTab === "Profile" && <ProfileTab userName={userName} userEmail={userEmail} userPhone={userPhone} userInitial={userInitial} onSave={handleProfileSave} />}
            {activeTab === "Settings" && <SettingsTab />}

          </div>
        </main>
      </div>
    </div>
  );
}