import { useLanguage } from "@/app/context/LanguageContext";
import React, { useState, FormEvent } from "react";

const AddPostDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    
    const response = await fetch("/api/createPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });

    setIsLoading(false);
    if (response.ok) {
      alert("Post Added");
      setOpen(false);
    } else {
      const errorData = await response.json();
      alert("Something went wrong: " + errorData.error);
    }
  };

  const { language } = useLanguage()

  return (
    <div>
      <button
        data-cy="add-product"
        onClick={() => setOpen(true)}
        className="border-none w-40 rounded shadow-xl bg-gray-900 hover:bg-gray-500 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-800 dark:hover:text-white p-4 text-xl text-white cursor-pointer"
      >
        {language === "eng" ? "Add Post" : "პოსტის დამატება"}
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
                {language === "eng" ? "Add Post" : "პოსტის დამატება"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {language === "eng" ? "Type your post below" : "დაწერე შენი პოსტი ქვემოთ"}
              </p>
            </div>
            {isLoading && (
              <div className="text-center text-gray-500 dark:text-gray-300">
                {language === "eng" ? "Loading..." : "იტვირთება..."}
              </div>
            )}

            <form onSubmit={createPost} className="space-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="title"
                  className="text-gray-700 dark:text-gray-300 font-medium"
                >
                  {language === "eng" ? "Title" : "სათაური" }
                </label>
                <input
                  id="title"
                  name="title"
                  className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  data-cy="add-product-name"
                  required
                />
              </div>
              <textarea
                required
                id="body"
                name="body"
                placeholder={language === "eng" ? "Type your post here" : "დაწერე შენი პოსტი აქ"}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 dark:bg-[#374151] dark:text-white"
                rows={5}
              ></textarea>
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
      )}
    </div>
  );
};

export default AddPostDialog;