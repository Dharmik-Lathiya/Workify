import React from "react";
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Apple, Smartphone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-10 m-4 rounded-3xl">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm mb-12">
          <div>
            <h3 className="font-semibold text-lg mb-4">About Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">About Workify</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Press</li>
              <li className="hover:text-white cursor-pointer transition-colors">Trust, Safety & Security</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">For Clients</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">How to hire</li>
              <li className="hover:text-white cursor-pointer transition-colors">Talent Marketplace</li>
              <li className="hover:text-white cursor-pointer transition-colors">Project Catalog</li>
              <li className="hover:text-white cursor-pointer transition-colors">Enterprise</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">For Talent</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">How to find work</li>
              <li className="hover:text-white cursor-pointer transition-colors">Direct Contracts</li>
              <li className="hover:text-white cursor-pointer transition-colors">Find freelance jobs worldwide</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Help & Support</li>
              <li className="hover:text-white cursor-pointer transition-colors">Success Stories</li>
              <li className="hover:text-white cursor-pointer transition-colors">Workify Reviews</li>
              <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
            </ul>
          </div>
        </div>

        {/* Social Media & Mobile App */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8 gap-6">
          <div className="flex items-center space-x-6">
            <span className="text-gray-400 font-medium">Follow Us</span>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"><Youtube size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-gray-400 font-medium">Mobile app</span>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"><Apple size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"><Smartphone size={20} /></a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 text-gray-500 text-sm">
          <p>© 2026 Workify Global Inc.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
