import React, { use } from 'react';
import { useEffect, useState } from 'react';
import '../App.css'

export default function SignupPage() {

    const [clicked, setClicked] = useState(false);
    const [clicked2, setClicked2] = useState(false);

    const onClick = () => {
        if (clicked) {
            setClicked(!clicked);
        } else {
            setClicked(!clicked);
            setClicked2(clicked);
        }
    }
    const onClick2 = () => {
        if (clicked2) {
            setClicked2(!clicked2);
        }
        else {
            setClicked2(!clicked2);
            setClicked(clicked2);
        }
    }

    return (
        <div className="w-screen min-h-screen flex items-center justify-center">
            <div className="w-full h-[calc(100vh-6rem)] bg-white rounded-4xl ml-12 mr-12 flex flex-col items-center justify-top box-border">
                <div className="h-18 w-42 bg-[url('/assets/images/airplane.png')] bg-cover bg-top mb-8 mt-12 flex"></div>
                <div className='flex text-3xl text-center mb-12'>
                    <div className='font-light'>회원가입</div>
                </div>
                <form action="" className='flex flex-col items-center mb-8'>
                    <input type="text" placeholder='email' className="border w-90 h-12 p-4 rounded-full box-border bg-[url('/assets/images/majesticons_mail-line.png')] bg-no-repeat bg-size-[1.2rem_1.2rem] 
                        bg-position-[right_1rem_center] pr-10 mb-4" />
                    <input type="text" placeholder='name' className="border w-90 h-12 p-4 mb-4 rounded-full box-border bg-[url('/assets/images/hugeicons_user-03.png')] bg-no-repeat bg-size-[1.2rem_1.2rem] 
                        bg-position-[right_1rem_center] pr-10" />
                    <input type="password" placeholder='password' className="border w-90 h-12 p-4 rounded-full box-border bg-[url('/assets/images/prime_lock.png')] bg-no-repeat bg-size-[1.2rem_1.2rem] 
                        bg-position-[right_1rem_center] pr-10 mb-4" />
                    <input type="password" placeholder='re-enter-password' className="border w-90 h-12 p-4 mb-4 rounded-full box-border bg-[url('/assets/images/prime_lock.png')] bg-no-repeat bg-size-[1.2rem_1.2rem] 
                        bg-position-[right_1rem_center] pr-10" />
                    <div className='flex mb-4'>
                        <div className={`w-44 h-12 items-center flex justify-center rounded-full border mr-2 font-semibold
                            ${clicked ? 'bg-blue-400 text-white' : 'bg-white text-blue-400'}`} onClick={onClick}>giver</div>
                        <div className={`w-44 h-12 items-center flex justify-center rounded-full border font-semibold
                            ${clicked2 ? 'bg-blue-400 text-white' : 'bg-white text-blue-400'}`} onClick={onClick2}>receiver</div>
                    </div>
                    <button type='submit' className='w-90 h-12 p-4 text-1.5xl rounded-full bg-blue-500 text-white flex items-center justify-center shadow-blue-500 shadow-xl/15 font'>create an account</button>
                </form>
            </div>
        </div>
    );
}
