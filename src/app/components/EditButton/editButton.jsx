'use client'

import { useRouter } from "next/navigation";
import './editButton.css'

const EditButton = () => {
  const router = useRouter()

  return (
    <button
      className="edit-button"
    >
      Edit
    </button>
  );
};

export default EditButton;
