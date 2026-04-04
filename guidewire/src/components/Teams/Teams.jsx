import React from "react";

function Team() {
  const teamMembers = [
    {
      name: "Rohan A M",
      
    },
    {
      name: " Vaishnavi Sai",
     
    },
    {
      name: "Aravindh R",

    },
    {
      name: "Sampath",
     
    },
    {
      name: "Mithran",
     
    },
  ];

  return (
    <section className="min-h-screen bg-black py-20 px-6">

      {/* HEADING */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Meet the <span className="text-cyan-400">Team</span>
        </h2>
        <p className="text-gray-400 mt-4">
          The builders behind GigShield.
        </p>
      </div>

      {/* TEAM GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">

        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
            hover:border-cyan-400/40 transition duration-300 hover:scale-105 text-center"
          >

            {/* INITIALS ICON (instead of image) */}
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full 
              bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-bold text-lg">
              {member.name.split(" ").map(n => n[0]).join("")}
            </div>

            {/* NAME */}
            <h3 className="text-lg font-semibold text-white">
              {member.name}
            </h3>

            {/* ROLE */}
            <p className="text-cyan-400 text-sm mt-1">
              {member.role}
            </p>

            {/* GLOW */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 
              bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl rounded-2xl"></div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default Team;