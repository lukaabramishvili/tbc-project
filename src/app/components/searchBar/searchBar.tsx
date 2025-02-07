"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/app/hook/useDebounce";
import Search from "../../../../public/search.png";
import { useLanguage } from "@/app/context/LanguageContext";

interface SearchBarProps {
  searchType: string;
}

export default function SearchBar({ searchType }: SearchBarProps) {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const debouncedValue = useDebounce(searchTerm, 300);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedValue) params.set("search", debouncedValue);
    if (sortBy) params.set("sortBy", sortBy);
    router.push(`/${searchType}/?${params.toString()}`);
  }, [debouncedValue, router, searchType, sortBy]);

  const { language } = useLanguage()

  return (
    <div className="searchBar-container flex items-center gap-2">
      <img className="searchBar-icon w-8 h-8" src={Search.src} alt="search-icon" />
      <input
        className="searchBar-input p-4 my-4 w-80 rounded-xl bg-gray-300"
        type="text"
        value={searchTerm}
        placeholder={language === "eng" ? "Looking for something?" : "რამეს ეძებ?"}
        onChange={handleSearchChange}
      />
    </div>
  );
}
