import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './ui/screen/Home'
import Exercise1 from './ui/screen/exercise-1'
import Exercise2 from './ui/screen/exercise-2'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/1" element={<Exercise1 />} />
          <Route path="/exercise/2" element={<Exercise2 />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
