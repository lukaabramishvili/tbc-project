'use client'

import { useRouter } from "next/navigation";
import './editButton.css'

const EditButton = () => {
  const router = useRouter()

  const handleClick = () => {
    
  }

  return (
    <button
      className="edit-button"
      onClick={handleClick}
    >
      Edit
    </button>
  );
};

export default EditButton;
