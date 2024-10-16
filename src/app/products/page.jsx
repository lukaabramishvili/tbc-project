"use client";

// import ProductCard from '../components/ProductCard/page'
import { useEffect, useState } from "react";
import "./index.css";
import Link from "next/link";
import LoadingSpinner from "../components/LoadingSpinner/loadingSpinner";

const ProductFetch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();

      setTimeout(() => {
        setProducts(data.products);
        setLoading(false);
      }, 2000);
    }

    fetchData();
  }, []);

  const [search, setSearch] = useState('')  

  return (
    <div className="product-page container">
      <h1>Our Products</h1>

      <div className="search-input">
        <input 
          onChange={(e) => setSearch(e.target.value)}
          type="text" 
          placeholder="Search" 
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="product-grid">
          {products.filter((item) => {
            return search 
            ? item.title.toLowerCase().includes(search.toLowerCase()) 
            : true;
          }).map((item) => (
            <div key={item.id} className="product-card">
              <Link href={`/products/${item.id}`}>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="product-image"
                />
                <div className="product-info">
                  <h2>{item.title}</h2>
                  <p className="product-description">{item.description}</p>
                  <p className="product-price">${item.price}</p>
                  <p className="product-last-price">${Math.round(item.price - item.price * 0.2)}</p>
                </div>
              </Link>
            </div>
            // <ProductCard
            //   key = {item.id}
            //   id = {item.id}
            //   imgUrl = {item.images[0]}
            //   price = {item.price}
            //   lastPrice = {Math.round(item.price - item.price * 0.2)} 
            //   name = {item.name}
            // />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductFetch;
