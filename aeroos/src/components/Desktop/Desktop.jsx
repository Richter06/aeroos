import './Desktop.css'
const BUBBLES=[['bubble-one','0s'],['bubble-two','-4s'],['bubble-three','-8s'],['bubble-four','-2s']]
export default function Desktop({wallpaper,onContextMenu,children}){
 return <section className="aero-desktop" style={{'--desktop-wallpaper':`url("${wallpaper}")`}} onContextMenu={onContextMenu} aria-label="Área de trabalho do AeroOS">
  <div className="wallpaper-wash"/><div className="sun-glow"/><div className="light-ribbon ribbon-one"/><div className="light-ribbon ribbon-two"/>
  <div className="ambient-bubbles" aria-hidden="true">{BUBBLES.map(([name,delay])=><span key={name} className={`bubble ${name}`} style={{animationDelay:delay}/>)}</div>
  <div className="desktop-topline"><span className="aero-brand"><span className="brand-orb">a</span>aeroOS</span><span className="desktop-tagline">technology in harmony with nature</span></div>
  {children}<div className="desktop-corner-note">AeroOS <span>·</span> build 01</div>
 </section>
}
