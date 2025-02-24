import { useState } from 'react'
import snpLogo from './assets/a_logo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'
import Bakelitek from './oldalak/Bakelitek.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='row'>
        <div className='div-title container-fluid col-md-6'>
          <h1>Scratch 'n Spin</h1>
          <img className='img-responsive col-md-4' src={snpLogo} alt="" />
        </div>
      </div>
      <div className='row'>
        <Bakelitek></Bakelitek>
      </div>
    </>
  )
}

export default App
