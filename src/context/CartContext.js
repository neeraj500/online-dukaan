import React, {createContext, useState} from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] =  useState([]);
    const [discount, setDiscount] = useState({type: null, amount: 0});

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1}
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1}];
            }
        });
    }

    const removeFromCart = (productId) => {
        // setCart(cart.filter(item => item.id !== productId));
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    }

    const updateQuantity = (productId, quantity) => {
        // setCart(
        //     cart.map(item => 
        //         item.id === productId ? { ...item, quantity } : item
        //     )
        // );
        setCart((prevCart) => 
            prevCart.map(item => item.id === productId 
                ? { ...item, quantity: Number(quantity) }
                : item
            )
        )   
    };

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }


    const applyDiscount = (code) => {
        const discountCodes = {
            "SAVE10": {type: "fixed", amount: 10}, // 10 Off
            "PRECENT10": {type: "percentage", amount: 10}
        }

        if (discountCodes[code]) {
            setDiscount(discountCodes[code]);
            return true;    // Valid Code
        } else {
            setDiscount({type: null, amount: 0});
            return false; // Invalid Code
        }
    }

    const calculateTotal = () => {
        // return cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const subtotal = calculateSubtotal();
        if (discount.type === 'fixed') {
            return Math.max(subtotal - discount.amount, 0);
        } else if (discount.type === 'percentage') {
            return Math.max(subtotal * (1 - discount.amount / 100), 0);
        }
        return subtotal;
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, updateQuantity, calculateSubtotal, applyDiscount, discount,calculateTotal}}>
            {children}
        </CartContext.Provider>
    )

};