import React from 'react';
import "./Assigment3.css"

const ProductDetails = () => {
  const obj = {
    id: '10002',
    name: 'Eco-Friendly Water Bottle',
    description: 'Stay hydrated with our durable, eco-friendly water bottle.',
    price: 14.99,
    currency: 'USD',
    imageURL: 'https://example.com/images/product-10002.jpg',
  };

  const list = Object.entries(obj).reduce((acc, [key, value], index) => {
    acc.push(
      <tr key={key}>
        <td>{index}</td>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    );
    return acc;
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;
