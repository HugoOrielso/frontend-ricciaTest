import "./App.css"
import TestForm from "./components/TestForm"
import { useEffect, useRef } from "react"

function App() {
  const appRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = appRef.current
    if (!element) return

    let frameId = 0
    let previousHeight = 0

    const sendHeight = () => {
      frameId = 0

      const height = Math.ceil(
        Math.max(
          element.getBoundingClientRect().height,
          element.scrollHeight
        )
      )

      if (height <= 0 || height === previousHeight) return

      previousHeight = height

      window.parent.postMessage(
        {
          type: "RICCIA_IFRAME_HEIGHT",
          height,
        },
        "*"
      )
    }

    const scheduleHeight = () => {
      if (frameId) cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(sendHeight)
    }

    const observer = new ResizeObserver(scheduleHeight)
    observer.observe(element)

    // Captura también la carga de imágenes dentro del quiz.
    element.addEventListener("load", scheduleHeight, true)
    window.addEventListener("resize", scheduleHeight)

    let active = true

    document.fonts.ready.then(() => {
      if (active) scheduleHeight()
    })

    scheduleHeight()

    return () => {
      active = false
      if (frameId) cancelAnimationFrame(frameId)
      observer.disconnect()
      element.removeEventListener("load", scheduleHeight, true)
      window.removeEventListener("resize", scheduleHeight)
    }
  }, [])

  return (
    <div ref={appRef} className="riccia-app">
      <TestForm />
    </div>
  )
}

export default App