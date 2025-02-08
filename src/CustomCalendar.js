import React, { useState } from 'react';
import './CustomCalendar.css';

function CustomCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Get the start of the current week (Sunday)
  const getStartOfWeek = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Set to Sunday
    return startOfWeek;
  };

  // Get an array of 7 days starting from the start of the week
  const getWeekDays = (date) => {
    const startOfWeek = getStartOfWeek(date);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const daysOfWeek = getWeekDays(currentDate);

  // Function to handle day click
  const handleDayClick = (day) => {
    setSelectedDate(day);
    // Here you would typically make an API call to upload the selected date to a database.
    console.log("Date selected:", day);
    // Example: uploadToDatabase(day);
  };

  // Function to navigate to the next week
  const nextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  // Function to navigate to the previous week
  const prevWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevWeek}>{"<"}</button>
        <h3>{daysOfWeek[0].toLocaleString('default', { weekday: 'long' })} - {daysOfWeek[6].toLocaleString('default', { weekday: 'long' })}, {daysOfWeek[0].toLocaleDateString()}</h3>
        <button onClick={nextWeek}>{">"}</button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${selectedDate && day.toDateString() === selectedDate.toDateString() ? "selected" : ""}`}
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
