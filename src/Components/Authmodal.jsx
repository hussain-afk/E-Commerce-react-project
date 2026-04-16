import { motion, AnimatePresence } from "framer-motion";
import { handleGoogleSignIn } from "../utils/firebase.js"; // Import the logic above

export default function AuthModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
              className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Sign in to manage your cart and orders.
                  </p>
                </div>

                {/* Google Button */}
                <button
                  onClick={async () => {
                    await handleGoogleSignIn();
                    onClose(); // Close modal after successful login
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 py-3 px-4 rounded-xl font-bold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95 mb-4"
                >
                  <img 
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                    alt="Google" 
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t dark:border-gray-800"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                {/* Guest / Email Placeholder */}
                <button className="w-full py-3 text-sm font-semibold text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
                  Sign in with Email
                </button>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 text-center">
                <p className="text-xs text-gray-400">
                  By signing in, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>

              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}