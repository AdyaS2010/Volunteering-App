// Main app component
const App = () => {
  const [volunteerOpportunities, setVolunteerOpportunities] = useState([]);
  const [volunteerHours, setVolunteerHours] = useState(0);

  // Fetch volunteer opportunities from API or database
  useEffect(() => {
    fetch('/api/volunteer-opportunities')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setVolunteerOpportunities(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Handling volunteer hours
  const handleHours = (event) => {
    setVolunteerHours(event.target.value);
  };

  // Log hours
  const logHours = () => {
    const totalHoursElement = document.getElementById('total-hours');
    totalHoursElement.textContent = volunteerHours;
  };

  return (
    <div>
      <h1>VolunteerHub</h1>
      <h2>Available Opportunities</h2>
      <ul>
        {volunteerOpportunities.map((opportunity, index) => (
          <li key={index}>{opportunity.name}</li>
        ))}
      </ul>
      <div>
        <label htmlFor="hours">Enter Volunteer Hours:</label>
        <input
          type="number"
          id="hours"
          value={volunteerHours}
          onChange={handleHours}
          aria-label="Enter Volunteer Hours"
        />
        <button onClick={logHours}>Log Hours</button>
      </div>
      <p id="total-hours">Total Hours: {volunteerHours}</p>
    </div>
  );
};

// Render app component(s) to DOM
ReactDOM.render(<App />, document.getElementById('root'));
