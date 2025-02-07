import { useLanguage } from "@/app/context/LanguageContext";
import React, { useState, FormEvent, useEffect } from "react";

interface AddProductDialogProps {
  retriggerFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  retriggerFetch,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (window !== undefined) {
      if (document) {
        const inputElement = document.getElementById("price");
        if (inputElement) {
          const handleInput = (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target) {
              target.value = target.value.replace(/[^0-9]/g, "");
            }
          };
          inputElement.addEventListener("input", handleInput);
          return () => {
            inputElement.removeEventListener("input", handleInput);
          };
        }
      }
    }
  });

  const createProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/createProduct", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Product Added");
      retriggerFetch(true);
      setOpen(false);
      setIsLoading(false);
    } else {
      alert("Something went wrong");
    }
  };

  const { language } = useLanguage()

  return (
    <div>
      <button
        data-cy='add-product'
        onClick={() => setOpen(true)}
        className="border-none  w-40 rounded shadow-xl bg-gray-900 hover:bg-gray-500 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-800 dark:hover:text-white p-4 text-xl text-white cursor-pointer"
      >
        {language === "eng" ? "Add Product" : "პროდუქტის დამატება"}
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="w-full max-w-md sm:max-w-lg p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
              onClick={() => setOpen(false)}
            >
              ✖
            </button>
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {language === "eng" ? "Add Product" : "პროდუქტის დამატება"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {language === "eng" ? "Please type product details below" : "გთხოვთ, ჩაწერეთ პროდუქტის დეტალები ქვემოთ"}
              </p>
            </div>
            {isLoading && <div className="text-center text-gray-500 dark:text-gray-300">
              {language === "eng" ? "Loading..." : "იტვირთება..."}
            </div>}

            <form onSubmit={createProduct} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">
                  {language === "eng" ? "Name" : "სახელი" }
                </label>
                <input 
                  id="name" 
                  name="name" 
                  className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                  data-cy="add-product-name" 
                  required 
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="price" className="text-gray-700 dark:text-gray-300 font-medium">
                  {language === "eng" ? "Price" : "ფასი"}
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                  data-cy="add-product-price"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="file" className="text-gray-700 dark:text-gray-300 font-medium">
                  {language === "eng" ? "Upload Photo" : "ატვირთე ფოტო"}
                </label>
                <input
                  id="file"
                  type="file"
                  name="file"
                  className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  data-cy="add-product-img"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-40 h-10 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-2xl transition-all dark:bg-indigo-400 dark:hover:bg-indigo-500"
                  data-cy="add-product-submit"
                >
                  {language === "eng" ? "Add" : "დამატება"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}    </div>
  );
};

export default AddProductDialog;
