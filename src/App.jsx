import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Components/Header.jsx";
import Hero from "./Components/Hero.jsx";
import ProductCard from "./Components/ProductCard.jsx";
import products from "./utils/Product.js";
import Footer from "./Components/Footer.jsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 100 } 
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Pass setSearchTerm to Header to make search work */}
      <Header onSearch={setSearchTerm} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
      </motion.div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="text-3xl font-bold mb-8 text-gray-800 dark:text-white"
        >
          {searchTerm ? `Results for "${searchTerm}"` : "Featured Products"}
        </motion.h2>

        <motion.div 
          layout // This makes the grid items slide smoothly when others disappear
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-gray-500"
          >
            No products found matching your search.
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;