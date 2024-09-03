import React, { useState } from 'react';

function LogHours() {
  const [hours, setHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to log hours
    console.log(`Logged ${hours} hours`);
  };

  return (
    <div>
      <h1>Log Volunteer Hours</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Enter hours"
        />
        <button type="submit">Log Hours</button>
      </form>
    </div>
  );
}

export default LogHours;
