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
      <div>
        <div>
          {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
            <span key={index}>{day}</span>
          ))}
        </div>
        <div>
          {blanks.map((_, index) => (
            <span key={`blank-${index}`} />
          ))}
          {days.map((day) => (
            <span key={day}>{day}</span>
          ))}
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
