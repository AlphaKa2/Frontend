import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/blog-service/LoginPage';
import SignupPage from './pages/blog-service/SignupPage';
import ForgotPasswordPage from './pages/blog-service/ForgotPasswordPage';
import ChangePasswordPage from './pages/blog-service/ChangePasswordPage';
import ProfileEditPage from './pages/blog-service/ProfileEditPage';
import FollowingPage from './pages/blog-service/FollowingPage';
import FollowersPage from './pages/blog-service/FollowersPage';
import ReportPage from './pages/blog-service/ReportPage';
import MbtiTestPage from './pages/blog-service/MbtiTestPage';
import "./index.css"; // Tailwind가 포함된 CSS 파일을 import
import './App.css';

function App() {
  return (
    <div className="App">
<Router>
<Routes>
  <Route path="/" element={<MainPage />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
  <Route path="/change-password" element={<ChangePasswordPage />} />
  <Route path="/profile/edit" element={<ProfileEditPage />} />
  <Route path="/following" element={<FollowingPage />} />
  <Route path="/followers" element={<FollowersPage />} />
  <Route path="/report" element={<ReportPage />} />
  <Route path="/mbti-test" element={<MbtiTestPage />} />
</Routes>
</Router>
</div>
  );
}

export default App;
