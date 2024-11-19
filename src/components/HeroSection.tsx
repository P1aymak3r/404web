"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Search } from "lucide-react";
import { backgroundVideos } from "@/lib/videos";
import SearchSuggestions from "./SearchSuggestions";

const relatedSearches = [
  "한림대학교 입학 정보",
  "한림대학교 캠퍼스 투어",
  "한림대학교 장학금 신청",
  "한림대학교 융합과학수사학과",
  "한림대학교 학사 일정",
];

const popularSearches = [
  "한림대학교 입학 정보",
  "한림대학교 캠퍼스 투어",
  "한림대학교 장학금 신청",
  "한림대학교 융합과학수사학과",
  "한림대학교 동아리 활동",
];

export default function HeroSection() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [relatedSearches, setRelatedSearches] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([
    "한림대학교 입학 정보",
    "한림대학교 캠퍼스 투어",
    "한림대학교 장학금 신청",
    "한림대학교 융합과학수사학과",
    "한림대학교 동아리 활동",
  ]);

  useEffect(() => {
    fetch("/suggestions.json")
      .then((res) => res.json())
      .then((data) => {
        setRelatedSearches(data);
      })
      .catch((error) => console.error("Error loading suggestions:", error));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Implement the logic for handling key down events
  };

  return (
    <div className="relative h-screen bg-[#001B3F] text-white">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={backgroundVideos[0].url} type="video/mp4" />
      </video>
      {isFocused && <div className="absolute inset-0 bg-black/50 z-10"></div>}
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center z-20">
        {!isFocused && (
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center transition-opacity duration-300">
            Welcome to Hallym University
          </h1>
        )}
        <div className="max-w-xl w-full flex flex-col items-center">
          <div className="w-full flex flex-col items-center transition-transform ease-in-out duration-500">
            <div className="w-full flex items-center">
              <Input
                type="search"
                placeholder="Search Hallym"
                className="bg-white/90 text-black pl-4 pr-12 w-full transition-all duration-300"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="ml-2.5">
                <Button
                  size="icon"
                  className="transition-transform ease-in-out duration-500"
                  onClick={() => {
                    console.log("검색어:", searchTerm);
                  }}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {isFocused && (
              <div className="w-full mt-2">
                <SearchSuggestions
                  relatedSearches={relatedSearches}
                  popularSearches={popularSearches}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setIsFocused={setIsFocused}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}