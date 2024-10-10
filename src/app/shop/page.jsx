import React from 'react';
import Product from '../components/Product/page';
import "./index.css";

export default function Shop() {
  return (
    <div className='container'>
        <Product
          imgUrl = "public\Products\AsusROGStrix15.6_5_1024x1024.webp"
          price = "1399"
          lastPrice = "1499"
          name = "Asus ROG Strix 15"
          stock = {true}
        />
        <Product
          imgUrl = "public\Products\rp09ea-1.jpeg"
          price = "1399"
          lastPrice = "1499"
          name = "Asus ROG Strix 15"
          stock = {true}
        />
        <Product
          imgUrl = "public\Products\lll.jpg"
          price = "1399"
          lastPrice = "1499"
          name = "Asus ROG Strix 15"
          stock = {false}
        />
        <Product
          imgUrl = "public\Products\dv0022ur-1.jpg"
          price = "1399"
          lastPrice = "1499"
          name = "Asus ROG Strix 15"
          stock = {false}
        />
        <Product
          imgUrl = "public\Products\rp09ea-1.jpeg"
          price = "1399"
          lastPrice = "1499"
          name = "Asus ROG Strix 15"
          stock = {true}
        />
        <Product
          imgUrl = "public\Products\AsusROGStrix15.6_5_1024x1024.webp"
          price = "1399"
          lastPrice = "1499"
          name = "Asus ROG Strix 15"
          stock = {true}
        />
        <Product
          imgUrl = "public\Products\lll.jpg"
          price = "1399"
          lastPrice = "1499"
          name = "Asus ROG Strix 15"
          stock = {false}
        />
    </div>
  )
}
