import {  CartProvider } from "@/context/CartContext";
import "../app/globals.css";
import Header from "@/components/Header";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})


const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})


function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Header/>
      <main className={`${inter.variable} ${montserrat.variable} font-inter`}>
      <Component {...pageProps} />
      </main>
    </CartProvider>
  );
}

export default MyApp;
