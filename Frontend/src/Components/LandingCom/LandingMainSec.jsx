import React from "react";
import { motion } from "motion/react";

export default function LandingMainSec() {
  return (
    <>
      <div className="px-6 md:px-20 py-16">
        {/* Heading Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <p className="text-3xl md:text-5xl font-semibold leading-snug md:w-3/5">
            Tailored Design Solutions to Bring Your Vision to Life
          </p>
          <motion.button
            className="bg-gray-700 text-white text-lg md:text-2xl font-medium px-6 py-3 rounded-xl mt-5 md:mt-0"
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.90 }}
          >
            Learn More
          </motion.button>
        </div>

        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {/* Card 1 */}
          <motion.div
            className="group bg-gray-200 hover:bg-[#a8ff36] rounded-xl p-6 shadow-md transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <i className="fas fa-pencil-ruler text-5xl mb-5 text-gray-700 group-hover:text-blue-600 transition-all duration-300"></i>
            <p className="text-xl font-semibold mb-4 text-gray-800 group-hover:text-blue-600">
              Product Design & Development
            </p>
            <p className="text-md text-gray-600">
              Crafting user-centered digital products from concept to completion, including wireframing, prototyping, and intuitive design solutions.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="group bg-[#a8ff36] rounded-xl p-6 shadow-md transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <i className="fas fa-palette text-5xl mb-5 text-gray-700 group-hover:text-blue-600 transition-all duration-300"></i>
            <p className="text-xl font-semibold mb-4 text-gray-800 group-hover:text-blue-600">
              Brand Identity & Visual Design
            </p>
            <p className="text-md text-gray-600">
              Building strong visual identities through logos, typography, color schemes, and overall branding strategies for businesses and startups.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="group bg-gray-200 hover:bg-[#a8ff36] rounded-xl p-6 shadow-md transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <i className="fas fa-code text-5xl mb-5 text-gray-700 group-hover:text-blue-600 transition-all duration-300"></i>
            <p className="text-xl font-semibold mb-4 text-gray-800 group-hover:text-blue-600">
              UI/UX Research & Prototyping
            </p>
            <p className="text-md text-gray-600">
              Enhancing user experience through detailed research, usability testing, and crafting interactive prototypes that bring ideas to life.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
