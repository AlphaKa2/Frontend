import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil'; // RecoilRoot 가져오기
import MainPage from './pages/MainPage';
import CreatePlan1 from './pages/ai-service/CreatePlan1'; // CreatePlan1 컴포넌트 import
import CreatePlan2 from './pages/ai-service/CreatePlan2';
import CreatePlan3 from './pages/ai-service/CreatePlan3';
import CreatePlan4 from './pages/ai-service/CreatePlan4';
import CreatePlan5 from './pages/ai-service/CreatePlan5';
import CreatePlan6 from './pages/ai-service/CreatePlan6';
import MyTripList from './pages/ai-service/MyTripList';
import ItineraryPage from './pages/ai-service/ItineraryPage';
import YoutubePage from "./pages/ai-service/YoutubePage";
import Header from './components/HeaderBar';
import './index.css'; // Tailwind가 포함된 CSS 파일을 import
import './App.css';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <AppContent />
      </Router>
    </RecoilRoot>
  );
}

function AppContent() {
  const location = useLocation();

  // 특정 경로에서 Header를 숨기기
  const hideHeaderPaths = [];
  const showHeader = !hideHeaderPaths.includes(location.pathname); // 경로가 숨김 경로에 없으면 Header 표시

  return (
    <div className="App">
      {showHeader && <Header />} {/* Header를 조건부로 렌더링 */}
      <Routes>
        {/* MainPage 경로 */}
        <Route path="/" element={<MainPage />} />
        {/* CreatePlan 경로 */}
        <Route path="/create-plan1" element={<CreatePlan1 />} />
        <Route path="/create-plan2" element={<CreatePlan2 />} />
        <Route path="/create-plan3" element={<CreatePlan3 />} />
        <Route path="/create-plan4" element={<CreatePlan4 />} />
        <Route path="/create-plan5" element={<CreatePlan5 />} />
        <Route path="/create-plan6" element={<CreatePlan6 />} />
        <Route path="/my-trip-list" element={<MyTripList />} />
        <Route path="/itinerary/:recommendation_trip_id" element={<ItineraryPage />} />
        <Route path="/youtube-page" element={<YoutubePage/>} />
      </Routes>
    </div>
  );
}

export default App;
