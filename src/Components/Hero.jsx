export default function Hero() {
  return (
    <section className="bg-gray-100 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Discover the Latest Trends in Fashion
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Shop the newest styles and upgrade your wardrobe with premium quality products at unbeatable prices.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:opacity-90">
              Shop Now
            </button>

            <button className="border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
              Explore
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTge5EEDfVVtWdsh0hVCzI6m-pZDnCKUqwnuA&s"
            alt="Fashion"
            className="rounded-xl shadow-lg w-full max-w-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}