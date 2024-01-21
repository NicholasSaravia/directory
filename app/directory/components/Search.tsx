"use client";
import { searchString } from "@/utils/signals/data";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { throttle } from "lodash";
export const Search = () => {
  useSignals();
  const searchBar = useSignal("");
  const setSearchString = (search: string) => {
    searchString.value = search.trim().toLowerCase();
  };
  const debouncedSearch = throttle(setSearchString, 250);

  return (
    <input
      id="search-bar"
      type="search"
      placeholder="Search"
      onChange={(e) => {
        searchBar.value = e.target.value;
        debouncedSearch(e.target.value);
      }}
      value={searchBar.value || searchString.value}
      className="w-full self-center px-4 py-2 rounded-full mx-auto max-w-[500px]"
    />
  );
};
