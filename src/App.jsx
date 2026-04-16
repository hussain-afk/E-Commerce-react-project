import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Components/Header.jsx";
import Hero from "./Components/Hero.jsx";
import ProductCard from "./Components/ProductCard.jsx";
import products from "./utils/Product.js";
import Footer from "./Components/Footer.jsx";
import { CartProvider } from "./Components/Cartcontext.jsx";

// Container for staggered children animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    },
  },
};

// Variants for individual product cards
const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    transition: { duration: 0.3 } 
  }
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // 1. Wrap the entire app in CartProvider so Header and ProductCard can share data
    <CartProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        
        {/* Pass setSearchTerm to Header to make the search bar functional */}
        <Header onSearch={setSearchTerm} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
        </motion.div>

        <main className="max-w-7xl mx-auto px-4 py-12">
          {/* Section Heading */}
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-gray-800 dark:text-white"
          >
            {searchTerm ? `Results for "${searchTerm}"` : "Featured Products"}
          </motion.h2>

          {/* Product Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* popLayout handles the layout shifts smoothly when items are removed/added */}
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State UI */}
          <AnimatePresence>
            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-full mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search for "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-6 text-blue-600 font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;