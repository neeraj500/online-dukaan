import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 800);  // reflects product is added to the cart
  };

  return (
    // framer motion wrapp
    <motion.div
      className="border rounded-lg p-4" 
      initial={{ opacity: 0.6, scale: 1 }}
      animate={{ opacity: isAdding ? 0.8 : 1, scale: isAdding ? 0.95 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-28 object-contain"
      />
      <h2 className="text-slate-800 font-semibold mt-6 font-montserrat">{product.title}</h2>
      <p className="text-gray-500">${product.price}</p>
      <div className="flex justify-center">
        <button
          onClick={handleAddToCart} 
          className="btn-primary"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
