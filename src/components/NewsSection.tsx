"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type NewsItem = {
  title: string;
  excerpt: string;
  link: string;
  image?: string;
};

const newsItems: NewsItem[] = [
  {
    title: "Hallym University Launches New AI Research Center",
    excerpt: "The state-of-the-art facility aims to drive innovation in artificial intelligence and machine learning...",
    link: "#",
    image: "/placeholder.svg",
  },
  {
    title: "Hallym Students Win International Debate Competition",
    excerpt: "A team of Hallym University students secured first place in the Global Debate Challenge...",
    link: "#",
    image: "/placeholder.svg",
  },
  {
    title: "New Scholarship Program Announced for STEM Students",
    excerpt: "Hallym University introduces a comprehensive scholarship program to support students in STEM...",
    link: "#",
    image: "/placeholder.svg",
  },
];

interface NewsSectionProps {
  className?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ className }) => {
  return (
    <div className={`news-section ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((news, index) => (
            <div
              key={index}
              className="bg-white shadow-sm rounded-lg overflow-hidden"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{news.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {news.excerpt}
                </p>
                <Link
                  href={news.link}
                  className="text-blue-600 hover:underline text-sm inline-flex items-center mt-2"
                >
                  Read more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
