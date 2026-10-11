import { useCallback, useRef, useState } from 'react'
import './App.css'
import Desktop from './components/Desktop/Desktop.jsx'
import DesktopIcon from './components/DesktopIcon/DesktopIcon.jsx'
import WindowFrame from './components/WindowFrame/WindowFrame.jsx'
import Taskbar from './components/Taskbar/Taskbar.jsx'
import StartMenu from './components/StartMenu/StartMenu.jsx'
import ContextMenu from './components/ContextMenu/ContextMenu.jsx'
import CalculatorApp from './apps/CalculatorApp.jsx'
import NotepadApp from './apps/NotepadApp.jsx'
import BrowserApp from './apps/BrowserApp.jsx'
import GalleryApp from './apps/GalleryApp.jsx'
import SystemApp from './apps/SystemApp.jsx'

const APPS = [
  { id:'computer', title:'Computador', icon:'🖥️', description:'Explore o AeroOS', Component:SystemApp, width:620, height:430 },
  { id:'browser', title:'Aero Explorer', icon:'🌐', description:'Navegue pela web', Component:BrowserApp, width:760, height:520 },
  { id:'gallery', title:'Galeria de imagens', icon:'🖼️', description:'Paisagens e memórias', Component:GalleryApp, width:720, height:500 },
  { id:'notepad', title:'Bloco de notas', icon:'📝', description:'Escreva uma ideia', Component:NotepadApp, width:560, height:440 },
  { id:'calculator', title:'Calculadora', icon:'🧮', description:'Faça uma conta', Component:CalculatorApp, width:330, height:480 },
]
const WALLPAPERS = [
  'https://images3.alphacoders.com/865/thumb-1920-86595.jpg',
  'https://cdn.sweezy-wallpapers.com/wallpapers/37c1c1a3-3386-48f0-b013-72e218413d49/frutiger-aero-aesthetic-bubbles-sky-desktop-wallpaper-variant_2k.jpg',
  'https://cdn.wallpapersafari.com/60/69/IlWuz7.png',
]

export default function App() {
  const [windows, setWindows] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [startOpen, setStartOpen] = useState(false)
  const [context, setContext] = useState(null)
  const [wallpaper, setWallpaper] = useState(0)
  const [toast, setToast] = useState('')
  const nextId = useRef(1)
  const nextZ = useRef(10)

  const notify = useCallback((message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }, [])

  const openApp = useCallback((appId) => {
    const app = APPS.find((item) => item.id === appId)
    if (!app) return
    setStartOpen(false)
    setContext(null)
    setWindows((current) => {
      const existing = current.find((item) => item.appId === appId)
      nextZ.current += 1
      if (existing) {
        setActiveId(existing.id)
        return current.map((item) => item.id === existing.id ? { ...item, minimized:false, zIndex:nextZ.current } : item)
      }
      const id = nextId.current++
      setActiveId(id)
      const offset = (current.length % 5) * 28
      return [...current, { id, appId, title:app.title, icon:app.icon, Component:app.Component,
        x:105 + offset, y:45 + offset, width:app.width, height:app.height,
        minimized:false, maximized:false, zIndex:nextZ.current }]
    })
  }, [])

  const closeWindow = (id) => {
    setWindows((current) => current.filter((item) => item.id !== id))
    setActiveId((current) => current === id ? null : current)
  }
  const minimizeWindow = (id) => {
    setWindows((current) => current.map((item) => item.id === id ? { ...item, minimized:true } : item))
    setActiveId((current) => current === id ? null : current)
  }
  const maximizeWindow = (id) => setWindows((current) => current.map((item) => item.id === id ? { ...item, maximized:!item.maximized } : item))
  const focusWindow = (id) => {
    nextZ.current += 1
    setActiveId(id)
    setWindows((current) => current.map((item) => item.id === id ? { ...item, minimized:false, zIndex:nextZ.current } : item))
  }
  const moveWindow = (id, position) => setWindows((current) => current.map((item) => item.id === id && !item.maximized ? { ...item, ...position } : item))
  const handleContext = (event) => {
    event.preventDefault()
    setStartOpen(false)
    setContext({ x:event.clientX, y:event.clientY })
  }
  const contextAction = (action) => {
    setContext(null)
    if (action === 'wallpaper') { setWallpaper((value) => (value + 1) % WALLPAPERS.length); notify('Papel de parede alterado') }
    if (action === 'refresh') notify('Desktop atualizado')
    if (action === 'computer') openApp('computer')
  }

  return <main className="aeroos-shell">
    <Desktop wallpaper={WALLPAPERS[wallpaper]} onContextMenu={handleContext}>
      <div className="desktop-icons">
        {APPS.map((app) => <DesktopIcon key={app.id} icon={app.icon} label={app.title} onOpen={() => openApp(app.id)} />)}
        <DesktopIcon icon="🗑️" label="Lixeira" onOpen={() => notify('A lixeira está vazia')} />
      </div>
    </Desktop>
    <section className="window-layer" aria-label="Aplicativos abertos">
      {windows.map((item) => {
        const WindowApp = item.Component
        return <WindowFrame key={item.id} windowData={item} active={activeId === item.id}
          onClose={() => closeWindow(item.id)} onMinimize={() => minimizeWindow(item.id)}
          onMaximize={() => maximizeWindow(item.id)} onFocus={() => focusWindow(item.id)}
          onMove={(position) => moveWindow(item.id, position)}>
          <WindowApp onOpenApp={openApp} />
        </WindowFrame>
      })}
    </section>
    {startOpen && <StartMenu apps={APPS} onLaunch={openApp} onClose={() => setStartOpen(false)} onPower={() => notify('O AeroOS continua funcionando no navegador 🙂')} />}
    {context && <ContextMenu x={context.x} y={context.y} onAction={contextAction} onClose={() => setContext(null)} />}
    {toast && <div className="aero-notification" role="status">{toast}</div>}
    <Taskbar apps={APPS} windows={windows} activeWindowId={activeId} startOpen={startOpen}
      onStartClick={() => { setStartOpen((value) => !value); setContext(null) }} onLaunch={openApp} onActivate={focusWindow} />
  </main>
}
