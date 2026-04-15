import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    console.log("Searching for:", searchQuery);
    setIsOpen(false);
  };

  // Variants for the mobile menu container
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Variants for individual links to create a staggered entrance
  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer">
          ShopEase
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-300">
          {["Home", "Shop", "Categories", "Contact"].map((item) => (
            <a key={item} href="#" className="hover:text-black dark:hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop Search */}
        <form 
          onSubmit={handleSearch}
          className="hidden md:flex items-center border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 w-1/3 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 transition-all"
        >
          <button type="submit" className="p-1">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full outline-none px-2 py-1 bg-transparent text-black dark:text-white"
          />
        </form>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <svg className="w-6 h-6 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">2</span>
          </div>

          {/* Animated Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 dark:text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-around">
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current block transition-transform" 
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-current block" 
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current block transition-transform" 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-xl"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              <nav className="flex flex-col gap-4">
                {["Home", "Shop", "Categories", "Contact"].map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    variants={linkVariants}
                    transition={{ delay: i * 0.1 }}
                    className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500"
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>

              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSearch}
                className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-2 bg-gray-50 dark:bg-gray-800"
              >
                <button type="submit">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full outline-none px-2 bg-transparent text-black dark:text-white"
                />
              </motion.form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}