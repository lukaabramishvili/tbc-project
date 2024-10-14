"use client";

import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner/loadingSpinner';
import Product from '../components/Product/page'; 
import "./index.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();

      setProducts(data.products);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className='container'>
      {loading ? (
        <LoadingSpinner />
      ) : (
        products.map((item) => (
          <Product
            key={item.id}
            imgUrl={item.images[0]}
            price={item.price}
            title={item.title} 
            description={item.description} 
          />
        ))
      )}
    </div>
  );
}
