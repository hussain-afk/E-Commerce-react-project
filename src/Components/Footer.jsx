export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
              STORE<span className="text-blue-600">.</span>
            </h2>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Curating the finest collection of modern essentials for your lifestyle. Quality meets style in every piece.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-4">
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">New Arrivals</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Best Sellers</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Men's Apparel</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Accessories</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Shipping Policy</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Returns & Exchanges</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">FAQ</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Get 10% off your first order when you join.
            </p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              />
              <button className="bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-80 transition-all">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} STORE Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {/* Simple placeholder icons for social links */}
            <span className="text-xs text-gray-500 hover:text-black dark:hover:text-white cursor-pointer">Instagram</span>
            <span className="text-xs text-gray-500 hover:text-black dark:hover:text-white cursor-pointer">Twitter</span>
            <span className="text-xs text-gray-500 hover:text-black dark:hover:text-white cursor-pointer">Facebook</span>
          </div>
        </div>
      </div>
    </footer>
  );
}