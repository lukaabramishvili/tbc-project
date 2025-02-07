'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AddProductDialog from "../components/AddProductDialog/AddProductDialog";
import { useCart } from "../components/providers/CartProvider";
import CartDialog from "../components/CartDialog/CartDialog";
import SearchBar from "../components/searchBar/searchBar";
import SortComponent from '../components/sort/sortComponent';
import { useLanguage } from "../context/LanguageContext";

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

  const { language } = useLanguage()

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 dark:bg-[#2C2758]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-6 dark:text-white">
          {language === "eng" ? "Our Products" : "ჩვენი პროდუქტები"}
        </h1>
        <div className="flex flex-col items-center justify-center mb-6">
          <CartDialog />
          <AddProductDialog retriggerFetch={retriggerFetch} />
          <div className="flex flex-col md:flex-row w-full mt-4 items-center justify-between gap-4">
            <SearchBar searchType="products" />
            <SortComponent sortType="products" />
          </div>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer flex flex-col items-center p-5 border rounded-xl bg-white dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-blue-500 dark:bg-gray-900 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Link href={`/products/${item.id}`} className="w-full">
                  <div className="w-full">
                    <div className="flex items-center justify-between pb-4">
                      <div className="font-semibold text-lg text-gray-900 dark:text-gray-100 p-2">
                        {item.title}
                      </div>
                      <button
                        className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 transition-all duration-300"
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
                    ${new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(item.price / 100)}
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
      </div>
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
