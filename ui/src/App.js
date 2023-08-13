import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Layout } from './pages/layout'
import { Auth } from './pages/auth'



const links = [
  { displayName: 'Home', route: '/' },
  { displayName: 'Leaderboard', route: '/leaderboard' },
  { displayName: 'Realtime Events', route: '/realtime' }
]

function App() {
  console.log(process.env.REACT_APP_API_URL)
  return (
    <Router className="scroll-smooth">
      <Layout links={links}>
        <Routes>
          <Route path="/realtime" element={<h1>Realtime</h1>} />
          <Route path="/leaderboard" element={<h1>Leaderboard</h1>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<div>Home content or a Redirect</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;