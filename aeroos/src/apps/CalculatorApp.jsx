import { useState } from 'react'
import './CalculatorApp.css'
const KEYS=[['C','clear'],['±','sign'],['%','percent'],['÷','/'],['7','7'],['8','8'],['9','9'],['×','*'],['4','4'],['5','5'],['6','6'],['−','-'],['1','1'],['2','2'],['3','3'],['+','+'],['⌫','back'],['0','0'],['.','.'],['=','equals']]
function evaluateExpression(expression){
 const tokens=expression.match(/\d*\.?\d+|[+\-*/]/g)
 if(!tokens||tokens.join('')!==expression.replace(/\s/g,''))throw Error('Conta inválida')
 const values=[],ops=[],rank={'+':1,'-':1,'*':2,'/':2}
 const apply=()=>{const op=ops.pop(),b=values.pop(),a=values.pop();if(op==='+')values.push(a+b);if(op==='-')values.push(a-b);if(op==='*')values.push(a*b);if(op==='/')values.push(b===0?NaN:a/b)}
 let needsNumber=true
 for(const token of tokens){if(/^\d/.test(token)||token.startsWith('.')){if(!needsNumber)throw Error('Conta inválida');values.push(Number(token));needsNumber=false}else{if(needsNumber)throw Error('Conta inválida');while(ops.length&&rank[ops.at(-1)]>=rank[token])apply();ops.push(token);needsNumber=true}}
 if(needsNumber)throw Error('Conta incompleta')
 while(ops.length)apply()
 if(!Number.isFinite(values[0]))throw Error('Divisão inválida')
 return String(Number(values[0].toPrecision(10)))
}
export default function CalculatorApp(){
 const [display,setDisplay]=useState('0'),[expression,setExpression]=useState(''),[fresh,setFresh]=useState(true)
 const press=(key)=>{
  if(key==='clear'){setDisplay('0');setExpression('');setFresh(true);return}
  if(key==='back'){setDisplay(v=>v.length>1?v.slice(0,-1):'0');return}
  if(key==='sign'){setDisplay(v=>v.startsWith('-')?v.slice(1):`-${v}`);return}
  if(key==='percent'){setDisplay(v=>String(Number(v)/100));return}
  if(key==='equals'){try{setDisplay(evaluateExpression(expression+display));setExpression('');setFresh(true)}catch{setDisplay('Erro');setExpression('');setFresh(true)}return}
  if(['+','-','*','/'].includes(key)){setExpression(v=>v+display+key);setDisplay('0');setFresh(true);return}
  if(key==='.'){setDisplay(v=>v.includes('.')&&!fresh?v:fresh?'0.':v+'.');setFresh(false);return}
  setDisplay(v=>fresh||v==='0'||v==='Erro'?key:v+key);setFresh(false)
 }
 return <div className="calculator-app"><div className="calculator-heading"><span>Calculadora</span><small>PADRÃO</small></div>
  <div className="calculator-display"><div className="calculator-expression">{expression.replaceAll('*','×').replaceAll('/','÷')}</div><output aria-live="polite">{display}</output></div>
  <div className="calculator-keypad">{KEYS.map(([label,key])=><button type="button" key={key} className={`calculator-key ${['/','*','-','+','equals'].includes(key)?'operator':''} ${key==='equals'?'equals':''} ${key==='clear'?'clear':''}`} onClick={()=>press(key)}>{label}</button>)}</div>
 </div>
}
