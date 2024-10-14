"use client";

import React, { useState, useEffect } from 'react';
import Product from '../components/Product/page'; 
import "./index.css";
import Link from 'next/link';

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
        <div className='loading'>loading...</div>
      ) : (
        products.map((item) => (
          <Link href={`/product/${item.id}`}>
          <Product
            id={item.id}
            key={item.id}
            imgUrl={item.images[0]}
            price={item.price}
            lastPrice = {Math.round(item.price + (item.price * 0.2))}
            title={item.title} 
            description={item.description} 
          />
          </Link>
        ))
      )}
    </div>
  );
}
