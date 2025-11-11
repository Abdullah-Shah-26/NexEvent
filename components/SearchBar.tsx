"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/events?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("/events");
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search events by title, description, or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
