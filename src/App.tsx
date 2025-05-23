import { Toaster } from 'sonner'
import './App.css'
import TestForm from './components/TestForm'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    function enviarAltura() {
      const altura = document.documentElement.scrollHeight;
      window.parent.postMessage({ alturaIframe: altura }, "*");
    }

    enviarAltura();

    const mutationObserver = new MutationObserver(enviarAltura);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const resizeObserver = new ResizeObserver(enviarAltura);
    resizeObserver.observe(document.documentElement);

    window.addEventListener('resize', enviarAltura);

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', enviarAltura);
    };
  }, []);

  return (
    <div className='min-h-[500px]'>
      <TestForm />
      <Toaster richColors />
    </div>
  )
}

export default App
