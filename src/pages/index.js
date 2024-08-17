import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Loader from '@/app/loading';


export default function Home() {
  // state for all items
  const [products, setProducts] = useState(null); 

  // open-source api to fetch items
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products)) 
      .catch(err => console.error(err)); 
  }, []);

 
  // loading screen while products are being fetched
  if (!products) {
    return <Loader />;
  }

  return (
    <div className="bg-neutral-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map(product => (
        // common component for products
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
