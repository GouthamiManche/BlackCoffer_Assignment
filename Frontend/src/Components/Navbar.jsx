import React from 'react'
import { Link } from 'react-router-dom'
import BlackcofferLogo from '../assets/Blackcofferlogo.png'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-8 w-auto" src={BlackcofferLogo} alt="Blackcoffer" />
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link 
              to="/" 
              className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link 
              to="/services" 
              className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
          </div>
          <div>
  <Link 
    to="/get-started" 
    className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
  >
    Get started
  </Link>
</div>
        </div>
      </div>
    </nav>
  )
}