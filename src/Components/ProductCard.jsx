import { useCart } from "./Cartcontext";

export default function ProductCard({ title, image, price, description }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 hover:-translate-y-1">
      {/* Image Container */}
      <div className="w-full h-56 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
          {title}
        </h2>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 h-10">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-black text-gray-900 dark:text-white">
            ${price}
          </p>
          
          <button 
            onClick={() => addToCart({ title, image, price, description })}
            className="px-4 bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-80 active:scale-95 transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}