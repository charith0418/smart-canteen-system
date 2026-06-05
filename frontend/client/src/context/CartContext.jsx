import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const id = product._id || product.id;

      const exist = prev.find(
        (item) => (item._id || item.id) === id
      );

      if (exist) {
        return prev.map((item) =>
          (item._id || item.id) === id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // INCREASE
  const increase = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        (item._id || item.id) === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  // DECREASE
  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          (item._id || item.id) === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // REMOVE ENTIRE ITEM FROM CART (Before checkout)
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => (item._id || item.id) !== id));
  };

  // CLEAR CART
  const clearCart = () => setCart([]);

  // TOTAL
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const completeSale = async () => {
    if (cart.length === 0) return null;

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("isLoggedInTruetoken");

      const formattedItems = cart.map((item) => ({
        item: String(item.name || item.title || "Unknown Product"), // Passes readable name string ("Tea") instead of hex ID string
        quantity: Number(item.qty),           
        priceAtSale: Number(item.price),     
      }));

      // Submit formatted payload to API
     const response = await fetch(
    "https://smart-canteen-backend.onrender.com/api/sales", // 🌟 Your live Render URL here
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token && token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      },
          body: JSON.stringify({
            items: formattedItems,
            subtotal: subtotal,
            total: subtotal, 
            discount: 0,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Sale failed");
        return null;
      }

      // Clear out cart upon success
      setCart([]);
      alert("Sale processed successfully!");
      return data.sale;

    } catch (err) {
      console.error("SALE ERROR:", err);
      alert("Server not running or network error");
      return null;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increase,
        decrease,
        removeFromCart, // Added to export values
        clearCart,
        subtotal,
        completeSale,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};