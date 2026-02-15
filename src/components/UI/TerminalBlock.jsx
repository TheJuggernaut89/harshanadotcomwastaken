import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Wifi, Cpu, Activity } from 'lucide-react';

const TerminalBlock = ({ type = 'terminal' }) => {
  const [lines, setLines] = useState([]);
  const [active, setActive] = useState(true);

  // Simulation scenarios
  const scenarios = {
    terminal: [
      { text: "> ESTABLISHING SECURE CONNECTION...", delay: 200, color: "text-blue-400" },
      { text: "> HANDSHAKE_PROTOCOL_V4: VERIFIED", delay: 800, color: "text-green-400" },
      { text: "> ACCESSING MAINFRAME...", delay: 1400, color: "text-yellow-400" },
      { text: "> DECRYPTING ASSETS...", delay: 2000, color: "text-zinc-300" },
      { text: "> SYSTEM READY. WELCOME ADMIN.", delay: 2800, color: "text-green-500 font-bold" }
    ],
    server: [
      { text: "[INFO] Initializing server node @192.168.1.42", delay: 100, color: "text-zinc-400" },
      { text: "[WARN] Latency spike detected (15ms)", delay: 600, color: "text-yellow-500" },
      { text: "[INFO] Optimizing route tables...", delay: 1200, color: "text-blue-400" },
      { text: "[SUCCESS] DayZ Mod Service: RUNNING", delay: 1800, color: "text-green-400" },
      { text: "[INFO] Listening on port 3000", delay: 2400, color: "text-zinc-300" }
    ],
    scan: [
      { text: "Scanning dependency tree...", delay: 100, color: "text-zinc-400" },
      { text: "Found 42 vulnerabilities (0 critical)", delay: 800, color: "text-green-400" },
      { text: "Updating package.json...", delay: 1500, color: "text-blue-400" },
      { text: "Running 'npm audit fix'...", delay: 2200, color: "text-yellow-400" },
      { text: "Build completed in 2.4s", delay: 3000, color: "text-green-500" }
    ]
  };

  const currentScenario = scenarios[type] || scenarios['terminal'];

  useEffect(() => {
    let timeouts = [];

    // Reset lines
    setLines([]);

    // Schedule lines
    currentScenario.forEach((line) => {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, line.delay);
      timeouts.push(timeout);
    });

    // End simulation
    const endTimeout = setTimeout(() => {
      setActive(false);
    }, currentScenario[currentScenario.length - 1].delay + 500);
    timeouts.push(endTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [type]);

  return (
    <div className="w-full my-2 overflow-hidden rounded-lg bg-black border border-green-500/30 font-mono text-xs shadow-lg">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-green-900/20 border-b border-green-500/20">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-green-500" />
          <span className="text-[10px] text-green-400 uppercase tracking-wider font-bold">
            {type.toUpperCase()}_SIMULATOR
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-3 min-h-[100px] flex flex-col gap-1 relative">
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none bg-[length:100%_2px,3px_100%] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,0,0.06),rgba(0,0,0,0.02))] opacity-20 z-10"></div>

        {lines.map((line, i) => (
          <div key={i} className={`${line.color} animate-in fade-in slide-in-from-left-2 duration-300`}>
            {line.text}
          </div>
        ))}

        {active && (
          <div className="text-green-500 animate-pulse mt-1">_</div>
        )}
      </div>
    </div>
  );
};

export default TerminalBlock;
