'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import moment from 'moment-timezone';
import { usePathname } from 'next/navigation';;//이렇게 하는게 정녕 맞나??

//진 짜 개 못알아보겟으니까 100줄이상넘어가면 어케좀해라 코드꼬라지좀 이거 난독화인가요??? 

const CalendarApp: React.FC = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const id = usePathname();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarWidth, setCalendarWidth] = useState(0);


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

  const handleDayClick = (issue: any) => {
    console.log(issue.body);
    setSelectedDay(issue.body);
    setIsBottomSheetVisible(true);
  }

  useEffect(() => {
    console.log(selectedDay);
  }, [selectedDay]);

  const githubIssueList = async (id: String) => {
    try {
      const response = await fetch(`https://api.github.com/repos${id}/diary/issues`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred in the async function', error);
    }
  };


  useEffect(() => {
    githubIssueList(id);
  }, [id]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await githubIssueList(id);
        setIssues(data);
      } catch (error) {
        console.error('An error occurred while fetching issues', error);
      }
    };

    fetchIssues();
  }, [id]);

  useEffect(() => {
    if (calendarRef.current) {
      setCalendarWidth(calendarRef.current.offsetWidth);
    }
  }, []);


  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const blanks = Array(firstDay).fill(null);
    // Create a map of issues by date
    const issueMap = new Map();
    issues.forEach(issue => {
      const createdAt = moment(issue.created_at).tz('Asia/Seoul').format().split('T')[0];
      issueMap.set(createdAt, issue);
    });

    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = moment.tz([year, month, day], 'Asia/Seoul').format('YYYY-MM-DD'); //잘 이해가 안되네 그냥 Y-M-D로 concat하면 안되나? 왜 여기서 tz이 필요하지? 

      // Find the issue for the date from the map
      const issue = issueMap.get(date);

      return issue ? (
        <div
          className="text-center py-1 flex flex-col items-center justify-center"
          onClick={() => handleDayClick(issue)}
        >
          <span>{issue.title}</span>
          <div className="text-xs text-center">{day}</div>
        </div>
      ) : (
        <div
          className="text-center py-1 flex flex-col items-center justify-center"
          onClick={() => handleDayClick('empty!')}
        ><span style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}></span>
          <div className="text-xs text-center">{day}</div>
        </div>)
    });
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '0 20px' }} ref={calendarRef}>
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div style={{ fontSize: '10px', textAlign: 'center', padding: '5px 0' }} key={index}>
              <span>{day}</span>
            </div>
          ))}
        </div>
        <br />
        <div className="grid grid-cols-7 gap-2 text-center">
          {blanks.map((_, index) => (
            <div className="text-center py-1" key={`blank-${index}`}>
              <span></span>
            </div>
          ))}
          {days.map((day, index) => (
            <div
              key={index}
            >
              <span>{day}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen max-w-s mx-auto p-5">
      <div className="flex items-center justify-center h-1/5 overflow-auto text-center">은진이의 일기 (로고가 들어갈 곳)</div>
      <div className="h-3/5 overflow-auto">
        {renderCalendar()}
      </div>
      <div className="h-1/10 grid grid-cols-2 max-w-s mx-auto gap-2">
        <button className="py-2 text-center" onClick={handleSwipeRight}>이전 달</button>
        <button className="py-2 text-center" onClick={handleSwipeLeft}>다음 달</button>
      </div>
      <div className="h-1/10">
        <p className="text-center">{currentMonth.toLocaleDateString()}</p>
      </div>
      {isBottomSheetVisible && (
        <>
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsBottomSheetVisible(false)}></div>
          <div style={{ width: `${calendarWidth}px` }} className="fixed bottom-0 mx-auto left-0 right-0 h-64 bg-white p-4 rounded-t-lg shadow-lg">
            <button onClick={() => setIsBottomSheetVisible(false)}>Close</button>
            <p>{selectedDay}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarApp;
