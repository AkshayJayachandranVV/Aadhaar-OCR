import './App.css'
import AadhaarOCR from './Components/AadhaarOCR'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter >
        <Routes> 
        <Route path='/' element={<AadhaarOCR />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
