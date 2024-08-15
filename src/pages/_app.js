import {  CartProvider } from "@/context/CartContext";
import "../app/globals.css";
import Header from "@/components/Header";


function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Header/>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
