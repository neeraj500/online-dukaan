import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Loader from '@/app/loading';


export default function Home() {
  const [products, setProducts] = useState(null); // Initialize with null to check if data is loaded

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products)) // Directly set the products array
      .catch(err => console.error(err)); // Handle any potential errors
  }, []);

 
  if (!products) {
    return <Loader />;
  }

  return (
    <div className="bg-neutral-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
