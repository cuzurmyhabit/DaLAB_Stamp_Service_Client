import react from "react";
import { useState, useEffect } from "react";

export default function Profile({name, email, age}) {
    return (
        <div className='flex items-center'>
            <div className="bg-[url('/assets/images/mypageperson.png')] bg-cover w-40 h-40 mr-5 ml-50"></div>
            <div className='flex flex-col text-black'>
                <div className='font-bold text-2xl mb-2'>이현민</div>
                <div className='mb-1'>s2531@e-mirim.hs.kr</div>
                <div>만16세</div>
            </div>
        </div>
    )
}