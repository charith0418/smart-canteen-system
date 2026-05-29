import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add to cart (Handles both MongoDB _id and local id)
  const addToCart = (product) => {
    setCart((prev) => {
      const productId = product._id || product.id;
      const exist = prev.find((item) => (item._id || item.id) === productId);
      
      if (exist) {
        return prev.map((item) =>
          (item._id || item.id) === productId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Increase quantity
  const increase = (id) => {
    setCart((prev) =>
      prev.map((item) => 
        (item._id || item.id) === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) => 
          (item._id || item.id) === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Clear the cart completely
  const clearCart = () => setCart([]);

  // Calculate subtotal for the UI
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Process the sale with the Node.js backend
  const completeSale = async () => {
    if (cart.length === 0) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Sends the login token for security
        },
        body: JSON.stringify({
          // This mapping translates your frontend data into the exact format your backend Sale.js model requires
          items: cart.map((cartItem) => ({
            item: cartItem._id || cartItem.id, // Backend requires 'item' (MongoDB ID)
            quantity: cartItem.qty,            // Backend requires 'quantity'
            priceAtSale: cartItem.price        // Backend requires 'priceAtSale'
          })),
          subtotal: subtotal,
          total: subtotal
        })
      });

      // Parse the JSON response from the server
      const data = await response.json();

      if (response.ok) {
        alert("Sale Completed Successfully!");
        setCart([]); // Empty the cart on success
      } else {
        // If backend rejects it, show the exact error message
        alert(`Failed: ${data.message || "Unknown server error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Cannot connect to server! Make sure your Node.js backend is running.");
    }
  };

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        addToCart, 
        increase, 
        decrease, 
        clearCart, 
        subtotal, 
        completeSale 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};