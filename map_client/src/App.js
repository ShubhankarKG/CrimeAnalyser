import "./App.css";
import Map from "./Components/Map";
import Dashboard from "./Components/dashboard/Dashboard";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

function App() {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/map" component={Map} />
          <Route path="/*" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
