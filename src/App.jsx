import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"

const App = () => {
  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </>
  )
}

export default App