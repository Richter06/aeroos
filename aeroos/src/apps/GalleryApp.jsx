import './GalleryApp.css'
const PHOTOS=[
 {src:'https://images3.alphacoders.com/865/thumb-1920-86595.jpg',title:'Jardim de luz',caption:'Brilho, verde e céu aberto'},
 {src:'https://cdn.sweezy-wallpapers.com/wallpapers/37c1c1a3-3386-48f0-b013-72e218413d49/frutiger-aero-aesthetic-bubbles-sky-desktop-wallpaper-variant_2k.jpg',title:'Horizonte cristalino',caption:'Um futuro em harmonia com a natureza'},
 {src:'https://cdn.wallpapersafari.com/60/69/IlWuz7.png',title:'Entre dois mundos',caption:'A superfície e o oceano'},
]
export default function GalleryApp(){return <div className="gallery-app"><header className="gallery-heading"><div><p>COLEÇÃO AERO</p><h2>Pequenas maravilhas</h2></div><span>03 imagens</span></header>
 <div className="gallery-grid">{PHOTOS.map((photo,index)=><article className="gallery-card" key={photo.title}><div className="gallery-photo"><img src={photo.src} alt={photo.title} loading="lazy"/><span className="gallery-photo-index">0{index+1}</span></div><div className="gallery-caption"><strong>{photo.title}</strong><small>{photo.caption}</small></div></article>)}</div>
 <footer className="gallery-footer">Imagens de referência Frutiger Aero · carregadas de fontes externas</footer>
 </div>}
