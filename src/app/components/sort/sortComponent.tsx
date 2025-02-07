"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useRouter, useSearchParams } from "next/navigation";

interface SortOption {
  label: string;
  value: string;
}

interface SortComponentProps {
  sortType: "posts" | "products";
}

const SortComponent = ({ sortType }: SortComponentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const { language } = useLanguage()
  
  const sortOptions: SortOption[] = sortType === "products"
  ? [
      { label: language === "eng" ? "Sort by:" : "სორტირება:", value: "" },
      { label: language === "eng" ? "Price: Low to High" : "ფასი: ზრდადობით", value: "price-asc" },
      { label: language === "eng" ? "Price: High to Low" : "ფასი: კლებადობით", value: "price-desc" },
      { label: language === "eng" ? "Name: A-Z" : "სახელი: A-დან Z-მდე", value: "title-asc" },
      { label: language === "eng" ? "Name: Z-A" : "სახელი: Z-დან A-მდე", value: "title-desc" },
    ]
  : [
      { label: language === "eng" ? "Sort by:" : "სორტირება:", value: "" },
      { label: language === "eng" ? "Views: High to Low" : "ნახვები: კლებადობით", value: "views-desc" },
      { label: language === "eng" ? "Views: Low to High" : "ნახვები: ზრდადობით", value: "views-asc" },
      { label: language === "eng" ? "Likes: High to Low" : "ლაიქები: კლებადობით", value: "likes-desc" },
      { label: language === "eng" ? "Likes: Low to High" : "ლაიქები: ზრდადობით", value: "likes-asc" },
      { label: language === "eng" ? "Dislikes: High to Low" : "დისლაიქები: კლებადობით", value: "dislikes-desc" },
      { label: language === "eng" ? "Dislikes: Low to High" : "დისლაიქები: ზრდადობით", value: "dislikes-asc" },
    ];

  const handleSort = (selectedSortValue: string) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedSortValue) params.set("sortBy", selectedSortValue);
    router.push(`/${sortType}/?${params.toString()}`);
  };

  return (
    <select
      className="select m-6 py-2 px-4 border-none rounded-lg"
      name="sort"
      onChange={(e) => handleSort(e.target.value)}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SortComponent;
