import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { useRouter } from "next/router";

const CartPage = () => {
  const { cart, calculateTotal, applyDiscount, discount } =
    useContext(CartContext);
  const [discountCode, setDiscountCode] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");
  const router = useRouter();

  const handleApplyDiscount = () => {
    const isValid = applyDiscount(discountCode);
    setDiscountMessage(
      isValid ? "Discount applied successfully" : "Invalid Discount Code"
    );
  };

  const handleCheckout = () => {
    router.push("/Checkout");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 w-full max-h-full bg-slate-200">
      <h1 className="text-3xl  text-black font-bold mb-6">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-8 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl text-black font-semibold mb-4">
              Subtotal: ${calculateTotal().toFixed(2)}
            </h2>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Discount Code Here"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="border text-black rounded-lg p-2 mr-2 w-64"
              />
              <button
                onClick={handleApplyDiscount}
                className="bg-green-600 py-2 px-4 rounded-lg hover:bg-green-900"
              >
                Apply Discount
              </button>
            </div>

            {discountMessage && (
              <p
                className={`text-sm ${
                  discountMessage.includes("successfully")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {discountMessage}
              </p>
            )}

            {discount.type && (
              <p className="text-sm text-gray-600 mb-4">
                Discount (
                {discount.type === "fixed"
                  ? `$${discount.amount} off`
                  : `${discount.amount}% off`}
                ): $
                {discount.type === "fixed"
                  ? discount.amount.toFixed(2)
                  : ((discount.amount / 100) * calculateTotal()).toFixed(2)}
              </p>
            )}

            <h2 className="text-xl text-black font-semibold mb-4">
              Total: ${calculateTotal().toFixed(2)}
            </h2>
            <div className="w-full flex justify-center">
            <button
              onClick={handleCheckout} // Checkout button action
              className="bg-indigo-500 text-white w-96 py-2 rounded-lg hover:bg-indigo-800 transition"
            >
              Proceed to Checkout
            </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
