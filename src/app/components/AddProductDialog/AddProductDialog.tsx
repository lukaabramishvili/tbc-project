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

  return (
    <div>
      <button
        data-cy='add-product'
        onClick={() => setOpen(true)}
        className="border-none  w-40 rounded shadow-xl bg-gray-900 hover:bg-gray-500 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-800 dark:hover:text-white p-4 text-xl text-white cursor-pointer"
      >
        Add Product
      </button>

      {open && (
        <div className="sm:max-w-[580px] h-80 m-5 p-5 z-10 fixed top-0 right-96 bg-slate-200 rounded-2xl">
          <div
            className="absolute right-5 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Close
          </div>
          <div className="flex flex-col items-start justify-start">
            <h2>Add Product</h2>
            <p>Please type product details below</p>
          </div>
          {isLoading && <div>...isLoading</div>}

          <form onSubmit={createProduct}>
            <div className="grid gap-4 py-4 pr-10">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right" >
                  Name
                </label>
                <input 
                  id="name" 
                  name="name" 
                  className="col-span-3" 
                  data-cy="add-product-name" 
                  required 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="price" className="text-right" >
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  className="col-span-3"
                  required
                  data-cy="add-product-price"
                />
              </div>
              <div>
                <label htmlFor="file" className="text-right">
                  Upload Photo
                </label>
                <input
                  id="file"
                  type="file"
                  name="file"
                  className="col-span-3"
                  data-cy="add-product-img"
                  // required
                />
              </div>
            </div>

            <div className="flex flex-row items-center justify-center">
              <button
                type="submit"
                className="rounded-2xl bg-slate-400 w-40 h-10"
                data-cy="add-product-submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProductDialog;
