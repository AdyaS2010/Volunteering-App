import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    axios.get('/api/opportunities')
      .then(response => setOpportunities(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Volunteer Opportunities</h1>
      <ul>
        {opportunities.map(opportunity => (
          <li key={opportunity.id}>{opportunity.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Opportunities;
