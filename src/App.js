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
import ItineraryPage from './pages/ai-service/ItineraryPage';

import YoutubePage from "./pages/ai-service/YoutubePage";
import MyTripList from './pages/travel-service/MyTripList';
import RegisterItineraryPage from './pages/travel-service/RegisterItineraryPage';
import EditItineraryPage from './pages/travel-service/EditItineraryPage';
import CompletedItineraryPage from './pages/travel-service/CompletedItineraryPage';
import RatingPage from './pages/travel-service/RatingPage';
import InvitationList from './pages/travel-service/InvitationList';
import Header from './components/HeaderBar';
import LoginPage from './pages/blog-service/LoginPage';
import SignupPage from './pages/blog-service/SignupPage';
import PostDetailPage from './pages/PostDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/blog-service/PostPage' ;
import SignupPage_2 from './pages/blog-service/SignupPage_2';
import SignupPage_3 from './pages/blog-service/SignupPage_3';
import ForgotPasswordPage from './pages/blog-service/ForgotPasswordPage';
import ChangePasswordPage from './pages/blog-service/ChangePasswordPage';
import ProfileEditPage from './pages/blog-service/ProfileEditPage';
import FollowingListPage from './pages/blog-service/FollowingListPage';
import FollowerListPage from './pages/blog-service/FollowerListPage';
import ReportPage from './pages/blog-service/ReportPage';
import MbtiTestPage from './pages/blog-service/MbtiTestPage';
import MbtiPage from './pages/blog-service/MbtiPage';
import Terms_Privacy_Page from './pages/blog-service/Terms_Privacy_Page';
import Terms_Service_Page from './pages/blog-service/Terms_Service_Page';
import Terms_Location_Page from './pages/blog-service/Terms_Location_Page';
import MbtiResultPage from './pages/blog-service/MbtiResultPage';

import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import loginState from "./recoil/atoms/loginState";


import PostEditPage from "./pages/PostEditPage";
import CommentSection from "./pages/CommentSection";
import "./index.css"; // Tailwind가 포함된 CSS 파일을 import
import "./App.css";

import MbtiDetailPage from "./pages/blog-service/MbtiDetailPage";

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
  const Navigate = useNavigate();
  // 특정 경로에서 Header를 숨기기
  const hideHeaderPaths = [];
  const showHeader = !hideHeaderPaths.includes(location.pathname); // 경로가 숨김 경로에 없으면 Header 표시
  const nickname  = useRecoilValue(loginState);
  

  return (
    <div className="App">
     
      {showHeader && <Header />} {/* Header를 조건부로 렌더링 */}
      <Routes>
        
        <Route path="/" element={<MainPage />} />
        

        <Route path="/create-plan1" element={<CreatePlan1 />} />
        <Route path="/create-plan2" element={<CreatePlan2 />} />
        <Route path="/create-plan3" element={<CreatePlan3 />} />
        <Route path="/create-plan4" element={<CreatePlan4 />} />
        <Route path="/create-plan5" element={<CreatePlan5 />} />
        <Route path="/create-plan6" element={<CreatePlan6 />} />
        <Route path="/my-trip-list" element={<MyTripList />} />

        <Route path="/invitation-list" element={<InvitationList />} />
        <Route path="/itinerary/:recommendation_trip_id" element={<ItineraryPage />} />
        
        <Route path="/register-itinerary/:travelId" element={<RegisterItineraryPage />} />
        <Route path="/edit-itinerary/:travelId" element={<EditItineraryPage />} />
        <Route path="/completed-itinerary/:travelId" element={<CompletedItineraryPage />} />
        <Route path="/rating/:travelId" element={<RatingPage />} />

        <Route path="/youtube-page" element={<YoutubePage/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/second" element={<SignupPage_2 />} />
        <Route path="/signup/third" element={<SignupPage_3 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
        <Route path="/following/list" element={<FollowingListPage />} />
        <Route path="/follower/list" element={<FollowerListPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/mbti" element={<MbtiPage />} />
        <Route path="/postdetail" element={<PostDetailPage />} />
        <Route path="/createpost" element={<CreatePostPage />} />
        <Route path="/postpage" element={<PostPage />} />
        <Route path="/mbti/test" element={ <MbtiTestPage /> } />
        <Route path="/mbti/result" element={ <MbtiResultPage/>} />
        <Route path="/terms/service" element={ <Terms_Service_Page/> } />
        <Route path="/terms/privacy" element={ <Terms_Privacy_Page/> } />
        <Route path="/terms/location" element={ <Terms_Location_Page/>} />


        <Route path="/mbti-test" element={<MbtiTestPage />} />
        <Route path="/MbtiDetailPage" element={<MbtiDetailPage/>}/>
        <Route path="/MbtiResultPage" element={<MbtiResultPage/>}/>

        <Route path="/blog-service/api/posts/blog/:nickname" element={<PostPage />} />
        {/* <Route
          path="/"
          element={
            nickname ? (
              <Navigate to={`/blog-service/api/posts/blog/${nickname}`} />
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}
        <Route path="/blog-service/auth/api/posts/:postId" element={<PostDetailPage />} />
        <Route path="/blog-service/auth/api/posts/:postId/edit" element={<PostEditPage/>}/>

        <Route path="/blog-service/api/posts" element={<CreatePostPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
