'use client';
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

const CalendarApp: React.FC = () => {
  const [issues, setIssues] = useState([]);
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
      const response = await fetch('https://api.github.com/repos/v1r4m/diary/issues/1');
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
      const data = await githubIssueList();
      setIssues(data);
    };
  
    fetchIssues();
  }, []);

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const blanks = Array(firstDay).fill(null);
    const issues = 
    [
      {
        "url": "https://api.github.com/repos/v1r4m/diary/issues/1",
        "repository_url": "https://api.github.com/repos/v1r4m/diary",
        "labels_url": "https://api.github.com/repos/v1r4m/diary/issues/1/labels{/name}",
        "comments_url": "https://api.github.com/repos/v1r4m/diary/issues/1/comments",
        "events_url": "https://api.github.com/repos/v1r4m/diary/issues/1/events",
        "html_url": "https://github.com/v1r4m/diary/issues/1",
        "id": 2044699294,
        "node_id": "I_kwDOK2b_6c5536Ke",
        "number": 1,
        "title": "💛",
        "user": {
          "login": "v1r4m",
          "id": 26866063,
          "node_id": "MDQ6VXNlcjI2ODY2MDYz",
          "avatar_url": "https://avatars.githubusercontent.com/u/26866063?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/v1r4m",
          "html_url": "https://github.com/v1r4m",
          "followers_url": "https://api.github.com/users/v1r4m/followers",
          "following_url": "https://api.github.com/users/v1r4m/following{/other_user}",
          "gists_url": "https://api.github.com/users/v1r4m/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/v1r4m/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/v1r4m/subscriptions",
          "organizations_url": "https://api.github.com/users/v1r4m/orgs",
          "repos_url": "https://api.github.com/users/v1r4m/repos",
          "events_url": "https://api.github.com/users/v1r4m/events{/privacy}",
          "received_events_url": "https://api.github.com/users/v1r4m/received_events",
          "type": "User",
          "site_admin": false
        },
        "labels": [
    
        ],
        "state": "open",
        "locked": false,
        "assignee": null,
        "assignees": [
    
        ],
        "milestone": null,
        "comments": 0,
        "created_at": "2023-12-16T10:31:48Z",
        "updated_at": "2023-12-16T10:31:48Z",
        "closed_at": null,
        "author_association": "OWNER",
        "active_lock_reason": null,
        "body": "# 이것은 오늘의 일기!\r\n2023년 12월 16일... 이 일기는 마크다운을 지원합니다!\r\n\r\n - 여러 리스트를 만들 수 있고요\r\n - 이모티콘도 넣을 수 있지요💁🏻\r\n - 링크도 [첨부](https://chat.openai.com/)할 수 있지롱~\r\n - 마지막으로 이미지를 넣어볼게요!\r\n<img width=\"287\" alt=\"image\" src=\"https://github.com/v1r4m/diary/assets/26866063/18e7521f-c14e-421e-922a-f8e729a14b0d\">\r\n",
        "reactions": {
          "url": "https://api.github.com/repos/v1r4m/diary/issues/1/reactions",
          "total_count": 0,
          "+1": 0,
          "-1": 0,
          "laugh": 0,
          "hooray": 0,
          "confused": 0,
          "heart": 0,
          "rocket": 0,
          "eyes": 0
        },
        "timeline_url": "https://api.github.com/repos/v1r4m/diary/issues/1/timeline",
        "performed_via_github_app": null,
        "state_reason": null
      }
    ];
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
