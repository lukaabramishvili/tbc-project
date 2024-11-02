'use client';

import { useRouter } from "next/navigation";
import './deleteButton.css';

const DeleteButton = ({ productId }) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Product deleted successfully");
        router.refresh(); 
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      className="delete-button"
      onClick={handleClick}
    >
      delete
    </button>
  );
};

export default DeleteButton;
