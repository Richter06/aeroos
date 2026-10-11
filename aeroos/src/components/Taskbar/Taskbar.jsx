import { useEffect, useState } from 'react'
import './Taskbar.css'
export default function Taskbar({apps,windows,activeWindowId,startOpen,onStartClick,onLaunch,onActivate}){
 const [now,setNow]=useState(new Date())
 useEffect(()=>{const id=window.setInterval(()=>setNow(new Date()),1000);return()=>window.clearInterval(id)},[])
 return <footer className="aero-taskbar">
  <button type="button" className={`start-orb ${startOpen?'is-open':''}`} onClick={onStartClick} aria-label="Abrir menu Iniciar" aria-expanded={startOpen}><span className="start-orb-core">✿</span></button>
  <div className="taskbar-pins">{apps.filter((app)=>['browser','gallery','notepad','calculator'].includes(app.id)).map((app)=><button type="button" key={app.id} className="taskbar-pin" onClick={()=>onLaunch(app.id)} title={app.title} aria-label={app.title}><span>{app.icon}</span></button>)}</div>
  <div className="taskbar-windows">{windows.map((item)=><button type="button" key={item.id} className={`taskbar-window ${activeWindowId===item.id&&!item.minimized?'is-active':''} ${item.minimized?'is-minimized':''}`} onClick={()=>onActivate(item.id)} title={item.title}><span>{item.icon}</span><span className="taskbar-window-title">{item.title}</span></button>)}</div>
  <div className="system-tray"><span className="tray-status" title="Conexão">◉</span><span className="tray-status sound-status" title="Áudio">◖))</span><span className="tray-language">PT</span>
   <div className="taskbar-clock"><span>{now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</span><span>{now.toLocaleDateString('pt-BR')}</span></div><span className="show-desktop" title="Área de trabalho"/>
  </div>
 </footer>
}
