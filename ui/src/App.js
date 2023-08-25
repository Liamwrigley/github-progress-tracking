import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from './components/layout/layout'
import { Auth } from './pages/auth'
import { Leaderboard } from './pages/leaderboard';
import { Realtime } from './pages/realtime';
import { Home } from './components/layout/home';


const queryClient = new QueryClient();

const links = [
  { displayName: 'Home', route: '/' },
  { displayName: 'Leaderboard', route: '/leaderboard' },
  { displayName: 'Realtime Events', route: '/realtime' }
]

function App() {

  console.log(process.env.REACT_APP_API_URL)
  return (
    <QueryClientProvider client={queryClient}>
      <Router className="scroll-smooth">
        <Layout links={links}>
          <Routes>
            <Route path="/realtime" element={<Realtime />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
