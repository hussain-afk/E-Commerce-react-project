import { useState, useEffect } from "react"; // Added useEffect
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./Cartcontext";
import AuthModal from "./Authmodal.jsx"; 
import { handleGoogleSignIn, auth, onAuthStateChanged, signOut } from "../utils/firebase.js"; // Ensure auth is exported from firebase.js

export default function Header({ onSearch }) {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, cartTotal } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  // --- FIX 1: Add state to track the user ---
  const [user, setUser] = useState(null);

  // --- FIX 2: Listen for Auth changes ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup listener
  }, []);

  // --- FIX 3: Define function logic OUTSIDE the return ---
  const handleLogin = async () => {
    const loggedInUser = await handleGoogleSignIn();
    if (loggedInUser) {
      console.log("Logged in:", loggedInUser.displayName);
      setIsAuthModalOpen(false); // Close modal on success
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) onSearch(value);
  };

  const navLinks = ["Home", "Shop", "Categories", "Contact"];

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* 1. Logo */}
          <div 
            className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer shrink-0"
            onClick={() => { setSearchValue(""); if (onSearch) onSearch(""); }}
          >
            ShopEase
          </div>

          {/* 2. Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-gray-600 dark:text-gray-300 font-medium">
            {navLinks.map((link) => (
              <a key={link} href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </nav>

          {/* 3. Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md items-center border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-1.5 bg-gray-50 dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full bg-transparent outline-none text-sm dark:text-white"
            />
          </div>

          {/* 4. Action Icons & Login/Logout */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Conditional Login/Logout Button */}
            {user ? (
               <div className="flex items-center gap-3">
                 <span className="hidden lg:block text-sm dark:text-gray-300">Hi, {user.displayName?.split(' ')[0]}</span>
                 <button 
                  onClick={handleLogout}
                  className="hidden sm:block px-4 py-2 text-sm font-bold text-red-500 border border-red-200 rounded-lg hover:bg-red-50"
                 >
                   Logout
                 </button>
               </div>
            ) : (
              <button
                className="hidden sm:block px-5 py-2 text-sm font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Login
              </button>
            )}

            {/* Cart Toggle */}
            <button 
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white dark:ring-gray-900">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-gray-700 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* 5. Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
            >
              <div className="p-4 space-y-4">
                <div className="flex items-center border dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="w-full bg-transparent outline-none dark:text-white"
                  />
                </div>
                <nav className="flex flex-col gap-4 font-medium dark:text-gray-300">
                  {navLinks.map((link) => (
                    <a key={link} href="#" onClick={() => setIsMenuOpen(false)}>{link}</a>
                  ))}
                  
                  {user ? (
                    <button 
                      className="w-full py-3 mt-2 text-center font-bold bg-red-100 text-red-600 rounded-lg"
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    >
                      Logout ({user.displayName})
                    </button>
                  ) : (
                    <button 
                      className="w-full py-3 mt-2 text-center font-bold bg-blue-600 text-white rounded-lg active:scale-95"
                      onClick={() => { setIsAuthModalOpen(true); setIsMenuOpen(false); }}
                    >
                      Login / Sign Up
                    </button>
                  )}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Sidebar Overlay (Sections 6 code remained correct) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" 
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center text-gray-800 dark:text-white">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 text-2xl">&times;</button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {cartItems.length === 0 ? (
                  <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.title} className="flex gap-4 items-center">
                      <img src={item.image} className="w-20 h-20 object-cover rounded-lg" alt={item.title} />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm dark:text-white">{item.title}</h4>
                        <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                        <button 
                          onClick={() => removeFromCart(item.title)}
                          className="text-xs text-red-500 font-semibold mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex justify-between text-lg font-bold dark:text-white mb-4">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                  Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 7. Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onGoogleSignIn={handleLogin} // Passing handler if your modal uses it
      />
    </>
  );
}