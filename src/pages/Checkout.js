const Checkout = () => {
    return (
      <div className="max-w-lg mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
        <p className="text-gray-600 mb-6">Your order has been successfully placed.</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
          Return to Home
        </button>
      </div>
    );
  }
  
  export default Checkout;