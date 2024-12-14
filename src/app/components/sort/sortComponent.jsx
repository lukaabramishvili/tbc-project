"use client";
 
import { useRouter } from "next/navigation";
import "./sortComponent.css";
 
const SortComponent = () => {
  const sortOptions = [
    {label: "sort by:", value:""},
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Name: A-Z", value: "title-asc" },
    { label: "Name: Z-A", value: "title-desc" },
  ];
 
  const router = useRouter();

 
  const handlerSort = (selectedSortValue) => {
    router.push(`/products/?sortBy=${selectedSortValue}`);
  };
 
  return (
    <>
      <select
        className="select"
        name="sort"
        onChange={(e) => handlerSort(e.target.value)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
 
export default SortComponent;