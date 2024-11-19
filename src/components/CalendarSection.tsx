"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Event = {
  date: string;
  title: string;
  type: "academic" | "student";
};

const events: Event[] = [
  { date: "2024-11-20", title: "동아리 공연", type: "student" },
  { date: "2024-11-25", title: "학생회 총회", type: "student" },
  { date: "2024-11-30", title: "기말고사", type: "academic" },
];

const daysInKorean = ["일", "월", "화", "수", "목", "금", "토"];

function getDaysInMonth(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];

  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push({ date: null });
  }
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({ date: new Date(year, month, i) });
  }
  while (days.length < 42) {
    days.push({ date: null });
  }
  return days;
}

interface CalendarSectionProps {
  className?: string;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ className }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getDaysInMonth(year, month);

  const eventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateString = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === dateString);
  };

  return (
    <div className={`calendar-section ${className}`}>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">캘린더</h2>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setCurrentDate(new Date(year, month - 1, 1))
                }
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setCurrentDate(new Date(year, month + 1, 1))
                }
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {daysInKorean.map((day, index) => (
              <div key={index} className="font-medium">
                {day}
              </div>
            ))}
            {days.map((day, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  day.date ? "hover:bg-gray-200 cursor-pointer" : "opacity-50"
                }`}
                onClick={() => setSelectedDate(day.date)}
              >
                {day.date?.getDate() || ""}
              </div>
            ))}
          </div>
          {selectedDate && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">
                Events on {selectedDate.toLocaleDateString()}
              </h3>
              {eventsForDate(selectedDate).length > 0 ? (
                eventsForDate(selectedDate).map((event, index) => (
                  <p key={index}>{event.title}</p>
                ))
              ) : (
                <p>No events for this day.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CalendarSection;
