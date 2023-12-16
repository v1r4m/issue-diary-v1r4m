'use client';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const CalendarApp: React.FC = () => {

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipeLeft(),
    onSwipedRight: () => handleSwipeRight(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handleSwipeLeft = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const handleSwipeRight = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div class="container mx-auto">
        <div class="max-w-md mx-auto">
          <div class="calendar">
            <div class="grid grid-cols-7">
              {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                <div class="text-center" key={index}>
                  <span>{day}</span>
                </div>
              ))}
            </div>
            <div class="grid grid-cols-7">
              {blanks.map((_, index) => (
                <div key={`blank-${index}`}>
                  <span></span>
                </div>
              ))}
              {days.map((day) => (
                <div class="text-center" key={day}>
                  <span>{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>캘린더 앱</h1>
      {renderCalendar()}
      <div>
        <p>{currentMonth.toLocaleDateString()}</p>
        <button onClick={handleSwipeLeft}>다음 달</button>
        <button onClick={handleSwipeRight}>이전 달</button>
      </div>
    </div>
  );
};

export default CalendarApp;
