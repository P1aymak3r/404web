'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, setMonth } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// Type for calendar events
interface CalendarEvent {
  id: string
  title: string
  date: Date
  category: 'academic' | 'scholarship' | 'general' | 'event' | 'career'
}

// Event type symbols and categories
const EVENT_SYMBOLS = {
  academic: '★',
  scholarship: '♠️',
  general: '♣️',
  event: '♥️',
  career: '♦️'
}

const EVENT_CATEGORIES = {
  academic: '학사',
  scholarship: '장학',
  general: '일반',
  event: '행사',
  career: '취업'
}

export default function Component() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false)

  // Fetch events from Google Calendar
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Initialize the Google Calendar API client
        // Note: You'll need to set up Google Calendar API credentials
        // and handle authentication in your application
        
        // Mock events for demonstration
        const mockEvents: CalendarEvent[] = [
          {
            id: '1',
            title: '2025학년도 1학기 장학금 신청',
            date: new Date(2024, 10, 16),
            category: 'scholarship'
          },
          {
            id: '2',
            title: '학술 세미나',
            date: new Date(2024, 10, 20),
            category: 'academic'
          },
          {
            id: '3',
            title: '취업 박람회',
            date: new Date(2024, 10, 25),
            category: 'career'
          },
          // Add more mock events as needed
        ]
        setEvents(mockEvents)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }

    fetchEvents()
  }, [currentDate])

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  })

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), date))
  }

  const handleMonthSelect = (month: number) => {
    setCurrentDate(setMonth(currentDate, month))
    setIsMonthSelectorOpen(false)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold" style={{ color: '#003366' }}>서강 CALENDAR</h1>
            <Popover open={isMonthSelectorOpen} onOpenChange={setIsMonthSelectorOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="text-lg font-medium"
                  style={{ color: '#003366' }}
                >
                  {format(currentDate, 'yyyy년 M월', { locale: ko })} 
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 12 }, (_, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      onClick={() => handleMonthSelect(i)}
                    >
                      {format(setMonth(new Date(), i), 'MMM', { locale: ko })}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 mb-4">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div
              key={day}
              className="text-center font-medium"
              style={{ color: '#003366' }}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4">
          {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="h-20" />
          ))}

          {days.map((day, dayIdx) => {
            const dayEvents = getEventsForDate(day)
            const isSelected = isSameDay(day, selectedDate)
            const isCurrentMonth = isSameMonth(day, currentDate)

            return (
              <HoverCard key={day.toString()}>
                <HoverCardTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "h-20 w-full flex flex-col items-center justify-start p-2",
                      isSelected && "bg-[#003366] text-white",
                      !isCurrentMonth && "text-muted-foreground"
                    )}
                    onClick={() => setSelectedDate(day)}
                  >
                    <span className={cn(
                      "text-lg",
                      isSelected ? "text-white" : dayEvents.length > 0 ? "text-[#003366]" : "text-muted-foreground"
                    )}>
                      {format(day, 'd')}
                    </span>
                    {dayEvents.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {dayEvents.map((event) => (
                          <span key={event.id} className="text-sm">
                            {EVENT_SYMBOLS[event.category]}
                          </span>
                        ))}
                      </div>
                    )}
                  </Button>
                </HoverCardTrigger>
                {dayEvents.length > 0 && (
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      {dayEvents.map((event) => (
                        <div key={event.id} className="flex items-center gap-2">
                          <span>{EVENT_SYMBOLS[event.category]}</span>
                          <span>{event.title}</span>
                          <span className="text-xs text-muted-foreground">({EVENT_CATEGORIES[event.category]})</span>
                        </div>
                      ))}
                    </div>
                  </HoverCardContent>
                )}
              </HoverCard>
            )
          })}
        </div>

        {/* Selected date events panel */}
        {getEventsForDate(selectedDate).length > 0 && (
          <div className="mt-6 p-4 border rounded-lg">
            <h2 className="text-lg font-medium mb-2" style={{ color: '#003366' }}>
              {format(selectedDate, 'M월 d일 EEEE', { locale: ko })} 일정
            </h2>
            <div className="space-y-2">
              {getEventsForDate(selectedDate).map((event) => (
                <div key={event.id} className="flex items-center gap-2">
                  <span>{EVENT_SYMBOLS[event.category]}</span>
                  <span>{event.title}</span>
                  <span className="text-xs text-muted-foreground">({EVENT_CATEGORIES[event.category]})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
