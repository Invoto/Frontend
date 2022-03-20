import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Routes,
  Route,
} from "react-router-dom";
import App from './App';

/* Importing Styles */

// Global CSS File
import "./assets/css/index.css"

// Material Design
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

/* End of Style Imports */

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" component={App} />
      </Routes>
    </Router>,
  </React.StrictMode>,
  document.getElementById('root')
);
