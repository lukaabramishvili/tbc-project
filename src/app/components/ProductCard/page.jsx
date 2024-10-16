import React from 'react'
import "./index.css"
import Link from 'next/link';

export default function Product(props) {
    let stock;
    let stockColor;

    if (props.stock === true) {
        stock = "მარაგშია";
        stockColor = "green"
    }else{
        stock = "არ არის მარაგში"
        stockColor = "red"
    }

  return (
    <div className='productConteiner' key={props.key}>
        <Link href={`/products/${props.id}`}>
        <div className={`stock ${stockColor}`}>{stock}</div>
        <div className="productImage">
            <img src={props.imgUrl} alt='productImage' />
        </div>
        <div className="productDescription">
            <div className="profuctPrice">
                <h1>{props.price}$</h1>
                <h2>{props.lastPrice}$</h2>
            </div>
            <div className="productName">
                <p>{props.name}</p>
            </div>
            <div className="ProductAddToCart">
                <button>
                    <h3>Add to cart</h3>
                </button>
            </div>
        </div>
        </Link>
    </div>
  )
}
