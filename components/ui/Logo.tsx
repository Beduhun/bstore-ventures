import React from "react";

interface LogoProps {
  light?: boolean;
  height?: number | string;
  className?: string;
}

export default function Logo({ light = false, height = 40, className = "" }: LogoProps) {
  // B'Store text color is white on dark background (light = true), navy on light background (light = false)
  const textColor = light ? "#FFFFFF" : "#0B2545";
  const venturesColor = "#00C4FF";
  
  // Outer B shape path: M20 20 L20 120 L70 120 Q100 120 100 95 Q100 78 82 72 Q98 66 98 50 Q98 20 68 20 Z
  // Upper hole (cutout): M38 35 L65 35 Q82 35 82 50 Q82 65 65 65 L38 65 Z (drawn in reverse direction or using evenodd)
  // Lower hole (cutout): M38 72 L68 72 Q84 72 84 95 Q84 108 68 108 L38 108 Z
  // Prime symbol (apostrophe): M106 22 L116 20 L111 38 Q110 44 105 48 L101 44 Q104 41 105 38 Z
  const logoPath = `
    M20 20 L20 120 L70 120 Q100 120 100 95 Q100 78 82 72 Q98 66 98 50 Q98 20 68 20 Z 
    M38 35 L65 35 Q82 35 82 50 Q82 65 65 65 L38 65 Z 
    M38 72 L68 72 Q84 72 84 95 Q84 108 68 108 L38 108 Z 
    M106 22 L116 20 L111 38 Q110 44 105 48 L101 44 Q104 41 105 38 Z
  `;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 140"
      height={height}
      width="auto"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", overflow: "visible" }}
    >
      <defs>
        {/* Front Face Gradient */}
        <linearGradient id="logoBGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C4FF" />
          <stop offset="100%" stopColor={light ? "#0070B8" : "#0B2545"} />
        </linearGradient>

        {/* Glow Filter for animated circuit signals */}
        <filter id="circuitGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComponentTransfer in="blur" result="glow">
            <feFuncA type="linear" slope="2.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>{`
        @keyframes pulseOffset {
          0% {
            stroke-dashoffset: 140;
          }
          100% {
            stroke-dashoffset: -140;
          }
        }
        @keyframes blinkDot {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
            fill: #FFFFFF;
            filter: drop-shadow(0 0 5px #00C4FF);
          }
        }
        .pulse-path-1 {
          stroke-dasharray: 15 50;
          animation: pulseOffset 2.8s linear infinite;
        }
        .pulse-path-2 {
          stroke-dasharray: 10 40;
          animation: pulseOffset 2.2s linear infinite reverse;
        }
        .pulse-path-fast {
          stroke-dasharray: 8 30;
          animation: pulseOffset 1.8s linear infinite;
        }
        .node-dot {
          transform-origin: center;
          animation: blinkDot 2.2s ease-in-out infinite;
        }
        .node-dot-delayed {
          transform-origin: center;
          animation: blinkDot 2.2s ease-in-out infinite;
          animation-delay: 0.8s;
        }
      `}</style>

      {/* --- 3D EXTRUSION LAYERS --- */}
      {/* Drop Shadow Base */}
      <path d={logoPath} fillRule="evenodd" fill="rgba(7, 26, 56, 0.4)" transform="translate(6, 6)" />
      {/* Side wall extrusions (layering to create a solid 3D bevel block) */}
      <path d={logoPath} fillRule="evenodd" fill="#031A36" transform="translate(4, 4)" />
      <path d={logoPath} fillRule="evenodd" fill="#005A7F" transform="translate(3, 3)" />
      <path d={logoPath} fillRule="evenodd" fill="#0080B3" transform="translate(2, 2)" />
      <path d={logoPath} fillRule="evenodd" fill="#00B3DA" transform="translate(1, 1)" />

      {/* Front Face of the 3D B' */}
      <path d={logoPath} fillRule="evenodd" fill="url(#logoBGrad)" />

      {/* --- ANIMATED CIRCUITS --- */}
      {/* Trace 1: Bottom connector (Traditional style) */}
      <path d="M 100 95 L 100 108 L 142 108" stroke="#00C4FF" strokeWidth="2.5" opacity="0.25" fill="none" />
      <path d="M 100 95 L 100 108 L 142 108" stroke="#FFFFFF" strokeWidth="2.5" fill="none" className="pulse-path-1" filter="url(#circuitGlow)" strokeLinecap="round" />

      {/* Trace 2: Bottom branch going down */}
      <path d="M 120 108 L 120 125 L 138 125" stroke="#00C4FF" strokeWidth="2" opacity="0.25" fill="none" />
      <path d="M 120 108 L 120 125 L 138 125" stroke="#00C4FF" strokeWidth="2" fill="none" className="pulse-path-2" strokeLinecap="round" />

      {/* Trace 3: Top-right branch */}
      <path d="M 90 25 L 132 25 L 142 35" stroke="#00C4FF" strokeWidth="2.5" opacity="0.25" fill="none" />
      <path d="M 90 25 L 132 25 L 142 35" stroke="#FFFFFF" strokeWidth="2.5" fill="none" className="pulse-path-fast" filter="url(#circuitGlow)" strokeLinecap="round" />

      {/* Trace 4: Middle branch */}
      <path d="M 82 72 L 122 72 L 130 80" stroke="#00C4FF" strokeWidth="2" opacity="0.25" fill="none" />
      <path d="M 82 72 L 122 72 L 130 80" stroke="#00C4FF" strokeWidth="2" fill="none" className="pulse-path-1" strokeLinecap="round" />

      {/* Trace 5: Left side back-branch */}
      <path d="M 20 45 L 8 45 L 8 75 L 18 75" stroke="#00C4FF" strokeWidth="1.5" opacity="0.2" fill="none" />
      <path d="M 20 45 L 8 45 L 8 75 L 18 75" stroke="#00C4FF" strokeWidth="1.5" fill="none" className="pulse-path-2" strokeLinecap="round" />

      {/* Circuit Nodes (Dots) with blinking and breathing animations */}
      <circle cx="142" cy="108" r="4" fill="#00C4FF" className="node-dot" />
      <circle cx="120" cy="108" r="2.5" fill="#00C4FF" opacity="0.7" />
      <circle cx="138" cy="125" r="4.5" fill="#00C4FF" className="node-dot-delayed" />
      <circle cx="142" cy="35" r="4.5" fill="#00C4FF" className="node-dot" />
      <circle cx="130" cy="80" r="4" fill="#00C4FF" className="node-dot-delayed" />

      {/* --- TEXT CONTENT --- */}
      {/* "B'Store" brand name */}
      <text
        x="155"
        y="82"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="42"
        fontWeight="800"
        fill={textColor}
        letterSpacing="-0.5"
        style={{ transition: "fill 0.3s ease" }}
      >
        B'Store
      </text>

      {/* "VENTURES" brand tagline */}
      <text
        x="158"
        y="110"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="6"
        fill={venturesColor}
      >
        VENTURES
      </text>
    </svg>
  );
}
