import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.title === product.title);
      if (existing) {
        return prev.map((item) =>
          item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Automatically open the sidebar when an item is added
    setIsCartOpen(true);
  };

  const removeFromCart = (title) => {
    setCartItems((prev) => prev.filter((item) => item.title !== title));
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isCartOpen, setIsCartOpen, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);