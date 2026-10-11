import { useRef } from 'react'
import './WindowFrame.css'
export default function WindowFrame({windowData,active,onClose,onMinimize,onMaximize,onFocus,onMove,children}){
 const drag=useRef(null)
 const {id,title,icon,x,y,width,height,maximized,minimized,zIndex}=windowData
 const pointerDown=(event)=>{
  if(event.button!==0||maximized||event.target.closest('.window-controls'))return
  event.currentTarget.setPointerCapture(event.pointerId)
  drag.current={px:event.clientX,py:event.clientY,x,y};onFocus()
 }
 const pointerMove=(event)=>{
  if(!drag.current)return
  const dx=event.clientX-drag.current.px,dy=event.clientY-drag.current.py
  onMove({x:Math.max(-width+150,Math.min(window.innerWidth-150,drag.current.x+dx)),y:Math.max(0,Math.min(window.innerHeight-100,drag.current.y+dy))})
 }
 if(minimized)return null
 return <article className={`aero-window ${active?'is-active':''} ${maximized?'is-maximized':''}`} style={{'--window-x':`${x}px`,'--window-y':`${y}px`,'--window-width':`${width}px`,'--window-height':`${height}px`,zIndex}} onPointerDown={onFocus} aria-label={title} data-window-id={id}>
  <header className="window-titlebar" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}} onDoubleClick={(event)=>{if(!event.target.closest('.window-controls'))onMaximize()}}>
   <div className="window-title"><span className="window-title-icon" aria-hidden="true">{icon}</span><span>{title}</span></div>
   <div className="window-controls" aria-label="Controles da janela">
    <button type="button" className="window-control minimize" onClick={onMinimize} aria-label="Minimizar">−</button>
    <button type="button" className="window-control maximize" onClick={onMaximize} aria-label={maximized?'Restaurar':'Maximizar'}>{maximized?'❐':'□'}</button>
    <button type="button" className="window-control close" onClick={onClose} aria-label="Fechar">×</button>
   </div>
  </header>
  <div className="window-content">{children}</div>{!maximized&&<span className="window-resize-hint" aria-hidden="true"/>}
 </article>
}
