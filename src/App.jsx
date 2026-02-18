import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import MainLayout from './layout/MainLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
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
import TrainingVideoPlayer from './pages/TrainingVideoPlayer';
import About from './pages/About';
import EmployeeLogin from './pages/EmployeeLogin';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import AddBankAccount from './pages/AddBankAccount';
import WithdrawalRequest from './pages/WithdrawalRequest';
import WithdrawalHistory from './pages/WithdrawalHistory';
import TransactionHistory from './pages/TransactionHistory';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UserHistory from './pages/UserHistory';
import Salary from './pages/Salary';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMe } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services" element={<Services />} />
          <Route path="/training" element={<Training />} />
          <Route path="/training/:appId/video/:videoId" element={<TrainingVideoPlayer />} />
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
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/add-bank" element={<AddBankAccount />} />
          <Route path="/wallet/withdraw" element={<WithdrawalRequest />} />
          <Route path="/wallet/history" element={<WithdrawalHistory />} />
          <Route path="/wallet/transactions" element={<TransactionHistory />} />
          <Route path="/history" element={<UserHistory />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
