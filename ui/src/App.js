import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Layout } from './pages/layout'


import './App.css';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/realtime" element={<h1>Realtime</h1>} />
          <Route path="/leaderboard" element={<h1>Leaderboard</h1>} />
          <Route path="/auth/:type" element={
            <>
              <h1>Auth</h1>
              <a href="http://localhost:4001/auth/discord">start discord</a>
            </>
          } />
          <Route path="/" element={<div>Home content or a Redirect</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
