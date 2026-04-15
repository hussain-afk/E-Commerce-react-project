export default function ProductCard({ title, image, price, description }) {
  return (
    /* Added 'group' for child hover effects and 'hover:-translate-y-1' for a lift effect */
    <div className="group bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 hover:-translate-y-1">

      {/* Image Container with Zoom effect */}
      <div className="w-full h-56 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          /* Added 'group-hover:scale-110' for the zoom effect */
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Optional: A very subtle gradient overlay to make the image pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
          {title}
        </h2>
        
        {/* Description - Added line-clamp to maintain uniform card height */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 h-10">
          {description}
        </p>

        {/* Price and CTA Section */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-black text-gray-900 dark:text-white">
            ${price}
          </p>
          
          {/* Enhanced Button with slight scale effect on click */}
          <button className="px-4 bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-80 active:scale-95 transition-all">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}