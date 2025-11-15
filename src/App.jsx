import React from 'react';
import LoginPage from './pages/LoginPage'
import LoginPage_uncorrect from './pages/LoginPage_fail';
import SignupPage from './pages/SignupPage';
import SignupPage_fail from './pages/SignupPage_fail';
import LoginPage_fail from './pages/LoginPage_fail';
import MyPageGiver from './pages/MyPageGiver';
import MyPageReceiver from './pages/MyPageReceiver';
import StampPage from './pages/StampPage';
import PassportPage from './pages/PassportPage';

export default function App() {
  return (
    <>
      {/* <MyPageGiver />;  */}
      {/* <MyPageReceiver />; */}
      {/* <StampPage />; */}
      <PassportPage />;
    </>
  )
}
