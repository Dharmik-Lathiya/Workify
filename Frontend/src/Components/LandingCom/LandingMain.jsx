import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../UI/Button';
import slider1 from "../../Assets/1slider.jpg";
import { ArrowRight } from 'lucide-react';

export default function LandingMain() {
  return (
    <div className="relative w-full min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={slider1} 
          alt="Freelancer working" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            How work <br />
            <span className="text-green-500">should work</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed"
          >
            Forget the old rules. You can have the best people. Right now. Right here. Find the perfect freelance services for your business.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/SignUp">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 rounded-full">
                Find Talent
              </Button>
            </Link>
            <Link to="/freelancer/SignUp">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 rounded-full border-white text-white hover:bg-white hover:text-gray-900">
                Find Work
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating Trust Badge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden lg:flex absolute bottom-12 right-12 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl items-center gap-4 text-white max-w-sm"
      >
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <ArrowRight className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-lg">Trusted by Top Companies</p>
          <p className="text-sm text-gray-300">Join millions of businesses scaling their workforce</p>
        </div>
      </motion.div>
    </div>
  );
}
