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
    <div className="flex items-center justify-center py-10 px-6 border border-dashed border-black  rounded-lg shadow-md">
      {/* product info */}
      <img src={item?.thumbnail} alt={item?.title} className="w-16 h-16 object-cover" />
      <div className="flex-1 ml-4">
        <h3 className="text-lg  text-black font-montserrat font-semibold">{item?.title}</h3>
        <p className="text-gray-500">${item?.price.toFixed(2)}</p>
      </div>
      {/* plus-minus counters */}
      <div className="flex items-center space-x-2">
        <div className='flex justify-center pr-8 space-x-4'>
        <button
          onClick={handleDecrease}
          className='p-1 text-gray-500 hover:text-gray-900 border rounded-full'
        >
          <MinusIcon className='w-5 h-5' />
        </button>
        <input 
          type="number" 
          value={item?.quantity} 
          onChange={(e) => updateQuantity(item?.id, e.target.value)} 
          className="w-12 border rounded-lg text-center text-black"
        />
        <button
          onClick={handleIncrease}
          className='p-1 text-gray-500 hover:text-gray-900 border rounded-full'
        >
          <PlusIcon className='w-5 h-5'/>
        </button>
        </div>
        {/* remove product from card */}
        <button 
          onClick={() => removeFromCart(item?.id)}
          className="ml-4 text-red-700 hover:text-red-900">
          <TrashIcon className='size-6'/>
        </button>
      </div>
    </div>
  );
}

export default CartItem;