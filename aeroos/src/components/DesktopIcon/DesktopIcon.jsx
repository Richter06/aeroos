import { useState } from 'react'
import './DesktopIcon.css'
export default function DesktopIcon({icon,label,onOpen}){
 const [selected,setSelected]=useState(false)
 return <button type="button" className={`desktop-icon ${selected?'is-selected':''}`} onClick={()=>setSelected(true)} onDoubleClick={onOpen} onKeyDown={(event)=>{if(event.key==='Enter')onOpen()}} onBlur={()=>setSelected(false)} aria-label={`Abrir ${label}`} title={`Clique duas vezes para abrir ${label}`}>
  <span className="desktop-icon-art" aria-hidden="true">{icon}</span><span className="desktop-icon-label">{label}</span>
 </button>
}
