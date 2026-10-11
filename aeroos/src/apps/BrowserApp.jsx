import { useState } from 'react'
import './BrowserApp.css'
const LINKS=[{icon:'🌿',title:'Nature',description:'Uma pausa para respirar',color:'mint'},{icon:'🌊',title:'Oceano',description:'Mergulhe em novas ideias',color:'blue'},{icon:'☁️',title:'Céu aberto',description:'Um pouco de inspiração',color:'sky'}]
export default function BrowserApp(){
 const [address,setAddress]=useState('https://aeroos.local/home'),[page,setPage]=useState('home')
 const navigate=(event)=>{event.preventDefault();setPage(address.includes('aeroos.local')?'home':'search')}
 return <div className="browser-app"><div className="browser-toolbar"><button type="button" onClick={()=>setPage('home')} aria-label="Página inicial">⌂</button><button type="button" onClick={()=>setPage('home')} aria-label="Voltar">←</button><button type="button" onClick={()=>setPage('home')} aria-label="Atualizar">⟳</button>
  <form onSubmit={navigate} className="browser-address"><span>🔒</span><input aria-label="Endereço" value={address} onChange={event=>setAddress(event.target.value)}/><button type="submit">Ir</button></form>
 </div>
 {page==='home'?<div className="browser-home"><div className="browser-hero"><div className="browser-hero-orb">a</div><p className="browser-eyebrow">BEM-VINDO AO SEU ESPAÇO</p><h2>O mundo é mais bonito<br/><span>quando conectado.</span></h2><p className="browser-hero-copy">Uma experiência digital inspirada na natureza, na curiosidade e no futuro.</p>
  <form className="browser-search-wrap" onSubmit={navigate}><span>⌕</span><input value={address} onChange={event=>setAddress(event.target.value)} placeholder="Pesquise ou digite um endereço"/></form>
 </div><div className="browser-quicklinks">{LINKS.map(link=><button type="button" key={link.title} className={`browser-link-card ${link.color}`} onClick={()=>{setAddress(`https://aeroos.local/${link.title.toLowerCase()}`);setPage('search')}}><span>{link.icon}</span><strong>{link.title}</strong><small>{link.description}</small></button>)}</div><footer className="browser-footer">Aero Explorer <span>·</span> Um navegador conceitual</footer></div>
 :<div className="browser-search-results"><div className="browser-result-orb">⌕</div><p className="browser-eyebrow">PESQUISA LOCAL</p><h2>Você está explorando o AeroOS</h2><p>Este navegador é uma demonstração local. O endereço digitado foi:</p><code>{address}</code><button type="button" onClick={()=>setPage('home')}>Voltar à página inicial</button></div>}
 </div>
}
