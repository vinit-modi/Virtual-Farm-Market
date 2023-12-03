import React, { useState } from "react";
import { createContext } from "react";

export const SearchInputContexts = createContext();

function SearchInputContext({ children }) {
  const [searchInput, setSearchInput] = useState("");
  return (
    <>
      <SearchInputContexts.Provider value={{ searchInput, setSearchInput }}>
        {children}
      </SearchInputContexts.Provider>
    </>
  );
}

export default SearchInputContext;
