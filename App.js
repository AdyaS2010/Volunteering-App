import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Opportunities from './components/Opportunities';
import LogHours from './components/LogHours';
import Progress from './components/Progress';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/opportunities" component={Opportunities} />
          <Route path="/log-hours" component={LogHours} />
          <Route path="/progress" component={Progress} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
