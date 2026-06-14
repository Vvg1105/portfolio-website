"use client";

import { useEffect, useRef } from "react";

export default function PCBBackground() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf: number;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    const depth = 10;

    const onMove = (clientX: number, clientY: number) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((clientX - cx) / cx) * depth;
      targetY = ((clientY - cy) / cy) * depth;
    };

    const onMouse = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      if (svgRef.current) {
        svgRef.current.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Very subtle — so ICs pop
  const tc  = "rgba(34,211,238,0.07)";   // main traces
  const tc2 = "rgba(34,211,238,0.04)";   // secondary traces
  const th  = "rgba(34,211,238,0.22)";   // animated signal pulse
  const vc  = "rgba(34,211,238,0.14)";   // via ring
  const vc2 = "rgba(34,211,238,0.28)";   // via centre
  const sc  = "rgba(200,240,255,0.04)";  // silkscreen

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <svg
        ref={svgRef}
        style={{ position: "absolute", top: "-5%", left: "-5%", width: "110%", height: "110%", willChange: "transform" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="trace-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="via-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="signal-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <pattern id="pcb" x="0" y="0" width="320" height="240" patternUnits="userSpaceOnUse">

            {/* ── BASE TRACES ── */}
            <g stroke={tc} strokeWidth="1.4" strokeLinecap="square" fill="none" filter="url(#trace-glow)">
              {/* Horizontal */}
              <line x1="0"   y1="0"   x2="40"  y2="0"  />
              <line x1="80"  y1="0"   x2="200" y2="0"  />
              <line x1="240" y1="0"   x2="320" y2="0"  />
              <line x1="0"   y1="40"  x2="40"  y2="40" />
              <line x1="120" y1="40"  x2="280" y2="40" />
              <line x1="0"   y1="80"  x2="120" y2="80" />
              <line x1="200" y1="80"  x2="240" y2="80" />
              <line x1="0"   y1="120" x2="80"  y2="120"/>
              <line x1="120" y1="120" x2="200" y2="120"/>
              <line x1="240" y1="120" x2="320" y2="120"/>
              <line x1="0"   y1="160" x2="80"  y2="160"/>
              <line x1="160" y1="160" x2="240" y2="160"/>
              <line x1="0"   y1="200" x2="40"  y2="200"/>
              <line x1="80"  y1="200" x2="120" y2="200"/>
              <line x1="160" y1="200" x2="320" y2="200"/>
              <line x1="40"  y1="240" x2="120" y2="240"/>
              <line x1="160" y1="240" x2="240" y2="240"/>
              <line x1="280" y1="240" x2="320" y2="240"/>
              {/* Vertical */}
              <line x1="0"   y1="0"   x2="0"   y2="40" />
              <line x1="40"  y1="0"   x2="40"  y2="80" />
              <line x1="80"  y1="0"   x2="80"  y2="80" />
              <line x1="160" y1="0"   x2="160" y2="40" />
              <line x1="200" y1="0"   x2="200" y2="40" />
              <line x1="280" y1="0"   x2="280" y2="40" />
              <line x1="120" y1="40"  x2="120" y2="120"/>
              <line x1="160" y1="40"  x2="160" y2="80" />
              <line x1="200" y1="40"  x2="200" y2="80" />
              <line x1="0"   y1="80"  x2="0"   y2="200"/>
              <line x1="80"  y1="80"  x2="80"  y2="160"/>
              <line x1="160" y1="80"  x2="160" y2="160"/>
              <line x1="200" y1="80"  x2="200" y2="120"/>
              <line x1="240" y1="80"  x2="240" y2="120"/>
              <line x1="280" y1="40"  x2="280" y2="120"/>
              <line x1="80"  y1="160" x2="80"  y2="200"/>
              <line x1="120" y1="160" x2="120" y2="200"/>
              <line x1="160" y1="160" x2="160" y2="240"/>
              <line x1="240" y1="120" x2="240" y2="240"/>
              <line x1="0"   y1="200" x2="0"   y2="240"/>
              <line x1="40"  y1="200" x2="40"  y2="240"/>
              <line x1="280" y1="120" x2="280" y2="240"/>
              {/* Diagonals */}
              <line x1="80"  y1="80"  x2="120" y2="40" />
              <line x1="160" y1="40"  x2="200" y2="80" />
              <line x1="40"  y1="160" x2="80"  y2="120"/>
              <line x1="200" y1="120" x2="240" y2="80" />
              <line x1="160" y1="200" x2="200" y2="160"/>
              <line x1="240" y1="200" x2="280" y2="160"/>
            </g>

            {/* ── SECONDARY TRACES ── */}
            <g stroke={tc2} strokeWidth="0.9" strokeLinecap="round" fill="none">
              <line x1="40"  y1="80"  x2="80"  y2="80" />
              <line x1="160" y1="120" x2="200" y2="120"/>
              <line x1="0"   y1="40"  x2="0"   y2="80" />
              <line x1="320" y1="0"   x2="320" y2="80" />
              <line x1="320" y1="160" x2="320" y2="240"/>
              <line x1="120" y1="200" x2="120" y2="240"/>
              <line x1="40"  y1="40"  x2="80"  y2="40" />
            </g>

            {/* ── ANIMATED SIGNAL PULSES (SMIL) ── */}
            {/* Signal traveling right along top rail */}
            <line x1="0" y1="0" x2="320" y2="0"
              stroke={th} strokeWidth="1.8" strokeLinecap="round"
              strokeDasharray="12 308" filter="url(#signal-glow)" opacity="0.9">
              <animate attributeName="stroke-dashoffset" from="0" to="-320" dur="2.8s" repeatCount="indefinite"/>
            </line>

            {/* Signal traveling down left rail */}
            <line x1="0" y1="0" x2="0" y2="240"
              stroke={th} strokeWidth="1.8" strokeLinecap="round"
              strokeDasharray="10 230" filter="url(#signal-glow)" opacity="0.9">
              <animate attributeName="stroke-dashoffset" from="0" to="-240" dur="2.2s" repeatCount="indefinite" begin="0.6s"/>
            </line>

            {/* Signal traveling right along middle rail */}
            <line x1="0" y1="120" x2="320" y2="120"
              stroke={th} strokeWidth="1.6" strokeLinecap="round"
              strokeDasharray="14 306" filter="url(#signal-glow)" opacity="0.75">
              <animate attributeName="stroke-dashoffset" from="0" to="-320" dur="3.4s" repeatCount="indefinite" begin="1.2s"/>
            </line>

            {/* Signal traveling down centre vertical */}
            <line x1="160" y1="0" x2="160" y2="240"
              stroke={th} strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray="10 230" filter="url(#signal-glow)" opacity="0.7">
              <animate attributeName="stroke-dashoffset" from="0" to="-240" dur="2.6s" repeatCount="indefinite" begin="0.9s"/>
            </line>

            {/* Signal along bottom rail */}
            <line x1="320" y1="200" x2="0" y2="200"
              stroke={th} strokeWidth="1.4" strokeLinecap="round"
              strokeDasharray="10 310" filter="url(#signal-glow)" opacity="0.65">
              <animate attributeName="stroke-dashoffset" from="0" to="-320" dur="3.1s" repeatCount="indefinite" begin="1.8s"/>
            </line>

            {/* ── VIAS ── */}
            {([
              [0,0],[40,0],[80,0],[160,0],[200,0],[240,0],[320,0],
              [0,40],[40,40],[120,40],[160,40],[200,40],[280,40],
              [0,80],[40,80],[80,80],[120,80],[160,80],[200,80],[240,80],[320,80],
              [0,120],[80,120],[120,120],[200,120],[240,120],[280,120],[320,120],
              [0,160],[40,160],[80,160],[160,160],[240,160],[280,160],
              [0,200],[40,200],[80,200],[120,200],[160,200],[240,200],[280,200],[320,200],
              [0,240],[40,240],[160,240],[240,240],[280,240],[320,240],
            ] as [number,number][]).map(([cx, cy], i) => (
              <g key={i} filter="url(#via-glow)">
                {/* Outer annular ring */}
                <circle cx={cx} cy={cy} r={5.5} fill={vc}>
                  <animate attributeName="opacity" values="0.55;1;0.55" dur={`${2.2 + (i % 5) * 0.28}s`} repeatCount="indefinite" begin={`${(i * 0.13) % 2}s`}/>
                </circle>
                {/* Drill hole */}
                <circle cx={cx} cy={cy} r={2.8} fill="#03060a" />
                {/* Centre pad */}
                <circle cx={cx} cy={cy} r={1.4} fill={vc2}>
                  <animate attributeName="opacity" values="0.6;1;0.6" dur={`${1.8 + (i % 4) * 0.2}s`} repeatCount="indefinite" begin={`${(i * 0.09) % 1.5}s`}/>
                </circle>
              </g>
            ))}

            {/* ── SMD COMPONENTS (silkscreen style) ── */}
            {/* Resistors */}
            {([[8,168],[88,96],[218,48],[298,168]] as [number,number][]).map(([bx,by],i) => (
              <g key={`r${i}`}>
                <rect x={bx-2} y={by-3} width={22} height={11} rx="1"
                  stroke={sc} strokeWidth="0.5" fill="none" strokeDasharray="2 2"/>
                <rect x={bx}    y={by} width={7} height={5} rx="0.5" fill={tc}/>
                <rect x={bx+11} y={by} width={7} height={5} rx="0.5" fill={tc}/>
                <rect x={bx+6}  y={by-0.5} width={6} height={6} rx="0.5" fill="rgba(5,10,18,0.95)" stroke={tc2} strokeWidth="0.4"/>
              </g>
            ))}

            {/* Capacitors */}
            {([[264,53],[104,212]] as [number,number][]).map(([bx,by],i) => (
              <g key={`c${i}`}>
                <circle cx={bx}    cy={by} r={5} fill={tc} opacity="0.6"/>
                <circle cx={bx}    cy={by} r={2.5} fill="#03060a"/>
                <circle cx={bx+13} cy={by} r={5} fill={tc} opacity="0.6"/>
                <circle cx={bx+13} cy={by} r={2.5} fill="#03060a"/>
              </g>
            ))}

            {/* SOIC outline */}
            <rect x="141" y="110" width="58" height="36" rx="2"
              stroke={sc} strokeWidth="0.7" fill="rgba(5,10,18,0.7)" strokeDasharray="3 2"/>
            <circle cx="147" cy="116" r="2" fill={sc}/>
            {[0,1,2,3].map(p => (
              <rect key={`jl${p}`} x="132" y={114+p*7} width="9" height="4.5" rx="0.8" fill={tc} opacity="0.5"/>
            ))}
            {[0,1,2,3].map(p => (
              <rect key={`jr${p}`} x="199" y={114+p*7} width="9" height="4.5" rx="0.8" fill={tc} opacity="0.5"/>
            ))}

            {/* Silkscreen text */}
            <text x="4"   y="109" fontSize="4.5" fontFamily="monospace" fill={sc} letterSpacing="0.5">REV 3.0</text>
            <text x="246" y="109" fontSize="4"   fontFamily="monospace" fill={sc} letterSpacing="0.5">J1</text>
            <text x="84"  y="89"  fontSize="4"   fontFamily="monospace" fill={sc} letterSpacing="0.5">R4</text>

          </pattern>
        </defs>

        {/* Board base — deep navy dark */}
        <rect width="100%" height="100%" fill="#03060d"/>
        {/* PCB pattern */}
        <rect width="100%" height="100%" fill="url(#pcb)"/>
      </svg>
    </div>
  );
}
