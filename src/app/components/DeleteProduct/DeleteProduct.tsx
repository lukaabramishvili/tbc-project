import React, { useState } from "react";

interface DeleteProductProps {
  retriggerFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ retriggerFetch }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");

  const deleteProduct = async () => {
    if (!productId) {
      alert("Please provide a valid product ID.");
      return;
    }

    setIsLoading(true);

    const response = await fetch(`/api/deleteProduct`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productId }),
    });

    if (response.ok) {
      alert("Product Deleted Successfully");
      retriggerFetch(true);
      setOpen(false);
    } else {
      alert("Failed to delete product. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="border-none w-40 rounded shadow-xl bg-red-600 hover:bg-red-500 dark:bg-red-200 dark:text-black dark:hover:bg-red-800 dark:hover:text-white p-4 text-xl text-white cursor-pointer"
      >
        Delete Product
      </button>

      {open && (
        <div className="sm:max-w-[580px] h-60 m-5 p-5 fixed top-0 right-96 bg-slate-200 rounded-2xl">
          <div
            className="absolute right-5 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Close
          </div>

          <div className="flex flex-col items-start justify-start">
            <h2>Delete Product</h2>
            <p>Please enter the product ID to delete the product.</p>
          </div>

          {isLoading && <div>...isLoading</div>}

          <div className="grid gap-4 py-4 pr-10">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="productId" className="text-right">
                Product ID
              </label>
              <input
                id="productId"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center">
            <button
              onClick={deleteProduct}
              className="rounded-2xl bg-red-400 w-40 h-10"
              disabled={isLoading}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
