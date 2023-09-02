import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from './components/layout/layout'
import { AuthSetup } from './pages/authSetup'
import { Leaderboard } from './pages/leaderboard';
import { Realtime } from './pages/realtime';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { Logout } from './pages/logout';


const queryClient = new QueryClient();

const links = [
  { displayName: 'Home', route: '/' },
  { displayName: 'Leaderboard', route: '/leaderboard' },
  { displayName: 'Realtime Events', route: '/realtime' }
]

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router className="scroll-smooth">
        <Layout links={links}>
          <Routes>
            <Route path="/realtime" element={<Realtime />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/auth" >
              <Route path='setup' element={<AuthSetup />} />
              <Route path='login' element={<Login />} />
              <Route path='logout' element={<Logout />} />
            </Route>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;