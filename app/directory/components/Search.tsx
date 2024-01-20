"use client";
import { searchString } from "@/utils/signals/data";
import { debounce } from "lodash";
export const Search = () => {
  const setSearchString = (search: string) => {
    searchString.value = search.trim().toLowerCase();
  };
  const debouncedSearch = debounce(setSearchString, 500);

  return (
    <input
      id="search-bar"
      type="search"
      placeholder="Search"
      onChange={(e) => debouncedSearch(e.target.value)}
      className="w-full self-center px-4 py-2 rounded-full mx-auto max-w-[500px]"
    />
  );
};
