import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Increase
  const increase = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Decrease
  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const completeSale = () => {
  if (cart.length === 0) return;

  const sale = {
    id: Date.now(),
    items: cart,
    total: subtotal,
    date: new Date().toLocaleString(),
  };

  // get old sales
  const existingSales =
    JSON.parse(localStorage.getItem("sales")) || [];

  // add new sale
  existingSales.push(sale);

  // save again
  localStorage.setItem(
    "sales",
    JSON.stringify(existingSales)
  );
  alert("Sale Completed Successfully");
  // clear cart
  setCart([]);
};

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increase, decrease, clearCart, subtotal, completeSale }}
    >
      {children}
    </CartContext.Provider>
  );
};