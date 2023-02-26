import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Create from './components/Create';
import Edit from './components/Edit';

function App() {
  return (
    <div className="App">
      <ToastContainer />
       <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
