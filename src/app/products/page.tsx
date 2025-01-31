'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AddProductDialog from "../components/AddProductDialog/AddProductDialog";
import { useCart } from "../components/providers/CartProvider";
import CartDialog from "../components/CartDialog/CartDialog";
import SearchBar from "../components/searchBar/searchBar";
import SortComponent from '../components/sort/sortComponent';

export interface Product {
  id: number;
  user_id: string;
  title: string;
  price: number;
  stripe_price_id: string;
  stripe_product_id: string;
  img_url: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const { addItemToCart } = useCart();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const sortBy = searchParams.get("sortBy") || "";
  const [isRetriggered, retriggerFetch] = useState<boolean>(false);


  // Fetch products from the API
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

  // Handle product deletion
  const handleDelete = async (id: number) => {
    setIsDeleting(id);
    try {
      const response = await fetch(`/api/deleteProduct`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setProducts((prev) => prev.filter((item) => item.id !== id));
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    setIsDeleting(null);
  };

  // Filter and sort products
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <div className="container min-h-screen p-6 mx-auto bg-gray-100 dark:bg-gray-700">
      <h1 className="text-center text-4xl font-bold mb-6 dark:text-white">Our Products</h1>
      <div className="flex items-center justify-center mb-4 flex-col">
        <AddProductDialog retriggerFetch={retriggerFetch} />
        <div className="flex items-center justify-between w-full mt-4 md:flex-row flex-col">
          <SearchBar searchType={"products"} />
          <SortComponent sortType="products" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer flex flex-col items-center p-5 border rounded-xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Link href={`/products/${item.id}`}>
                <div className="w-full">
                  <div className="w-full flex items-center justify-between pb-4">
                    <div className="font-semibold text-lg text-gray-900 dark:text-gray-100 p-2">
                      {item.title}
                    </div>
                    <button
                      className="mt-2 px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 transition-all duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(item.id);
                      }}
                      disabled={isDeleting === item.id}
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
                  className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    addItemToCart({ product: item, quantity: 1 });
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600 dark:text-gray-300">No products found</p>
        )}
      </div>
      <CartDialog />
    </div>
  );
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Products />
    </Suspense>
  );
}
