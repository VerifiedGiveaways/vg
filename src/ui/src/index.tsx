import * as React from 'react';
import { render } from "react-dom";
import App from './components/app';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import HostDashboard from './components/host-dashboard';
import ParticipantDashboard from './components/participant-dashboard';
import Login from './components/login';
import Welcome from './components/welcome';

const rootElement = document.getElementById("app");
render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="host" element={<HostDashboard />} />
        <Route path="participant" element={<ParticipantDashboard />} />
      </Route>
    </Routes>
  </Router>,
  rootElement
);