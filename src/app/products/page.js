'use client'
import ExportToExcel from '@/components/ExportToExcel';
import ImportFromExcel from '@/components/ImportFromExcel';
import { useState, useEffect } from 'react';


const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your API
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const handleFileUpload = (data) => {
    // Send imported data to your API to save it to your database
    fetch('/api/products/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  return (
    <div>
      <h1>Products</h1>
      <ExportToExcel data={products} fileName="products" />
      <ImportFromExcel onFileUpload={handleFileUpload} />
    </div>
  );
};

export default ProductsPage;
