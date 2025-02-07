"use client";

import { useEffect, useState } from "react";
import ReturnButton from "../../components/ReturnButton/returnButton";
import NotFoundPage from "../../NotFoundPage";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  img_url: string;
}

interface Params {
  id: string;
}

export default function ProductDetail({ params }: { params: Params }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/fetchProductById?id=${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch product.");

        const { data } = await response.json();
        console.log("Fetched product:", data); 
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) return (
    <div className="flex-col gap-4 w-full h-[80vh] flex items-center justify-center">
      <div
        className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
      >
        <div
          className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
        ></div>
      </div>
    </div>
  );

  if (!product) return <NotFoundPage />;


  return (
    <div className="w-full min-h-screen px-4 py-8 bg-gray-100 dark:bg-[#2C2758]">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-blue-500 dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden">
        {product.img_url ? (
          <img
            src={product.img_url}
            alt={product.title}
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-64 sm:h-80 md:h-96 bg-gray-200 dark:bg-gray-700">
            <p className="text-gray-500 dark:text-gray-400">No image available</p>
          </div>
        )}
  
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {product.title}
          </h1>
  
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {product.description}
          </p>
  
          <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              ${new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(product.price / 100)}
            </p>
          </div>
  
          <div className="mt-6 flex justify-center">
            <ReturnButton />
          </div>
        </div>
      </div>
    </div>
  );
}
