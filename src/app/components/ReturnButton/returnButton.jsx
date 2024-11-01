'use client'

import { useRouter } from "next/navigation";
import './returnButton.css'

const ReturnButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="return-button"
    >
      Return
    </button>
  );
};

export default ReturnButton;
