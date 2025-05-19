import { Toaster } from 'sonner'
import './App.css'
import TestForm from './components/TestForm'

function App() {

  return (
    <div className='p-2'>
    
      <TestForm/>
      <Toaster richColors/>
    </div>
  )
}

export default App
