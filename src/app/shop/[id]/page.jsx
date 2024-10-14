import "../index.css";
import ReturnButton from "../../components/ReturnButton/returnButton";
import { Suspense } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import NotFoundPage from "../../notFound";
import Product from "../../components/Product/page";

const getProduct = async (id) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
};

export async function generateStaticParams() {
  try {
    const productsData = await fetch("https://dummyjson.com/products");
    const { products } = await productsData.json();

    return products.map((product) => ({
      params: { id: product.id.toString() },
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return []; // Return an empty array on error
  }
}

export default async function ProductDetail({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Product
        key={product.id}
        imgUrl={product.images[0]}
        price={product.price}
        lastPrice={Math.round(product.price * 1.2)} // Increased price calculation
        title={product.title}
        description={product.description}
      />
      <div className="return-back">
        <ReturnButton />
      </div>
    </Suspense>
  );
}
