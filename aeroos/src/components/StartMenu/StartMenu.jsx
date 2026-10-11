import { useMemo, useState } from 'react'
import './StartMenu.css'
export default function StartMenu({apps,onLaunch,onClose,onPower}){
 const [query,setQuery]=useState('')
 const filtered=useMemo(()=>apps.filter((app)=>app.title.toLowerCase().includes(query.toLowerCase())),[apps,query])
 return <>
  <button type="button" className="start-menu-scrim" aria-label="Fechar menu Iniciar" onClick={onClose}/>
  <section className="aero-start-menu" aria-label="Menu Iniciar">
   <header className="start-menu-profile"><div className="profile-avatar">A</div><div><strong>Usuário Aero</strong><span>Bem-vindo de volta</span></div><span className="profile-glow"/></header>
   <div className="start-menu-main"><div className="start-menu-apps"><div className="start-menu-heading">Aplicativos</div>
    <label className="start-search"><span>⌕</span><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Pesquisar aplicativos..." autoFocus/></label>
    <div className="start-app-list">{filtered.map((app)=><button type="button" key={app.id} className="start-app-item" onClick={()=>onLaunch(app.id)}><span className="start-app-icon">{app.icon}</span><span><strong>{app.title}</strong><small>{app.description}</small></span></button>)}{!filtered.length&&<p className="start-empty">Nenhum aplicativo encontrado.</p>}</div>
   </div><aside className="start-menu-side"><div className="start-side-art"><span>✦</span><strong>Um mundo<br/>mais leve.</strong><small>Explore o AeroOS</small></div>
    <button type="button" className="start-side-link" onClick={()=>onLaunch('computer')}>🖥️ <span>Computador</span></button><button type="button" className="start-side-link" onClick={()=>onLaunch('gallery')}>🌿 <span>Galeria natural</span></button>
    <div className="start-side-bottom"><span>◉ Sessão ativa</span><button type="button" onClick={onPower} aria-label="Opções de energia" title="Opções de energia">⏻</button></div>
   </aside></div>
  </section>
 </>
}
