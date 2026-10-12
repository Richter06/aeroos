import { useEffect, useRef, useState } from 'react'
import './Desktop.css'

const INITIAL_BUBBLE_COUNT = 10

function createBubble(id, initial = false) {
  const roll = Math.random()

  let size

  if (roll < 0.2) {
    size = 120 + Math.random() * 100
  } else if (roll < 0.5) {
    size = 65 + Math.random() * 55
  } else if (roll < 0.8) {
    size = 32 + Math.random() * 33
  } else {
    size = 14 + Math.random() * 18
  }

  return {
    id,
    left: `${2 + Math.random() * 94}%`,
    top: `${3 + Math.random() * 90}%`,
    size,
    duration: 9 + Math.random() * 13,
    delay: initial ? `-${Math.random() * 12}s` : '0s',
    driftX: `${-45 + Math.random() * 90}px`,
    driftY: `${-50 - Math.random() * 90}px`,
  }
}

function createInitialBubbles() {
  return Array.from(
    { length: INITIAL_BUBBLE_COUNT },
    (_, index) => createBubble(index + 1, true),
  )
}

export default function Desktop({
  wallpaper,
  onContextMenu,
  children,
}) {
  const nextId = useRef(INITIAL_BUBBLE_COUNT + 1)

  const [bubbles, setBubbles] = useState(createInitialBubbles)
  const [bursts, setBursts] = useState([])

  useEffect(() => {
    if (bursts.length === 0) return undefined

    const timeout = window.setTimeout(() => {
      setBursts((current) =>
        current.filter((burst) => burst.expiresAt > Date.now()),
      )
    }, 500)

    return () => window.clearTimeout(timeout)
  }, [bursts])

  function popBubble(event, bubble) {
    event.stopPropagation()

    const rect = event.currentTarget.getBoundingClientRect()

    const burst = {
      id: bubble.id,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      size: bubble.size,
      expiresAt: Date.now() + 500,
    }

    setBursts((current) => [...current, burst])

    setBubbles((current) =>
      current.map((item) =>
        item.id === bubble.id
          ? createBubble(nextId.current++)
          : item,
      ),
    )
  }

  return (
    <section
      className="aero-desktop"
      style={{
        '--desktop-wallpaper': `url("${wallpaper}")`,
      }}
      onContextMenu={onContextMenu}
      aria-label="Área de trabalho do AeroOS"
    >
      <div className="wallpaper-wash" aria-hidden="true" />
      <div className="nature-haze" aria-hidden="true" />

      {/* Elementos atmosféricos Frutiger Aero */}
      <div
        className="aurora-ribbon aurora-ribbon-one"
        aria-hidden="true"
      />

      <div
        className="aurora-ribbon aurora-ribbon-two"
        aria-hidden="true"
      />

      <div className="floating-organisms" aria-hidden="true">
        <span className="aero-orb orb-large" />
        <span className="aero-orb orb-medium" />
        <span className="aero-orb orb-small" />
        <span className="aero-leaf leaf-one" />
        <span className="aero-leaf leaf-two" />
      </div>

      <div className="sun-glow" aria-hidden="true" />
      <div className="water-caustics" aria-hidden="true" />
      <div className="light-ribbon ribbon-one" aria-hidden="true" />
      <div className="light-ribbon ribbon-two" aria-hidden="true" />
      <div className="glass-sweep" aria-hidden="true" />

      {/* Bolhas flutuantes e interativas */}
      <div className="ambient-bubbles">
        {bubbles.map((bubble) => (
          <button
            key={bubble.id}
            type="button"
            className="bubble"
            aria-label="Estourar bolha"
            title="Estoure a bolha!"
            onClick={(event) => popBubble(event, bubble)}
            style={{
              '--bubble-left': bubble.left,
              '--bubble-top': bubble.top,
              '--bubble-size': `${bubble.size}px`,
              '--bubble-duration': `${bubble.duration}s`,
              '--bubble-delay': bubble.delay,
              '--bubble-drift-x': bubble.driftX,
              '--bubble-drift-y': bubble.driftY,
            }}
          />
        ))}
      </div>

      {/* Animações de estouro */}
      <div className="bubble-burst-layer" aria-hidden="true">
        {bursts.map((burst) => (
          <span
            key={burst.id}
            className="bubble-burst"
            style={{
              left: `${burst.x}px`,
              top: `${burst.y}px`,
              width: `${burst.size}px`,
              height: `${burst.size}px`,
            }}
          />
        ))}
      </div>

      {/* Aplicativos e ícones da área de trabalho */}
      {children}

      <div className="desktop-corner-note">
        AeroOS <span>·</span> build 01
      </div>
    </section>
  )
}