import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Code, Palette, Smartphone, LineChart, Globe } from "lucide-react";

export default function LandingMainSec() {
  const categories = [
    { icon: <Code size={32} />, title: "Development & IT", rating: "4.85/5", skills: 1853 },
    { icon: <Palette size={32} />, title: "Design & Creative", rating: "4.91/5", skills: 968 },
    { icon: <Briefcase size={32} />, title: "Sales & Marketing", rating: "4.77/5", skills: 392 },
    { icon: <Smartphone size={32} />, title: "Writing & Translation", rating: "4.92/5", skills: 505 },
    { icon: <LineChart size={32} />, title: "Finance & Accounting", rating: "4.79/5", skills: 214 },
    { icon: <Globe size={32} />, title: "Admin & Customer Support", rating: "4.77/5", skills: 508 },
  ];

  return (
    <div className="bg-white py-24 px-6 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Browse talent by category
          </h2>
          <p className="text-xl text-gray-600">
            Looking for work? <a href="/freelancer/SignUp" className="text-green-600 hover:underline font-medium">Browse jobs</a>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-gray-50 rounded-2xl p-8 hover:bg-green-50 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100"
            >
              <div className="mb-6 text-gray-700 group-hover:text-green-600 transition-colors">
                {category.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-green-700">
                {category.title}
              </h3>
              <div className="flex items-center text-gray-500 gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-green-500">★</span>
                  <span className="font-medium">{category.rating}</span>
                </div>
                <div className="text-gray-400">•</div>
                <div className="font-medium">{category.skills} skills</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
