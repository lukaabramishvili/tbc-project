import ReturnButton from "../../components/ReturnButton/returnButton";
import NotFoundPage from "../../NotFoundPage";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

interface Params {
  id: string;
}

export const getProduct = async (id: string): Promise<Product | null> => {
  console.log("Product ID:", id); 
  try {
    const res = await fetch(`/api/fetchProductById/${id}`);
    if (!res.ok) {
      return null;
    }
    const { data } = await res.json();
    return data.length > 0 ? data[0] : null; 
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};


interface Params {
  id: string;
}

export default async function ProductDetail({ params }: { params: Params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div className="product-card detailed-product_page">
      <div className="product-info detailed-product_info">
        <h1>{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: ${product.price}</p>
      </div>
      <img
        src={product.images[0]}
        alt={product.title}
        className="product-image detailed-product_image"
      />
      <div className="return-back">
        <ReturnButton />
      </div>
    </div>
  );
}
