import React, {Suspense, lazy} from "react";
import { Switch, Route } from "react-router-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import './App.css';
import Routes from "./routes";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
