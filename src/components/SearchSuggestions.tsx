import React, { useState, useEffect } from "react";

interface SearchSuggestionsProps {
  relatedSearches: string[];
  popularSearches: string[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setIsFocused: (focused: boolean) => void;
}

const getChosung = (str: string) => {
  const CHOSUNG_LIST = [
    "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
  ];
  const BASE_CODE = 44032;
  const CHOSUNG_INTERVAL = 588;

  let result = "";
  for (let char of str) {
    const charCode = char.charCodeAt(0) - BASE_CODE;
    if (charCode >= 0 && charCode <= 11171) {
      const chosungIndex = Math.floor(charCode / CHOSUNG_INTERVAL);
      result += CHOSUNG_LIST[chosungIndex];
    } else {
      result += char;
    }
  }
  return result;
};

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  relatedSearches,
  popularSearches,
  searchTerm,
  setSearchTerm,
  setIsFocused,
}) => {
  const [filteredSearches, setFilteredSearches] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredSearches(popularSearches);
    } else {
      const startsWithQuery = relatedSearches.filter((term) =>
        term.toLowerCase().startsWith(searchTerm.toLowerCase())
      );

      const queryChosung = getChosung(searchTerm);
      const startsWithChosung = relatedSearches.filter((term) =>
        getChosung(term).startsWith(queryChosung) &&
        !startsWithQuery.includes(term)
      );

      const includesQuery = relatedSearches.filter((term) =>
        term.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !startsWithQuery.includes(term) &&
        !startsWithChosung.includes(term)
      );

      const combinedResults = [
        ...startsWithQuery,
        ...startsWithChosung,
        ...includesQuery,
      ].slice(0, 5);

      setFilteredSearches(combinedResults);
    }
  }, [searchTerm, relatedSearches, popularSearches]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex < filteredSearches.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredSearches.length - 1
      );
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      const selectedTerm = filteredSearches[activeSuggestionIndex];
      setSearchTerm(selectedTerm);
      setIsFocused(false);
      window.location.href = `/search?query=${encodeURIComponent(selectedTerm)}`;
    }
  };

  return (
    <div
      className="flex-1 bg-white border border-blue-500 border-t-0 rounded-b-lg shadow-lg p-2 max-h-[350px] overflow-auto transition-all duration-500"
      onKeyDown={handleKeyDown}
    >
      <h4 className="text-lg font-semibold mb-2 text-black">
        {searchTerm ? "연관 검색어" : "인기 검색어"}
      </h4>
      <ul className="space-y-[5px]">
        {filteredSearches.map((term, index) => (
          <li
            key={index}
            className={`text-black py-1 cursor-pointer hover:bg-gray-200 rounded ${
              index === activeSuggestionIndex ? "bg-gray-300" : ""
            }`}
            onClick={() => {
              setSearchTerm(term);
              setIsFocused(false);
            }}
          >
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSuggestions; 