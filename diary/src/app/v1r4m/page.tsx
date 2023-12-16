'use client';
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

const CalendarApp: React.FC = () => {
  const [issues, setIssues] = useState<any[]>([]);
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

  

  const githubIssueList = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/v1r4m/diary/issues');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred in the async function', error);
    }
  };
  

  useEffect(() => {
    githubIssueList();
  }, []);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await githubIssueList();
        setIssues(data);
      } catch (error) {
        console.error('An error occurred while fetching issues', error);
      }
    };
  
    fetchIssues();
  }, []);
  

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(year, month, day).toISOString().split('T')[0];
      const issue = issues.find(issue => issue.created_at.startsWith(date));
      return issue ? issue.title : day;
    });
    return (
      <div style={{ maxWidth: '375px', margin: '0 auto', padding: '0 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div style={{ textAlign: 'center', padding: '10px 0' }} key={index}>
            <span>{day}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
        {blanks.map((_, index) => (
          <div style={{ textAlign: 'center', padding: '10px 0' }} key={`blank-${index}`}>
            <span></span>
          </div>
        ))}
        {days.map((day) => (
          <div style={{ textAlign: 'center', padding: '10px 0' }} key={day}>
            <span>{day}</span>
          </div>
        ))}
      </div>
    </div>
    );
  };

  return (
<div className="flex flex-col h-screen max-w-xs mx-auto p-5">
<div className="flex items-center justify-center h-1/5 overflow-auto text-center">은진이의 일기 (로고가 들어갈 곳)</div>
  <div className="h-3/5 overflow-auto">
    {renderCalendar()}
  </div>
  <div className="h-1/10 grid grid-cols-2 gap-2">
    <button className="py-2 text-center" onClick={handleSwipeRight}>이전 달</button>
    <button className="py-2 text-center" onClick={handleSwipeLeft}>다음 달</button>
  </div>
  <div className="h-1/10">
    <p className="text-center">{currentMonth.toLocaleDateString()}</p>
  </div>
</div>
  );
};

export default CalendarApp;
