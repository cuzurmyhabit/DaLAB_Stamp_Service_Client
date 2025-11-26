import { useEffect, useState, createContext, useContext } from 'react';
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import MyPageGiver from './pages/MyPageGiver';
import MyPageReceiver from './pages/MyPageReceiver';
import StampPage from './pages/StampPage';
import PassportPage from './pages/PassportPage';
import ReceiverHome from './pages/RecevierHome';
import NavigatorBar from './components/NavigatorBar';
import { AuthContext } from './contexts/AuthContext';


export default function App() {

  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useState(null);
  const { user, isLoading } = useContext(AuthContext); // 🚨 AuthContext에서 isLoading을 가져와야 합니다!

  useEffect(() => {
    if (isLoading) {
      return; 
    }
    if (!user) {
      if (window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
          navigate("/login");
      }
      return;
    }

    if (user && window.location.pathname === "/") {
      if (user.is_user) {
        navigate("/receiver");
      } else {
        // user.is_user가 false인 경우 (Giver)
        navigate("/giver");
      }
    }
    
  }, [user, isLoading, navigate]);

  return (
    <>

    {isLogined ? <NavigatorBar/> : null}

    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage/>} />

      <Route path="/" element={<ReceiverHome />} />
      <Route path="/receiver" element={<ReceiverHome />} />
      <Route path="/stamp" element={<StampPage/>}/>
      <Route path="/passport" element={<PassportPage />} />
      <Route path="/mypage/receiver" element={<MyPageReceiver/>}/>
      <Route path="/giver" element={<></>}/>
      <Route path="/mypage/giver" element={<MyPageGiver/>}/>
    </Routes>
  
    </>
  );
}