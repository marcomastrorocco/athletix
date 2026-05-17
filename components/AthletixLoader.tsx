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

        .ax-loading-bar {
          position: relative;
          width: 260px;
          height: 2px;
          margin-top: 56px;
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
          .ax-loading-bar { width: 200px; margin-top: 44px; }
          .ax-loading-status { font-size: 10px; letter-spacing: 4px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ax-loading-grid,
          .ax-loading-glow,
          .ax-loading-logo-wrap,
          .ax-ring,
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
