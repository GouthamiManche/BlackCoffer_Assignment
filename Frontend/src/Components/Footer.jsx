import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">BlackCoffer</h2>
            <p className="text-sm">Empowering businesses with data-driven insights and innovative solutions.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
              <li><Link to="/services" className="hover:text-blue-400">Services</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/data-analytics" className="hover:text-blue-400">Data Analytics</Link></li>
              <li><Link to="/ai-solutions" className="hover:text-blue-400">AI Solutions</Link></li>
              <li><Link to="/business-intelligence" className="hover:text-blue-400">Business Intelligence</Link></li>
              <li><Link to="/consulting" className="hover:text-blue-400">Consulting</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-2">123 Tech Street, Innovation City</p>
            <p className="text-sm mb-2">contact@blackcoffer.com</p>
            <p className="text-sm mb-4">+1 (555) 123-4567</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-400">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-400">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm">© 2024 BlackCoffer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}