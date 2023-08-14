import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Layout } from './components/layout/layout'
import { Auth } from './pages/auth'
import { Leaderboard } from './pages/leaderboard';
import { Realtime } from './pages/realtime';



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
          <Route path="/realtime" element={<Realtime />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<div>Home content or a Redirect</div>} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Layout>
    </Router>
  );
}

export default App;
