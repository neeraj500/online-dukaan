import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { useRouter } from "next/router";
import Link from "next/link";

const Cart = () => {
  const { cart, calculateTotal, clearCart, calculateSubtotal, applyDiscount, discount } = useContext(CartContext);
  const [discountCode, setDiscountCode] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");
  const router = useRouter();

  const handleApplyDiscount = () => {
    if (discountCode === "SAVE10") {
      // code only appicable if product price is more than $10
      const eligibleItems = cart.filter((item) => item.price > 10);

      if (eligibleItems.length === 0) {
        setDiscountMessage(
          "Sorry, this code is applicable for items above $10 only"
        );
        return;
      }

      const isValid = applyDiscount(discountCode, eligibleItems);
      setDiscountMessage(
        isValid ? "Discount applied successfully" : "Invalid Discount Code"
      );
    } else if (discountCode === "PERCENT10") {
       // code applicable to all items
      const isValid = applyDiscount(discountCode, cart);
      setDiscountMessage(
        isValid ? "Discount applied successfully" : "Invalid Discount Code"
      );
    } else {
      setDiscountMessage("Invalid Discount Code");
    }
  };

  const handleCheckout = () => {
    clearCart();
    router.push("/Checkout");
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl text-black text-center font-semibold mb-6">
          Your Shopping Cart
        </h1>
        {/* conditional check if card is empty */}
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {/* show all added cart items */}
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            {/* price & payment island */}
            <div className="mt-8 p-6 rounded-lg shadow-xl inset-0 bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] border-2 border-slate-900">
              <h2 className="text-xl text-black font-montserrat font-semibold mb-8">
                Subtotal: ${calculateSubtotal().toFixed(2)}
              </h2>

              <div className="mb-8">
                <p className="text-sm text-black font-montserrat font-semibold mb-4">
                  Have a Discount Code? (Try SAVE10 or PERCENT10)
                </p>
                <input
                  type="text"
                  placeholder="Enter Code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="border text-black rounded-lg p-1 mr-2 w-60"
                />
                <button onClick={handleApplyDiscount} className="btn-discount">
                  Apply Code
                </button>
              </div>
              {/* discount outcome */}
              {discountMessage && (
                <p
                  className={`text-sm font-montserrat ${
                    discountMessage.includes("successfully")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {discountMessage}
                </p>
              )}

              {discount.type && (
                <p className="text-sm text-gray-600 mb-4 font-montserrat">
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
              {/* total price  */}
              <h2 className="text-xl text-black font-montserrat font-semibold mb-4">
                Total: ${calculateTotal().toFixed(2)}
              </h2>
              {/* buttons */}
              <div className="w-full flex justify-center gap-6">
                <button
                  onClick={handleCheckout}
                  className="btn-proceed-to-checkout"
                >
                  Proceed to Checkout
                </button>
                <Link href="/" passHref>
                  <div className="btn-secondary">Shop more items</div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
