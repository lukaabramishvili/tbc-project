import SearchBar from "../components/searchBar/searchBar";
import SortComponent from "../components/sort/sortComponent";
import "./index.css";
import Link from "next/link";
import NotFoundPage from "../NotFoundPage";
import EditButton from "../components/EditButton/editButton";
import DeleteButton from "../components/DeleteButton/deleteButton";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

interface SearchParams {
  search?: string;
  sortBy?: string;
}

interface Props {
  searchParams: SearchParams;
}

async function ProductFetch({ searchParams }: Props) {
  const searchTerm = searchParams.search || "";
  const sortOptions = searchParams.sortBy || "";
  const [sortOption, sortOrder] = sortOptions.split("-");

  let url = "https://dummyjson.com/products";
  if (searchTerm) {
    url = `https://dummyjson.com/products/search?q=${searchTerm}`;
  }
  if (sortOption) {
    url = `https://dummyjson.com/products?sortBy=${sortOption}&order=${sortOrder}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    const products: Product[] = data.products || [];

    return (
      <div className="product-page container">
        <h1>Our Products</h1>
        <div className="searchProduct">
          <SearchBar searchType={"products"} />
        </div>
        <div className="sortProducts">
          <SortComponent />
        </div>
        <div className="product-grid">
          {products.map((item) => (
            <div key={item.id} className="product-card">
              <div className="delete edit">
                <EditButton />
                <DeleteButton productId={item.id.toString()} />
              </div>
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
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data: ", error);
    return <NotFoundPage />;
  }
}

export default ProductFetch;
