import React from "react";

interface RelatedSearchesProps {
  relatedSearches: string[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setIsFocused: (focused: boolean) => void;
}

const RelatedSearches: React.FC<RelatedSearchesProps> = ({
  relatedSearches,
  searchTerm,
  setSearchTerm,
  setIsFocused,
}) => {
  const filteredSearches = relatedSearches
    .filter((term) =>
      term.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div className="w-full bg-white border border-blue-500 border-t-0 rounded-b-lg shadow-lg p-2 max-h-[350px] overflow-auto transition-all duration-500">
      <h4 className="text-lg font-semibold mb-2 text-black">연관 검색어</h4>
      <ul className="space-y-[5px]">
        {filteredSearches.map((term, index) => (
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

export default RelatedSearches;
