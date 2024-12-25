import React, { useState, FormEvent } from "react";

interface AddProductDialogProps {
  retriggerFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  retriggerFetch,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/createProduct", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      retriggerFetch(true);
      setOpen(false);
      setIsLoading(false);
    }
    console.log(response);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="border w-40 rounded shadow-lg bg-slate-400 hover:bg-slate-300"
      >
        Add Product
      </button>

      {open && (
        <div className="sm:max-w-[580px] h-80 m-5 p-5 fixed top-0 right-96 bg-slate-200 rounded-2xl">
          <div className="absolute right-5" onClick={() => setOpen(false)}>
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
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <input id="name" name="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="price" className="text-right">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  className="col-span-3"
                  required
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
                  required
                />
              </div>
            </div>

            <div className="flex flex-row items-center justify-center">
              <button
                type="submit"
                className="rounded-2xl bg-slate-400 w-40 h-10"
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
