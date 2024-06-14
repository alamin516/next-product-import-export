"use client";
import ExportToExcel from "@/components/ExportToExcel";
import ImportFromExcel from "@/components/ImportFromExcel";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import toast from "react-hot-toast";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        return new Promise((resolve) =>
          setTimeout(() => resolve(data.data), 3000)
        );
      })
      .then((productsData) => {
        setProducts(productsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleFileUpload = (data) => {
    setLoading(true);

    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        return new Promise((resolve) =>
          setTimeout(() => resolve(data.data), 3000)
        );
      })
      .then((productsData) => {
        toast.success("Products imported successfully");
        setProducts(productsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="mb-4 flex justify-between gap-10">
        <ExportToExcel data={products} fileName="products" />
        <ImportFromExcel onFileUpload={handleFileUpload} />
      </div>
      
      
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="text-center border-b" key={product.id}>
                <td className="py-2 px-4">{product.id}</td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.price}</td>
                <td className="py-2 px-4">{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="py-10">
        {loading && <Loading />}
        </div>
    </div>
  );
};

export default ProductsPage;
