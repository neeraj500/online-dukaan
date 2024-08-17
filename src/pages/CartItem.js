import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  }

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-6 px-4 sm:px-6 border border-dashed border-black rounded-lg shadow-md mb-4">
      {/* product info */}
      <div className="flex items-center mb-4 sm:mb-0 sm:flex-1">
        <img src={item?.thumbnail} alt={item?.title} className="w-16 h-16 object-cover rounded-lg" />
        <div className="ml-4">
          <h3 className="text-base sm:text-lg text-black font-montserrat font-semibold">{item?.title}</h3>
          <p className="text-gray-500">${item?.price.toFixed(2)}</p>
        </div>
      </div>
      {/* plus-minus counters */}
      <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecrease}
            className="p-1 text-gray-500 hover:text-gray-900 border rounded-full"
          >
            <MinusIcon className="w-5 h-5" />
          </button>
          <input 
            type="number" 
            value={item?.quantity} 
            onChange={(e) => updateQuantity(item?.id, e.target.value)} 
            className="w-12 border rounded-lg text-center text-black"
          />
          <button
            onClick={handleIncrease}
            className="p-1 text-gray-500 hover:text-gray-900 border rounded-full"
          >
            <PlusIcon className="w-5 h-5"/>
          </button>
        </div>
        {/* remove product from cart */}
        <button 
          onClick={() => removeFromCart(item?.id)}
          className="text-red-700 hover:text-red-900"
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
