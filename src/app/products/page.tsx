"use client";
import AddProductDialog from "../components/AddProductDialog/AddProductDialog";
import "./index.css";
import { useEffect, useState } from "react";

interface Product {
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
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/fetchProducts", {
        method: "GET",
      });
      if (response.status === 200) {
        const { data } = await response.json();
        console.log(data);
        setProducts(data);
      }
    }
    fetchProducts();
  }, [isRetriggered]);

  return (
    <div className="product-page container min-h-96">
      <h1 className="">Our Products</h1>
      <div className="flex flex-row items-center justify-center p-2 mt-0 pt-0">
        <AddProductDialog retriggerFetch={retriggerFetch}></AddProductDialog>
      </div>

      <div className="product-grid">
        {products.map((item) => (
          <div
            key={item.id}
            className="w-60 h-72 flex flex-col items-center text-start p-5 border rounded-2xl bg-slate-200"
          >
            <div className="font-bold w-full p-2">Name: {item.title}</div>
            <img className="w-56 h-56 items-center" src={item.img_url}></img>
            <div className="font-bold w-full p-2">
              Price: {item.price / 100}$
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
