import React from 'react';
import Passport from '../assets/icons/passport.svg';
export default function PassportPage() {
    return (
        <div className="bg-[#4192FF] min-h-screen flex items-center justify-center p-4">

            <div className="bg-white rounded-[80px] border-4 border-blue-500 w-[1500px] h-[900px] flex flex-col items-center justify-center p-8 shadow-xl">
              
                <img src={Passport} alt="Passport" className="w-100 h-auto" />
            
            </div>
        </div>
    );
}