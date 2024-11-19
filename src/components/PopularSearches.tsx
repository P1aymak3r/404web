// src/components/PopularSearches.tsx
import React from "react";

interface PopularSearchesProps {
  popularSearches: string[];
  setSearchTerm: (term: string) => void;
  setIsFocused: (focused: boolean) => void;
}

const PopularSearches: React.FC<PopularSearchesProps> = ({
  popularSearches,
  setSearchTerm,
  setIsFocused,
}) => {
  return (
    <div className="max-w-xl w-full bg-white border border-blue-500 border-t-0 rounded-b-lg shadow-lg p-2 max-h-[350px] overflow-auto transition-all duration-500">
      <h4 className="text-lg font-semibold mb-2 text-black">인기 검색어</h4>
      <ul className="space-y-[5px]">
        {popularSearches.slice(0, 5).map((term, index) => (
          <li
            key={index}
            className="text-black py-1 cursor-pointer hover:bg-gray-200 rounded"
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

export default PopularSearches;