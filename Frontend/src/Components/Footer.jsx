import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 p-10 m-6 rounded-[10px]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
          <div>
            <h3 className="font-semibold">About Us</h3>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>Feedback</li>
              <li>Trust, Safety & Security</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Help & Support</h3>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>Upwork Foundation</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Privacy Policy</h3>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>CA Notice at Collection</li>
              <li>Cookie Settings</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Accessibility</h3>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>Desktop App</li>
              <li>Cookie Policy</li>
              <li>Enterprise Solutions</li>
            </ul>
          </div>
        </div>

        {/* Social Media & Mobile App */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4">
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Follow Us</span>
            <div className="flex space-x-3">
              <i className="fab fa-facebook text-xl p-2 border rounded-full"></i>
              <i className="fab fa-linkedin text-xl p-2 border rounded-full"></i>
              <i className="fab fa-twitter text-xl p-2 border rounded-full"></i>
              <i className="fab fa-youtube text-xl p-2 border rounded-full"></i>
              <i className="fab fa-instagram text-xl p-2 border rounded-full"></i>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400">Mobile app</span>
            <div className="flex space-x-3">
              <i className="fab fa-apple text-xl p-2 border rounded-full"></i>
              <i className="fab fa-android text-xl p-2 border rounded-full"></i>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-500 text-sm mt-6">
          © 2015 - 2025 Upwork® Global Inc.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
