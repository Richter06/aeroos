import { useState } from 'react'
import './NotepadApp.css'
export default function NotepadApp(){
 const [text,setText]=useState('Bem-vindo ao AeroOS!\n\nUma pequena ideia pode mudar o mundo.\n\nComece a escrever...'),[saved,setSaved]=useState(true)
 return <div className="notepad-app"><div className="notepad-toolbar"><button type="button" onClick={()=>{setText('');setSaved(false)}}>Novo</button><button type="button" onClick={()=>setSaved(true)}>Salvar</button><span>{saved?'Todas as alterações salvas':'Alterações não salvas'}</span></div>
  <textarea className="notepad-editor" value={text} onChange={event=>{setText(event.target.value);setSaved(false)}} spellCheck="false" aria-label="Conteúdo do bloco de notas"/>
  <footer className="notepad-status"><span>Texto simples</span><span>{text.length} caracteres</span><span>Ln {text.split('\n').length}</span></footer>
 </div>
}
