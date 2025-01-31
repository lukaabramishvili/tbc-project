"use client";

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

  const sortOptions: SortOption[] = sortType === "products"
    ? [
        { label: "Sort by:", value: "" },
        { label: "Price: Low to High", value: "price-asc" },
        { label: "Price: High to Low", value: "price-desc" },
        { label: "Name: A-Z", value: "title-asc" },
        { label: "Name: Z-A", value: "title-desc" },
      ]
    : [
        { label: "Sort by:", value: "" },
        { label: "Views: High to Low", value: "views-desc" },
        { label: "Views: Low to High", value: "views-asc" },
        { label: "Likes: High to Low", value: "likes-desc" },
        { label: "Likes: Low to High", value: "likes-asc" },
        { label: "Dislikes: High to Low", value: "dislikes-desc" },
        { label: "Dislikes: Low to High", value: "dislikes-asc" },
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
