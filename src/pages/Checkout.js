import Image from "next/image";
import Link from "next/link";
import ShippingGif from "../../public/shipping.gif"

const Checkout = () => {
    return (
      <div className="max-w-lg mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 font-montserrat">Thank You for Your Purchase!</h1>
        <p className="text-gray-500 mb-6">Your order has been successfully placed.</p>
        <Link href="/">
        <div className="btn-secondary ml-10">
          Return to Home
        </div>
        </Link>
        <div className="flex justify-center mt-40">
        <Image src={ShippingGif} alt="my gif" height={200} width={200}/>
        </div>
      </div>
    );
  }
  
  export default Checkout;