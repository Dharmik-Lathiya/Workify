import LandingPage from './Pages/LandingPage'
import {Routes , Route} from 'react-router-dom'
import React from 'react'
import Signup from './Pages/Signup'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route path="Signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
