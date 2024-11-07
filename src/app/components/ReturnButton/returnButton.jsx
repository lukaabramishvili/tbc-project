'use client'

import { useRouter } from "next/navigation";

const ReturnButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="py-4 px-5 mt-6 font-bold cursor-pointer bg-white border-none rounded-md hover:bg-gray-700 hover:text-white dark:bg-gray-900 dark:text-white dark:hover:bg-white dark:hover:text-gray-900 "
    >
      Return
    </button>
  );
};

export default ReturnButton;
