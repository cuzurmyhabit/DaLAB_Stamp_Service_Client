import React, { useEffect } from 'react';
import './App.css'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import {getCurrentUser} from "./lib/auth"
import SignupPage from './pages/SignupPage';
import MyPageGiver from './pages/MyPageGiver';
import MyPageReceiver from './pages/MyPageReceiver';
import StampPage from './pages/StampPage';
import PassportPage from './pages/PassportPage';
import ReceiverHome from './pages/RecevierHome';
import NavigatorBar from './components/NavigatorBar';

export default function App() {
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useState(null);

  useEffect(() => {
    async function userVaild(){ 
      const user = await getCurrentUser();
      if(!user) {
        navigate("/login");
        setIsLogined(false)
        return;
      }
      setIsLogined(true)
      if(window.location.pathname === "/"){
        if(user.is_user){
          navigate("/receiver")
        }
        else{
          navigate("/giver")
        }
      }
    }
    userVaild();
  }, []);

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