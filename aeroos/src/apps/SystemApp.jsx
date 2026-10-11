import './SystemApp.css'
const DETAILS=[['Sistema','AeroOS Experience 0.1'],['Ambiente','Navegador web'],['Interface','Aero Glass + Frutiger Aero'],['Núcleo visual','React + Vite'],['Estado','Em desenvolvimento']]
export default function SystemApp(){return <div className="system-app"><div className="system-hero"><div className="system-orb">a</div><div><p>SEU ESPAÇO DIGITAL</p><h2>AeroOS</h2><span>Uma experiência inspirada no otimismo digital.</span></div></div>
 <section className="system-card"><h3>Informações do sistema</h3>{DETAILS.map(([label,value])=><div className="system-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}</section>
 <div className="system-bottom-note"><span>✦</span>Feito para explorar, experimentar e criar.</div>
 </div>}
