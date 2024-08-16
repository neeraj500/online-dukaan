const Checkout = () => {
    return (
      <div className="max-w-lg mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
        <p className="text-gray-500 mb-6">Your order has been successfully placed.</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="btn-secondary">
          Return to Home
        </button>
      </div>
    );
  }
  
  export default Checkout;