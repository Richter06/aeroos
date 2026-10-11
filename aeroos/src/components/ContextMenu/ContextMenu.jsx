import './ContextMenu.css'
export default function ContextMenu({x,y,onAction,onClose}){
 const left=Math.min(x,window.innerWidth-213),top=Math.min(y,window.innerHeight-212)
 return <><button type="button" className="context-dismiss" aria-label="Fechar menu de contexto" onClick={onClose}/>
  <div className="aero-context-menu" style={{left,top}} role="menu">
   <button type="button" role="menuitem" onClick={()=>onAction('refresh')}><span>⟳</span>Atualizar</button><div className="context-separator"/>
   <button type="button" role="menuitem" onClick={()=>onAction('computer')}><span>🖥️</span>Abrir Computador</button>
   <button type="button" role="menuitem" onClick={()=>onAction('wallpaper')}><span>🖼️</span>Próximo papel de parede</button><div className="context-separator"/>
   <button type="button" role="menuitem" onClick={onClose}><span>↩</span>Voltar ao desktop</button>
  </div>
 </>
}
