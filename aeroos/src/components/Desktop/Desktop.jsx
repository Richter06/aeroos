import './Desktop.css'

const BUBBLES = [
  ['bubble-one', '0s'],
  ['bubble-two', '-4s'],
  ['bubble-three', '-8s'],
  ['bubble-four', '-2s'],
  ['bubble-five', '-11s'],
  ['bubble-six', '-6s'],
]

export default function Desktop({ wallpaper, onContextMenu, children }) {
  return (
    <section
      className="aero-desktop"
      style={{ '--desktop-wallpaper': `url("${wallpaper}")` }}
      onContextMenu={onContextMenu}
      aria-label="Área de trabalho do AeroOS"
    >
      <div className="wallpaper-wash" aria-hidden="true" />
      <div className="nature-haze" aria-hidden="true" />
      <div className="sun-glow" aria-hidden="true" />
      <div className="water-caustics" aria-hidden="true" />
      <div className="light-ribbon ribbon-one" aria-hidden="true" />
      <div className="light-ribbon ribbon-two" aria-hidden="true" />
      <div className="glass-sweep" aria-hidden="true" />

      <div className="ambient-bubbles" aria-hidden="true">
        {BUBBLES.map(([name, delay]) => (
          <span
            key={name}
            className={`bubble ${name}`}
            style={{ animationDelay: delay }}
          />
        ))}
      </div>

      <div className="desktop-topline">
        <span className="aero-brand">
          <span className="brand-orb">a</span>
          aeroOS
        </span>
        <span className="desktop-tagline">
          technology in harmony with nature
        </span>
      </div>

      {children}

      <div className="desktop-corner-note">
        AeroOS <span>·</span> build 01
      </div>
    </section>
  )
}
