"use client";

import { useEffect, useState } from "react";
import "./searchBar.css";
import { useRouter } from "next/navigation";
import Search from "../../../../public/search.png";
import { useDebounce } from "@/app/hook/useDebounce";

interface SearchBarProps {
  searchType: string;
}

export default function SearchBar({ searchType }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 300);
  const router = useRouter();

  useEffect(() => {
    if (debouncedValue) {
      router.push(`/${searchType}/?search=${debouncedValue}`);
    } else {
      router.push(`/${searchType}`);
    }
  }, [debouncedValue, router]);

  return (
    <>
      <div className="searchBar-container container">
        <img className="searchBar-icon" src={Search.src} alt="search-icon" />
        <input
          className="searchBar-input"
          type="text"
          value={searchTerm}
          placeholder="looking for something ?"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
    </>
  );
}
