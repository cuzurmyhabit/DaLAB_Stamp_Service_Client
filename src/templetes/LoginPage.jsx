import React from 'react';
import { useEffect, useState } from 'react';
import '../App.css'

export default function LoginPage() {
    return (
        <div className="w-screen min-h-screen flex items-center justify-center">
            <div className="w-full h-[calc(100vh-6rem)] bg-white rounded-4xl ml-12 mr-12 flex flex-col items-center justify-top box-border">
                <div className="h-15 w-35 bg-[url('/assets/images/airplane.png')] bg-cover bg-top mb-6 mt-21 flex"></div>
                <div className='flex text-2xl text-center mb-25'>
                    <div className='font-semibold'>Stamp Marble</div>
                    <div className='font-light'>에 오신 것을 환영합니다!</div>
                </div>
                <form action="" className='flex flex-col items-center mb-8'>
                    <input type="text" placeholder='email' className="border w-80 h-10 p-5 rounded-full box-border mb-5 bg-[url('/assets/images/majesticons_mail-line.png')] bg-no-repeat bg-size-[1.2rem_1.2rem] 
                        bg-position-[right_1rem_center] pr-10 " />
                    <input type="password" placeholder='password' className="border w-80 h-10 p-5 rounded-full box-border mb-15 bg-[url('/assets/images/prime_lock.png')] bg-no-repeat bg-size-[1.2rem_1.2rem] 
                        bg-position-[right_1rem_center] pr-10" />
                    <button type='submit' className='w-80 h-10 p-5 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-blue-500 shadow-xl/15 font'>log in</button>
                </form>
                <a href="" className='text-xs underline'>create an account</a>
            </div>
        </div>
    );
}
