import './App.css'
import TestForm from './components/TestForm'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    function enviarAltura() {
      const altura = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      )

      window.parent.postMessage(
        {
          type: 'RICCIA_IFRAME_HEIGHT',
          alturaIframe: altura,
        },
        '*'
      )
    }

    const raf = requestAnimationFrame(enviarAltura)
    const timeout = setTimeout(enviarAltura, 300)

    const mutationObserver = new MutationObserver(() => {
      enviarAltura()
    })
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    })

    const resizeObserver = new ResizeObserver(() => {
      enviarAltura()
    })
    resizeObserver.observe(document.body)
    resizeObserver.observe(document.documentElement)

    window.addEventListener('resize', enviarAltura)
    window.addEventListener('load', enviarAltura)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
      mutationObserver.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('resize', enviarAltura)
      window.removeEventListener('load', enviarAltura)
    }
  }, [])

  return (
    <div style={{ width: '100%', minHeight: '500px' }}>
      <TestForm />
    </div>
  )
}

export default App
