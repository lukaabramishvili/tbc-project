"use client";
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

interface SearchParams {
  search?: string;
  sortBy?: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isRetriggered, retriggerFetch] = useState<boolean>(false);
  const { addItemToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/fetchProducts", {
        method: "GET",
      });
      if (response.status === 200) {
        const { data } = await response.json();
        setProducts(data);
      }
    }
    fetchProducts();
  }, [isRetriggered]);

  return (
    <div className="container min-h-screen p-6 mx-auto bg-gray-100 dark:bg-gray-700">
      <h1 className="text-center text-4xl font-bold mb-6 dark:text-white">
        Our Products
      </h1>
      <div className="flex justify-center mb-4">
        <AddProductDialog retriggerFetch={retriggerFetch}></AddProductDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer flex flex-col items-center p-5 border rounded-xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl dark:shadow-xl dark:hover:shadow-2xl transform hover:scale-105 dark:hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <div className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
              {item.title}
            </div>
            <img
              className="w-full h-56 object-cover rounded-lg mb-4"
              src={item.img_url}
              alt={item.title}
            />
            <div className="flex justify-between w-full items-center mt-auto">
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                ${new Intl.NumberFormat("en-US").format(item.price)}
              </div>
              <button
                className="cursor-pointer border-none px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-300 transition-all duration-300"
                onClick={() => {
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
