import React, { useState } from 'react';
import Calendar from 'react-calendar';

function RightSideCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div
      className="fixed top-23 right-10 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-3"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Calendar</h2>
      <Calendar
        onChange={onChange}
        value={date}
      />
      <p className="mt-4 text-sm text-gray-600">
        Selected date: <span className="font-medium text-gray-800">{date.toDateString()}</span>
      </p>
    </div>
  );
}

export default RightSideCalendar;