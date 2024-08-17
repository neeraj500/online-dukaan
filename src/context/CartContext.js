import React, { createContext, useState, useEffect} from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState({ type: null, amount: 0 });

  /** JSDoc
   * Adds a product to the cart. If the product already exists in the cart, it increases the quantity.
   * If the product is new to the cart, it adds it with a quantity of 1.
   * @param {Object} product - The product object to add to the cart.
   */

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

/**
   * Removes a product from the cart based on its ID.
   * @param {number} productId - The ID of the product to remove.
   */
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  /**
   * Updates the quantity of a specific product in the cart.
   * @param {number} productId - The ID of the product to update.
   * @param {number} quantity - The new quantity to set for the product.
   */
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  /**
   * Calculates the subtotal of all items in the cart (price * quantity for each item).
   * @returns {number} - The subtotal amount.
   */
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  /**
   * Applies a discount code to the cart. 
   * The discount can be either a fixed amount or a percentage.
   * @param {string} code - The discount code to apply.
   * @returns {boolean} - Returns true if the discount code is valid, otherwise false.
   */
  const applyDiscount = (code) => {
    const discountCodes = {
      SAVE10: { type: "fixed", amount: 10 }, 
      PERCENT10: { type: "percentage", amount: 10 },
    };

    if (discountCodes[code]) {
      setDiscount(discountCodes[code]);
      return true; // Valid Code
    } else {
      setDiscount({ type: null, amount: 0 });
      return false; // Invalid Code
    }
  };

    /**
   * Calculates the total amount to be paid, considering the applied discount.
   * @returns {number} - The total amount after applying the discount.
   */
  const calculateTotal = () => {
    let subtotal = calculateSubtotal();

    if (discount.type === "fixed") {
      subtotal -= discount.amount; // subtract fixed amount
    } else if (discount.type === "percentage") {
      subtotal -= (discount.amount / 100) * subtotal; //  subtract percentage
    }

    return Math.max(subtotal, 0); // ensure total is not negative
  };

  const clearCart = () => {
    setCart([]);
  }

    useEffect(() => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }, []);

    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        calculateSubtotal,
        applyDiscount,
        discount,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
