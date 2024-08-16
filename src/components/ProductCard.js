import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <motion.div
      className="border rounded-lg p-4" 
      initial={{ opacity: 0.6, scale: 1 }}
      animate={{ opacity: isAdding ? 0.7 : 1, scale: isAdding ? 0.95 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={200}
        height={200}
        className="w-full h-24 object-contain rounded-md"
      />
      <h2 className="text-slate-800 font-semibold mt-4 font-montserrat">{product.title}</h2>
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
