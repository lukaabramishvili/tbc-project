"use client";

import Link from 'next/link';
import AddProductDialog from "../components/AddProductDialog/AddProductDialog";
import { useCart } from "../components/providers/CartProvider";
import { useEffect, useState } from "react";

export interface Product {
  id: number;
  user_id: string;
  title: string;
  price: number;
  stripe_price_id: string;
  stripe_product_id: string;
  img_url: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isRetriggered, retriggerFetch] = useState<boolean>(false);
  const { addItemToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/fetchProducts");
        if (response.ok) {
          const { data } = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
  
    setIsDeleting(id);
  
    try {
      const response = await fetch(`/api/deleteProduct`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
  
      if (response.ok) {
        setProducts((prev) => prev.filter((product) => product.id !== id));
        alert("Product deleted successfully.");
      } else {
        const { error } = await response.json();
        console.error("Failed to delete product:", error);
        alert(`Failed to delete the product. Error: ${error}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsDeleting(null);
    }
  };
  
  return (
    <div className="container min-h-screen p-6 mx-auto bg-gray-100 dark:bg-gray-700">
      <h1 className="text-center text-4xl font-bold mb-6 dark:text-white">
        Our Products
      </h1>
      <div className="flex justify-center mb-4">
        <AddProductDialog retriggerFetch={retriggerFetch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            data-cy={`item-${item.id}`}
            key={item.id}
            className="cursor-pointer flex flex-col items-center p-5 border rounded-xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl dark:shadow-xl dark:hover:shadow-2xl transform hover:scale-105 dark:hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <Link href={`/products/${item.id}`}>
              <div className="w-full">
                <div className='w-full flex items-center justify-between'>
                  <div className="font-semibold text-lg text-gray-900 dark:text-gray-100 p-2">
                    {item.title}
                  </div>
                  <button
                    className="mt-2 cursor-pointer border-none px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-400 dark:focus:ring-red-300 transition-all duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(item.id);
                    }}
                    disabled={isDeleting === item.id}
                    data-cy={"delete-product-" + item.id}
                  >
                    {isDeleting === item.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
                <img
                  className="w-full h-56 object-cover rounded-lg mb-4"
                  src={item.img_url}
                  alt={item.title}
                />
              </div>
            </Link>
            <div className="flex justify-between w-full items-center mt-auto">
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                ${new Intl.NumberFormat("en-US").format(item.price)}
              </div>
              <button
                className="cursor-pointer border-none px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-300 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault(); 
                  addItemToCart({ product: item, quantity: 1 });
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;