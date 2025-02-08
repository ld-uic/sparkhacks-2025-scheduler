import React, { useState } from 'react';
import './CustomCalendar.css';

function CustomCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Get the first day of the current month
  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
  };

  // Get the last day of the current month
  const getLastDayOfMonth = (date) => {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay;
  };

  // Get the days of the current month in a 6x7 grid (42 cells)
  const getMonthDays = (date) => {
    const firstDay = getFirstDayOfMonth(date);
    const lastDay = getLastDayOfMonth(date);

    // Start from the Sunday before the first day of the month
    const startDay = new Date(firstDay);
    startDay.setDate(firstDay.getDate() - firstDay.getDay());

    // Create an array for all the days (including overflow from previous and next month)
    const days = [];
    for (let i = 0; i < 42; i++) { // 6 rows * 7 columns = 42 days
      const day = new Date(startDay);
      day.setDate(startDay.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const daysOfMonth = getMonthDays(currentDate);

  // Function to handle day click
  const handleDayClick = (day) => {
    setSelectedDate(day); // Set the clicked date as selected
  };

  // Function to navigate to the next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  // Function to navigate to the previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>{"<"}</button>
        <h3>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h3>
        <button onClick={nextMonth}>{">"}</button>
      </div>
      <div className="calendar-grid">
        {/* Create the 7 days of the week header */}
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="calendar-day-header">{day}</div>
          ))}
        </div>
        {/* Create the 6x7 grid for the month */}
        {daysOfMonth.map((day, index) => (
          <div
            key={index}
            className={`calendar-day 
              ${selectedDate && day.toDateString() === selectedDate.toDateString() ? "selected" : ""} 
              ${day.getMonth() !== currentDate.getMonth() ? "not-current-month" : ""}
              `}
            onClick={() => handleDayClick(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
      {selectedDate && <p>Selected Date: {selectedDate.toDateString()}</p>}
    </div>
  );
}

export default CustomCalendar;