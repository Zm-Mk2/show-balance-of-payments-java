import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom'

function App() {
  const style = {
    width: "50%",
    margin: "0 auto",
    marginTop: 150
  };
  
  return (
    <div className="App">
      <div style={style}>
        <Router>
        <Routes>
          <Route path="/incomedatas" element={<Main />} />
          <Route path="/" element={<Navigate to ="/incomedatas" />} />
          {/*<Route path="/*" element={<Page404 />} />*/}
        </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;