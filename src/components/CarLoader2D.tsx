// A flat SVG car driven across the screen with pure CSS transforms —
// the same technique behind classic "car loader" CodePens, chosen instead
// of a hand-built 3D scene because transform/opacity-only CSS animation is
// guaranteed cheap on any device, no WebGL required.
//
// Open-top roadster silhouette: no boxy cabin/glass — a low windscreen,
// a driver headrest hump, and a visible cockpit interior instead, which
// reads as far less "toy" than a flat-sided box cabin. Proportions still
// follow real coupe design rules: wheelbase ≈ 4.5x wheel diameter, front
// overhang ≈ 1x wheel diameter, one continuous arc from the tonneau deck
// through the headrest into the windscreen.
//
// Orientation: rear (small x) on the left, nose (large x) on the right,
// since the car drives left-to-right.
export function CarLoader2D() {
  return (
    <>
      {/* Road — static strip under the wheels; only the lane dashes scroll,
          which reads as the ground passing beneath a moving car */}
      <div className="road-strip" />

      <div className="car-loader-track">
        {/* Studio spotlight rig — mounting arm + barrel housing + lens,
            fixed at a visible height above the car. Follows the car for
            free since it's inside the same translating container. */}
        <div className="car-lamp-arm" />
        <div className="car-lamp-housing" />
        <div className="car-lamp-lens" />

        <div className="car-loader-bob">
          {/* Soft cinematic backlight glow — static, not animated, so it's a
              one-time render cost rather than a per-frame blur recompute */}
          <div className="car-glow" />

          {/* Exhaust puffs — CSS-only, staggered infinite loops fake continuous emission */}
          <div className="car-exhaust">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <span key={i} className="car-puff" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>

          <svg width="180" height="75" viewBox="0 0 240 100" style={{ display: 'block', position: 'relative' }}>
            <defs>
              <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffb08a" />
                <stop offset="30%" stopColor="#f1552f" />
                <stop offset="70%" stopColor="#c8341a" />
                <stop offset="100%" stopColor="#8f210f" />
              </linearGradient>
              <linearGradient id="carInterior" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a1f1a" />
                <stop offset="100%" stopColor="#0c0906" />
              </linearGradient>
              <radialGradient id="hoodShine" cx="50%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="carRim" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f2f4f7" />
                <stop offset="55%" stopColor="#9aa1ab" />
                <stop offset="100%" stopColor="#5c6169" />
              </linearGradient>
              <radialGradient id="carTire" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#23262c" />
                <stop offset="70%" stopColor="#0d0e11" />
                <stop offset="100%" stopColor="#000" />
              </radialGradient>
            </defs>

            {/* Ground shadow — static, no animation */}
            <ellipse cx="120" cy="90" rx="102" ry="6" fill="#000" opacity="0.3" />

            {/* Body — one smooth continuous line: rear deck rises gently into
                a low fender, dips shallowly for the cockpit, rises into the
                windscreen base, then the long hood — no separate floating
                parts sitting on top of the silhouette */}
            <path
              d="M17,64
                 C17,52 22,44 30,42
                 C42,38 50,35 60,32
                 C72,27 82,24 94,24
                 C104,25 108,27 112,28
                 C120,26 126,21 132,18
                 C138,15 144,15 149,19
                 C154,24 156,29 160,33
                 C168,37 174,39 182,43
                 L206,45
                 C216,46 224,51 226,59
                 L226,68 L214,68
                 Q194,38 174,68
                 L58,68
                 Q41,38 24,68
                 L17,64 Z"
              fill="url(#carBody)"
            />

            {/* Hood glossy highlight */}
            <ellipse cx="185" cy="39" rx="34" ry="8" fill="url(#hoodShine)" />

            {/* Beltline specular highlight, following the same arc */}
            <path d="M32,42 C44,38 52,35 62,32 C74,27 84,24 96,24" fill="none" stroke="#ffd7b8" strokeWidth="1.1" opacity="0.55" strokeLinecap="round" />

            {/* Rocker / side-skirt two-tone */}
            <rect x="60" y="63" width="112" height="6" fill="#14161c" opacity="0.85" />

            {/* Panel shut lines — break the silhouette into hood / door / deck
                so it reads as assembled bodywork, not one molded piece */}
            <path d="M66,30 L62,64" fill="none" stroke="#7a2a12" strokeWidth="0.6" opacity="0.45" />
            <path d="M164,32 L172,64" fill="none" stroke="#7a2a12" strokeWidth="0.6" opacity="0.45" />

            {/* Cockpit interior — fills the open-top notch in the silhouette,
                including a subtle headrest as part of the same fill */}
            <path d="M95,25 C103,26 108,27 113,28 C120,26 126,22 132,19 L134,23 C128,27 121,30 113,31 C106,30 100,28 94,27 Z" fill="url(#carInterior)" />
            <path d="M100,26 C104,23 110,22 115,24 L114,28 C110,26.5 105,27 101,29 Z" fill="#1c1714" opacity="0.9" />
            {/* Low windscreen */}
            <path d="M131,19 C137,13 145,12 151,17 L149,22 C144,17.5 138,18.5 133,23 Z" fill="#173047" opacity="0.75" />

            {/* Side mirror */}
            <path d="M160,32 L168,29 L170,33 L162,36 Z" fill="#c8341a" />

            {/* Front bumper / splitter */}
            <rect x="204" y="64" width="22" height="5" rx="1.5" fill="#14161c" />
            {/* Slim LED headlight — angular strip, not a round "eye" */}
            <path d="M203,51 L219,49.5 C222,49.3 223.5,51 223,53.5 L221.5,58.5 C221,60.5 219,61 217,60.5 L204,57.5 Z" fill="#eaf6ff" />
            <path d="M205,52.5 L217,51.3" stroke="#0d2a3f" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M205,55 L215,54" stroke="#0d2a3f" strokeWidth="1.1" strokeLinecap="round" />

            {/* Rear bumper / diffuser */}
            <rect x="14" y="62" width="18" height="5" rx="1.5" fill="#14161c" />
            {[17, 21.5, 26].map((x) => (
              <rect key={x} x={x} y="63" width="1.4" height="6" fill="#050708" />
            ))}
            {/* Slim taillight strip */}
            <path d="M15,47 L29,46 C31,46 32,47.5 31.5,49.5 L30.5,53 C30,54.5 28.5,55 27,54.7 L16,52.5 Z" fill="#ff2d2d" />
            <path d="M18,48.5 L28,47.7" stroke="#5a0e0e" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

            {/* Wheels — 4.5x-wheelbase / 1x-front-overhang stance, low-profile
                tire, angled multi-spoke alloy rim instead of straight rods */}
            {[194, 41].map((cx) => (
              <g key={cx} transform={`translate(${cx},77)`}>
                <circle r="19.5" fill="url(#carTire)" />
                <circle r="19.5" fill="none" stroke="#000" strokeWidth="0.6" opacity="0.5" />
                <circle r="12" fill="url(#carRim)" />
                <g className="car-wheel-spin">
                  {[0, 51.4, 102.8, 154.2, 205.6, 257, 308.4].map((deg) => (
                    <path key={deg} d="M-1.1,-1.8 L-0.45,-11 Q0,-11.8 0.45,-11 L1.1,-1.8 Q0.55,-0.7 0,-0.7 Q-0.55,-0.7 -1.1,-1.8 Z" fill="#4b4f57" transform={`rotate(${deg}) skewX(6)`} />
                  ))}
                  <circle r="3" fill="#2a2d33" />
                </g>
                <circle r="4.6" fill="#ff5a3d" opacity="0.9" />
                <circle r="12" fill="none" stroke="#e8ebef" strokeWidth="0.5" opacity="0.5" />
                <circle r="19" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.12" strokeDasharray="16 56" />
              </g>
            ))}
          </svg>
        </div>

        {/* Light beam — painted after the car so it composites on top and
            actually brightens the car's surface, not just the road behind it */}
        <div className="car-lamp-cone" />
      </div>
    </>
  )
}
