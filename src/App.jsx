import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import ApplyForHosting from './pages/ApplyForHosting';
import ApplyForEvent from './pages/ApplyForEvent';
import ApplyForAgency from './pages/ApplyForAgency';
import TopUpUser from './pages/TopUpUser';
import ApplyForUser from './pages/ApplyForUser';
import ApplyForInfluencer from './pages/ApplyForInfluencer';
import InviteAndEarn from './pages/InviteAndEarn';
import FeedbackIssues from './pages/FeedbackIssues';
import Training from './pages/Training';
import About from './pages/About';
import EmployeeLogin from './pages/EmployeeLogin';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services" element={<Services />} />
          <Route path="/training" element={<Training />} />
          <Route path="/apply-hosting" element={<ApplyForHosting />} />
          <Route path="/apply-event" element={<ApplyForEvent />} />
          <Route path="/apply-agency" element={<ApplyForAgency />} />
          <Route path="/topup" element={<TopUpUser />} />
          <Route path="/apply-user" element={<ApplyForUser />} />
          <Route path="/apply-influencer" element={<ApplyForInfluencer />} />
          <Route path="/invite" element={<InviteAndEarn />} />
          <Route path="/feedback" element={<FeedbackIssues />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
