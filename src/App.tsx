import './App.css'
import TestForm from './components/TestForm'
import { useEffect, useRef } from 'react'

function App() {
  const appRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = appRef.current
    if (!element) return

    const enviarAltura = () => {
      const altura = Math.ceil(element.getBoundingClientRect().height)

      window.parent.postMessage(
        {
          type: 'RICCIA_IFRAME_HEIGHT',
          height: altura,
        },
        '*'
      )
    }

    const raf = requestAnimationFrame(enviarAltura)
    const timeout = setTimeout(enviarAltura, 300)

    const resizeObserver = new ResizeObserver(() => {
      enviarAltura()
    })

    resizeObserver.observe(element)

    window.addEventListener('load', enviarAltura)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
      resizeObserver.disconnect()
      window.removeEventListener('load', enviarAltura)
    }
  }, [])

  return (
    <div
      ref={appRef}
      style={{
        width: '100%',
        height: 'auto',
      }}
    >
      <TestForm />
    </div>
  )
}

export default App