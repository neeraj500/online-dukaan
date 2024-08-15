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
    <div className="flex items-center justify-between p-4 bg-neutral-100 rounded-lg shadow-sm">
      <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover" />
      <div className="flex-1 ml-4">
        <h3 className="text-lg  text-black font-semibold">{item.title}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrease}
          className='p-1 text-gray-700 hover:text-gray-900'
        >
          <MinusIcon className='w-5 h-5' />
        </button>
        <input 
          type="number" 
          value={item.quantity} 
          onChange={(e) => updateQuantity(item.id, e.target.value)} 
          className="w-12 border rounded-lg text-center text-black"
        />
        <button
          onClick={handleIncrease}
          className='p-1 text-gray-700 hover:text-gray-900'
        >
          <PlusIcon className='w-5 h-5'/>
        </button>
        <button 
          onClick={() => removeFromCart(item.id)}
          className="ml-4 text-red-400 hover:text-red-700">
          <TrashIcon className='size-6'/>
        </button>
      </div>
    </div>
  );
}

export default CartItem;