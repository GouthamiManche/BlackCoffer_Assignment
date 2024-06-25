import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
const Dashboard = lazy(() => import('./Pages/Dashboard'))
// const About = lazy(() => import('./Pages/About'))
// const Services = lazy(() => import('./Pages/Services'))
// const Contact = lazy(() => import('./Pages/Contact'))
// const GetStarted = lazy(() => import('./Pages/GetStarted'))

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/get-started" element={<GetStarted />} /> */}
          </Routes>
        </Suspense>
        <Footer/>
      </div>
    </Router>
  )
}