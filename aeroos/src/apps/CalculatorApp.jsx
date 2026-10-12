
import { useState } from 'react'
import './CalculatorApp.css'

const KEYS = [
  ['C', 'clear'],
  ['±', 'sign'],
  ['%', 'percent'],
  ['÷', '/'],
  ['7', '7'],
  ['8', '8'],
  ['9', '9'],
  ['×', '*'],
  ['4', '4'],
  ['5', '5'],
  ['6', '6'],
  ['−', '-'],
  ['1', '1'],
  ['2', '2'],
  ['3', '3'],
  ['+', '+'],
  ['⌫', 'back'],
  ['0', '0'],
  ['.', '.'],
  ['=', 'equals'],
]

function evaluateExpression(expression) {
  const tokens = expression.match(/(?:\d+\.?\d*|\.\d+)|[+\-*/]/g)

  if (!tokens || tokens.join('') !== expression.replace(/\s/g, '')) {
    throw new Error('Conta inválida')
  }

  const values = []
  const ops = []
  const rank = { '+': 1, '-': 1, '*': 2, '/': 2 }

  const apply = () => {
    const op = ops.pop()
    const b = values.pop()
    const a = values.pop()

    if (a === undefined || b === undefined) {
      throw new Error('Conta inválida')
    }

    if (op === '+') values.push(a + b)
    if (op === '-') values.push(a - b)
    if (op === '*') values.push(a * b)
    if (op === '/') values.push(b === 0 ? NaN : a / b)
  }

  let needsNumber = true

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    if (/^(?:\d+\.?\d*|\.\d+)$/.test(token)) {
      if (!needsNumber) throw new Error('Conta inválida')

      values.push(Number(token))
      needsNumber = false
      continue
    }

    // Permite números negativos no início ou após outro operador.
    if (token === '-' && needsNumber) {
      const next = tokens[i + 1]

      if (!next || !/^(?:\d+\.?\d*|\.\d+)$/.test(next)) {
        throw new Error('Conta inválida')
      }

      values.push(-Number(next))
      i++
      needsNumber = false
      continue
    }

    if (needsNumber) throw new Error('Conta inválida')

    while (ops.length && rank[ops.at(-1)] >= rank[token]) {
      apply()
    }

    ops.push(token)
    needsNumber = true
  }

  if (needsNumber) throw new Error('Conta incompleta')

  while (ops.length) apply()

  if (values.length !== 1 || !Number.isFinite(values[0])) {
    throw new Error('Resultado inválido')
  }

  return String(Number(values[0].toPrecision(10)))
}

export default function CalculatorApp() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [fresh, setFresh] = useState(true)

  const press = (key) => {
    if (key === 'clear') {
      setDisplay('0')
      setExpression('')
      setFresh(true)
      return
    }

    if (key === 'back') {
      if (fresh || display === 'Erro') {
        setDisplay('0')
        setFresh(true)
        return
      }

      setDisplay((value) =>
        value.length > 1 ? value.slice(0, -1) : '0',
      )
      return
    }

    if (key === 'sign') {
      if (display === '0' || display === 'Erro') return

      setDisplay((value) =>
        value.startsWith('-') ? value.slice(1) : `-${value}`,
      )
      setFresh(false)
      return
    }

    if (key === 'percent') {
      if (display === 'Erro') return

      setDisplay(String(Number(display) / 100))
      setFresh(true)
      return
    }

    if (key === 'equals') {
      if (!expression) return

      try {
        const result = evaluateExpression(expression + display)
        setDisplay(result)
        setExpression('')
        setFresh(true)
      } catch {
        setDisplay('Erro')
        setExpression('')
        setFresh(true)
      }

      return
    }

    if (['+', '-', '*', '/'].includes(key)) {
      if (display === 'Erro') return

      if (fresh && expression) {
        setExpression((value) => value.slice(0, -1) + key)
      } else {
        setExpression((value) => value + display + key)
      }

      setDisplay('0')
      setFresh(true)
      return
    }

    if (key === '.') {
      if (fresh || display === 'Erro') {
        setDisplay('0.')
        setFresh(false)
        return
      }

      setDisplay((value) =>
        value.includes('.') ? value : value + '.',
      )

      return
    }

    setDisplay((value) =>
      fresh || value === '0' || value === 'Erro'
        ? key
        : value + key,
    )

    setFresh(false)
  }

  return (
    <div className="calculator-app">
      <div className="calculator-atmosphere" aria-hidden="true">
        <span className="calculator-orb calculator-orb-one" />
        <span className="calculator-orb calculator-orb-two" />
        <span className="calculator-orb calculator-orb-three" />
        <span className="calculator-glow" />
      </div>

      <div className="calculator-heading">
        <div className="calculator-title">
          <span className="calculator-title-icon" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>

          <span>Calculadora</span>
        </div>

        <span className="calculator-mode">PADRÃO</span>
      </div>

      <div className="calculator-display">
        <div className="calculator-expression">
          {expression.replaceAll('*', '×').replaceAll('/', '÷')}
        </div>

        <output aria-live="polite">{display}</output>

        <div className="calculator-display-reflection" aria-hidden="true" />
      </div>

      <div className="calculator-keypad">
        {KEYS.map(([label, key]) => (
          <button
            type="button"
            key={key}
            className={[
              'calculator-key',
              ['/', '*', '-', '+'].includes(key) ? 'operator' : '',
              key === 'equals' ? 'equals' : '',
              key === 'clear' ? 'clear' : '',
              ['sign', 'percent', 'back'].includes(key) ? 'utility' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => press(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="calculator-footer">
        <span className="calculator-status-light" />
        <span>AERO GLASS</span>
        <span className="calculator-footer-divider">·</span>
        <span>STANDARD</span>
      </div>
    </div>
  )
}
