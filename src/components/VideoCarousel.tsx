"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Video = {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
};

interface VideoCarouselProps {
  videos: Video[];
}

export default function VideoCarousel() {
  const videos = [
    {
      id: 1,
      title: "영상 1",
      embedUrl: "https://www.youtube.com/embed/yGnIEWGyMRQ",
    },
    {
      id: 2,
      title: "영상 2",
      embedUrl: "https://www.youtube.com/embed/jZ_FB_pfz1o",
    },
    {
      id: 3,
      title: "영상 3",
      embedUrl: "https://www.youtube.com/embed/9fCuonLZYx4",
    },
  ];

  const [currentVideo, setCurrentVideo] = useState(0);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={videos[currentVideo].embedUrl}
        title={videos[currentVideo].title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="object-cover w-full h-full"
      ></iframe>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
        {videos.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentVideo ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentVideo(index)}
            aria-label={`영상 ${index + 1}로 이동`}
          />
        ))}
      </div>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all"
        onClick={prevVideo}
        aria-label="이전 영상으로 이동"
      >
        <ChevronLeft className="h-6 w-6 text-gray-700" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all"
        onClick={nextVideo}
        aria-label="다음 영상으로 이동"
      >
        <ChevronRight className="h-6 w-6 text-gray-700" />
      </button>
    </div>
  );
}
