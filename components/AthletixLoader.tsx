type Props = {
  className?: string;
};

export default function AthletixLoader({ className = "" }: Props) {
  return (
    <div
      className={`ax-loading ${className}`.trim()}
      role="status"
      aria-label="Loading Athletix"
    >
      <div className="ax-loading-grid" aria-hidden />
      <div className="ax-loading-glow" aria-hidden />

      <div className="ax-loading-stage">
        <span className="ax-ring ax-ring-3" aria-hidden />
        <span className="ax-ring ax-ring-2" aria-hidden />
        <span className="ax-ring ax-ring-1" aria-hidden />

        <div className="ax-loading-logo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/image/athlethix-logo.png"
            alt="Athletix"
            className="ax-loading-logo"
          />
        </div>
      </div>

      <div className="ax-gym" aria-hidden>
        <span className="ax-gym-floor" />
        <span className="ax-athlete-wrap">
          <svg
            className="ax-athlete"
            viewBox="0 0 80 110"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Back leg (rendered first, behind body, faded for depth) */}
            <rect x="37" y="50" width="6" height="42" rx="3" opacity="0.55" />

            {/* Back arm with dumbbell, alternating phase */}
            <g transform="translate(40 24)" opacity="0.55">
              <rect x="-2.5" y="0" width="5" height="20" rx="2.5" />
              <g transform="translate(0 20)">
                <g className="ax-curl ax-curl-back">
                  <rect x="-2.5" y="0" width="5" height="22" rx="2.5" />
                  <g transform="translate(0 22)">
                    <rect x="-6" y="-1.5" width="12" height="3" rx="1" />
                    <circle cx="-8.5" cy="0" r="5" />
                    <circle cx="8.5" cy="0" r="5" />
                  </g>
                </g>
              </g>
            </g>

            {/* Head (profile) with subtle nose bump indicating side view */}
            <circle cx="40" cy="14" r="6.5" />
            <path d="M46.2 13 L48.5 14.5 L46.2 16 Z" />

            {/* Torso — side profile (narrower than front view) */}
            <path d="M36 21 Q33.5 32 35 42 L36 50 L44 50 L45 42 Q46.5 32 44 21 Z" />

            {/* Front leg, full opacity */}
            <rect x="39" y="50" width="6" height="42" rx="3" />

            {/* Front arm with dumbbell — main visible arm */}
            <g transform="translate(40 24)">
              <rect x="-2.5" y="0" width="5" height="20" rx="2.5" />
              <g transform="translate(0 20)">
                <g className="ax-curl ax-curl-front">
                  <rect x="-2.5" y="0" width="5" height="22" rx="2.5" />
                  <g transform="translate(0 22)">
                    <rect x="-6" y="-1.5" width="12" height="3" rx="1" />
                    <circle cx="-8.5" cy="0" r="5" />
                    <circle cx="8.5" cy="0" r="5" />
                    <circle cx="-8.5" cy="0" r="2.5" fill="#07090b" />
                    <circle cx="8.5" cy="0" r="2.5" fill="#07090b" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>
      </div>

      <div className="ax-loading-bar" aria-hidden>
        <span />
      </div>
      <div className="ax-loading-status">
        <em /> Performance Loading
      </div>

      <style>{`
        .ax-loading {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #07090b;
          color: #eef2f6;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: 'Barlow Condensed', 'Anton', Impact, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .ax-loading-grid {
          position: absolute;
          inset: -10%;
          background-image:
            linear-gradient(rgba(0, 212, 240, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 240, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          -webkit-mask-image: radial-gradient(ellipse at center, #000 0%, transparent 70%);
                  mask-image: radial-gradient(ellipse at center, #000 0%, transparent 70%);
          animation: axGridDrift 22s linear infinite;
          pointer-events: none;
        }
        @keyframes axGridDrift {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .ax-loading-glow {
          position: absolute;
          width: 680px;
          height: 680px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 212, 240, 0.28) 0%, rgba(0, 212, 240, 0.05) 40%, transparent 70%);
          filter: blur(8px);
          animation: axPulse 2.6s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes axPulse {
          0%, 100% { transform: scale(0.92); opacity: 0.55; }
          50%      { transform: scale(1.08); opacity: 1; }
        }

        .ax-loading-stage {
          position: relative;
          width: 260px;
          height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ax-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 1px solid rgba(0, 212, 240, 0.16);
          border-top-color: rgba(0, 212, 240, 0.95);
          transform: translate(-50%, -50%) rotate(0deg);
        }
        .ax-ring-1 {
          width: 170px; height: 170px;
          animation: axSpin 1.6s linear infinite;
          box-shadow: 0 0 24px rgba(0, 212, 240, 0.18) inset;
        }
        .ax-ring-2 {
          width: 215px; height: 215px;
          border-top-color: rgba(0, 212, 240, 0.55);
          opacity: 0.85;
          animation: axSpin 2.6s linear infinite reverse;
        }
        .ax-ring-3 {
          width: 260px; height: 260px;
          border-top-color: rgba(0, 212, 240, 0.35);
          opacity: 0.6;
          animation: axSpin 3.6s linear infinite;
        }
        @keyframes axSpin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .ax-loading-logo-wrap {
          position: relative;
          width: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: axFloat 3s ease-in-out infinite;
        }
        @keyframes axFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        .ax-loading-logo {
          width: 100%;
          height: auto;
          display: block;
          filter: drop-shadow(0 0 28px rgba(0, 212, 240, 0.55));
        }

        /* GYM — standing athlete doing bicep curls */
        .ax-gym {
          position: relative;
          width: 260px;
          height: 135px;
          margin-top: 24px;
        }
        .ax-gym-floor {
          position: absolute;
          bottom: 4px;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0, 212, 240, 0.55) 18%,
            rgba(0, 212, 240, 0.55) 82%,
            transparent 100%);
          box-shadow: 0 0 12px rgba(0, 212, 240, 0.45);
        }
        .ax-athlete-wrap {
          position: absolute;
          bottom: 5px;
          left: 50%;
          margin-left: -45px;
          width: 90px;
          height: 124px;
          z-index: 2;
        }
        .ax-athlete {
          width: 100%;
          height: 100%;
          color: #00d4f0;
          filter: drop-shadow(0 0 12px rgba(0, 212, 240, 0.6));
          display: block;
          animation: axCurlBob 2s ease-in-out infinite;
        }
        /* Body squeeze when arms peak */
        @keyframes axCurlBob {
          0%, 100% { transform: translateY(0); }
          40%, 60% { transform: translateY(-2px); }
        }

        /* Forearm curl (side view): both forearms rotate the same direction
           around the elbow. Alternating arms — back arm offset by half cycle
           so when one is up, the other is down. */
        .ax-curl {
          transform-origin: 0 0;
          animation: axCurlSide 2s ease-in-out infinite;
        }
        @keyframes axCurlSide {
          0%, 10%   { transform: rotate(0deg); }       /* rest at bottom */
          45%, 55%  { transform: rotate(-158deg); }    /* squeeze at top */
          90%, 100% { transform: rotate(0deg); }       /* back to rest */
        }
        .ax-curl-back { animation-delay: -1s; }

        .ax-loading-bar {
          position: relative;
          width: 260px;
          height: 2px;
          margin-top: 20px;
          background: rgba(255, 255, 255, 0.07);
          border-radius: 2px;
          overflow: hidden;
        }
        .ax-loading-bar span {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, #00d4f0 50%, transparent 100%);
          transform: translateX(-100%);
          animation: axBar 1.6s cubic-bezier(.4, 0, .2, 1) infinite;
        }
        @keyframes axBar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .ax-loading-status {
          margin-top: 18px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(143, 160, 176, 0.85);
        }
        .ax-loading-status em {
          width: 6px;
          height: 6px;
          background: #00d4f0;
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(0, 212, 240, 0.85);
          animation: axBlink 1.2s ease-in-out infinite;
        }
        @keyframes axBlink {
          0%, 100% { opacity: 0.3; transform: scale(0.85); }
          50%      { opacity: 1;   transform: scale(1.15); }
        }

        @media (max-width: 720px) {
          .ax-loading-glow { width: 420px; height: 420px; }
          .ax-loading-stage { width: 210px; height: 210px; }
          .ax-ring-1 { width: 140px; height: 140px; }
          .ax-ring-2 { width: 175px; height: 175px; }
          .ax-ring-3 { width: 210px; height: 210px; }
          .ax-loading-logo-wrap { width: 105px; }
          .ax-gym { width: 220px; height: 118px; margin-top: 20px; }
          .ax-athlete-wrap { width: 78px; margin-left: -39px; height: 108px; }
          .ax-loading-bar { width: 200px; margin-top: 16px; }
          .ax-loading-status { font-size: 10px; letter-spacing: 4px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ax-loading-grid,
          .ax-loading-glow,
          .ax-loading-logo-wrap,
          .ax-ring,
          .ax-athlete,
          .ax-curl,
          .ax-loading-bar span,
          .ax-loading-status em {
            animation: none;
          }
        }

        .ax-loading.is-fading {
          opacity: 0;
          transition: opacity 700ms ease-out;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
