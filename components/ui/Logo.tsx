import React from "react";

interface LogoProps {
  light?: boolean;
  height?: number | string;
  className?: string;
}

// Helper component to render the B shape layers for the 3D effect
const BLogoIcon = ({ fill, stroke }: { fill: string; stroke: string }) => {
  // Left Column Bar (slanted, cut at the top-right and bottom-right to float)
  const logoPathLeft = "M20 20 L50 28 L36 112 L3 120 Z";
  
  // Right Loops of the B (slanted, with sharp top-left and bottom-left tips pointing outward, parallel to left bar)
  const logoPathRight = `
    M 55 28 L 85 20 L 86 20 Q 106 20 102 45 Q 98 70 82 70 L 42 70 L 68 58 Q 82 58 84 45 Q 86 32 74 32 L 58 32 L 50 31 Z
    M 42 70 L 92 70 Q 112 70 107 95 Q 102 120 74 120 L 41 112 L 44 108 L 68 108 Q 84 108 86 95 Q 88 82 76 82 L 50 82 Z
  `;

  // Integrated circuit lines coming off the bottom loop (overlapping the B)
  const line1 = "M80 102 L88 102 L96 94 L115 94";
  const line2 = "M70 111 L85 111 L93 103 L115 103";
  const line3 = "M65 120 L115 120";

  return (
    <g fillRule="evenodd">
      {/* Left Column Bar */}
      <path d={logoPathLeft} fill={fill} />
      {/* Loops */}
      <path d={logoPathRight} fill={fill} />
      {/* Integrated circuit lines */}
      <path d={line1} fill="none" stroke={stroke} strokeWidth="4.5" strokeLinecap="round" />
      <path d={line2} fill="none" stroke={stroke} strokeWidth="4.5" strokeLinecap="round" />
      <path d={line3} fill="none" stroke={stroke} strokeWidth="4.5" strokeLinecap="round" />
      {/* Integrated circle nodes */}
      <circle cx="115" cy="94" r="5" fill={fill} />
      <circle cx="115" cy="103" r="5" fill={fill} />
      <circle cx="115" cy="120" r="5" fill={fill} />
    </g>
  );
};

export default function Logo({ light = false, height = 40, className = "" }: LogoProps) {
  // B'Store text color is white on dark background (light = true), navy on light background (light = false)
  const textColor = light ? "#FFFFFF" : "#0B2545";
  const venturesColor = "#00C4FF";

  const line1 = "M80 102 L88 102 L96 94 L115 94";
  const line2 = "M70 111 L85 111 L93 103 L115 103";
  const line3 = "M65 120 L115 120";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 140"
      height={height}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", overflow: "visible", width: "auto" }}
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
      <g transform="translate(6, 6)">
        <BLogoIcon fill="rgba(7, 26, 56, 0.4)" stroke="rgba(7, 26, 56, 0.4)" />
      </g>
      {/* Side wall extrusions (layering to create a solid 3D bevel block) */}
      <g transform="translate(4, 4)">
        <BLogoIcon fill="#031A36" stroke="#031A36" />
      </g>
      <g transform="translate(3, 3)">
        <BLogoIcon fill="#005A7F" stroke="#005A7F" />
      </g>
      <g transform="translate(2, 2)">
        <BLogoIcon fill="#0080B3" stroke="#0080B3" />
      </g>
      <g transform="translate(1, 1)">
        <BLogoIcon fill="#00B3DA" stroke="#00B3DA" />
      </g>

      {/* Front Face of the 3D B' */}
      <BLogoIcon fill="url(#logoBGrad)" stroke="url(#logoBGrad)" />

      {/* --- ANIMATED CODES/ENERGY BALLS ON B CIRCUITS --- */}
      {/* We overlay white glowing paths on top of the front face's lines */}
      <g fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" filter="url(#circuitGlow)">
        <path d={line1} className="pulse-path-fast" />
        <path d={line2} className="pulse-path-1" />
        <path d={line3} className="pulse-path-2" />
      </g>

      {/* --- OTHER DYNAMIC CIRCUITS AROUND THE LOGO --- */}
      {/* Trace 1: Bottom connector (Traditional style) */}
      <path d="M 120 108 L 120 125 L 138 125" stroke="#00C4FF" strokeWidth="2" opacity="0.25" fill="none" />
      <path d="M 120 108 L 120 125 L 138 125" stroke="#00C4FF" strokeWidth="2" fill="none" className="pulse-path-2" strokeLinecap="round" />

      {/* Trace 2: Top-right branch */}
      <path d="M 90 25 L 132 25 L 142 35" stroke="#00C4FF" strokeWidth="2.5" opacity="0.25" fill="none" />
      <path d="M 90 25 L 132 25 L 142 35" stroke="#FFFFFF" strokeWidth="2.5" fill="none" className="pulse-path-fast" filter="url(#circuitGlow)" strokeLinecap="round" />

      {/* Trace 3: Middle branch */}
      <path d="M 82 72 L 122 72 L 130 80" stroke="#00C4FF" strokeWidth="2" opacity="0.25" fill="none" />
      <path d="M 82 72 L 122 72 L 130 80" stroke="#00C4FF" strokeWidth="2" fill="none" className="pulse-path-1" strokeLinecap="round" />

      {/* Trace 4: Left side back-branch */}
      <path d="M 20 45 L 8 45 L 8 75 L 18 75" stroke="#00C4FF" strokeWidth="1.5" opacity="0.2" fill="none" />
      <path d="M 20 45 L 8 45 L 8 75 L 18 75" stroke="#00C4FF" strokeWidth="1.5" fill="none" className="pulse-path-2" strokeLinecap="round" />

      {/* Circle Nodes (Dots) with blinking and breathing animations */}
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
