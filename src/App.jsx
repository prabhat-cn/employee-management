import React, {Suspense, lazy} from "react";
import { Switch, Route } from "react-router-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import './App.css';
import Routes from "./router";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
