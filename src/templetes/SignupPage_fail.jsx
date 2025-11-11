import React, { use } from 'react';
import { useEffect, useState } from 'react';
import '../App.css'

export default function SignupPage_fail() {

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
        <>
            <div className="w-screen min-h-screen flex items-center justify-center">
                <div className="w-full h-[calc(100vh-6rem)] bg-white rounded-4xl ml-12 mr-12 flex flex-col items-center justify-start box-border">
                    <div className='w-full flex justify-start'>
                        <a href='' className="w-6 h-9 bg-[url('/assets/images/back.png')] bg-cover ml-40 mt-12"></a>
                    </div>
                    <div className="h-15 w-35 bg-[url('/assets/images/airplane.png')] bg-cover bg-top mb-6 flex"></div>
                    <div className='flex text-2xl text-center mb-8'>
                        <div className='font-light'>회원가입</div>
                    </div>
                    <form action="" className='flex flex-col items-center mb-8'>
                        <input type="text" placeholder='email' className="border w-80 h-10 p-5 rounded-full box-border bg-[url('/assets/images/majesticons_mail-line.png')] bg-no-repeat bg-size-[1.2rem_1.2rem] 
                        bg-position-[right_1rem_center] pr-10 mb-4" />
                        <input type="text" placeholder='name' className="border w-80 h-10 p-5 mb-4 rounded-full box-border bg-[url('/assets/images/hugeicons_user-03.png')] bg-no-repeat bg-size-[1.2rem_1.2rem] 
                        bg-position-[right_1rem_center] pr-10" />
                        <input type="password" placeholder='password' className="border w-80 h-10 p-5 rounded-full box-border bg-[url('/assets/images/prime_lock.png')] bg-no-repeat bg-size-[1.2rem_1.2rem] 
                        bg-position-[right_1rem_center] pr-10 mb-4" />
                        <input type="password" placeholder='re-enter-password' className="border border-red-500 w-80 h-10 p-5 mb-2 text-red-500 rounded-full box-border bg-[url('/assets/images/prime_lock_red.png')] bg-no-repeat bg-size-[1.2rem_1.2rem] 
                        bg-position-[right_1rem_center] pr-10" />
                        <div className='w-80 flex justify-end '>
                            <div className='mb-5 text-red-500 text-xs/normal font-normal'>* 비밀번호가 같지 않습니다.</div>
                        </div>
                        <div className='flex mb-4'>
                            <div className={`w-38 h-12 items-center flex justify-center rounded-full border mr-3 font-semibold
                            ${clicked ? 'bg-blue-400 text-white' : 'bg-white text-blue-400'}`} onClick={onClick}>giver</div>
                            <div className={`w-38 h-12 items-center flex justify-center rounded-full border font-semibold
                            ${clicked2 ? 'bg-blue-400 text-white' : 'bg-white text-blue-400'}`} onClick={onClick2}>receiver</div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
