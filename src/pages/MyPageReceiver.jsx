import react from 'react';
import { useState, useEffect } from 'react';
import NavigatorBar from '../components/NavigatorBar';
import Profile from '../components/Propile';
import CouponItem from '../components/CouponItem';

export default function MyPageReceiver() {

    const [couponData, setCouponData] = useState([
        { id: 1, agency: "OO여행사", date: "25/11/15" },
        { id: 2, agency: "BB여행사", date: "25/11/15" },
        { id: 3, agency: "CC여행사", date: "25/11/18" },
        { id: 4, agency: "DD여행사", date: "25/11/20" },
    ]);

    const [activeIndex, setActiveIndex] = useState(0);

    const statsData = [
        { label: "누적 쿠폰 갯수", value: "2 개" },
        { label: "소속된 여행사", value: "2 개" },
        { label: "누적 마일리지", value: "56 M" },
        { label: "누적 도장 갯수", value: "16 개" }
    ];

    return (
        <>
            <div className="bg-linear-180 from-white to-[#F2F7FF] w-screen min-h-screen">

                <NavigatorBar />

                <div className='flex flex-col w-full items-center px-4'>
                    
                    <a href='' className="w-6 h-9 bg-[url('/assets/images/back.png')] bg-cover mt-10 ml-32 self-start"></a>

                    <div className='bg-white rounded-xl shadow-lg w-full max-w-5xl p-6 mt-4'>

                        <div className='flex w-full justify-between items-start mb-5'>
                            <Profile 
                                name={"이현민"} 
                                email={"s2531@e-mirim.hs.kr"} 
                                age={"만16세"} 
                            />

                            <div className='text-white bg-background pt-1 pb-1 pl-2 pr-2 rounded-md cursor-pointer mt-5 flex justify-center items-center'>
                                <div className='mr-2'>정보 수정하기</div>
                                <div className="bg-[url('/assets/images/Vector.png')] w-4 h-4 bg-no-repeat bg-cover"></div>
                            </div>
                        </div>

                        <hr className='w-full mb-5' />

                        <div className='flex w-full justify-center items-start gap-8'>

                            <div className='flex flex-col'>
                                {statsData.map((stat, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`w-50 h-10 rounded-l-md flex items-center justify-around cursor-pointer mb-2 ${
                                            index === activeIndex ? 'bg-background' : 'bg-white'
                                        }`}
                                    >
                                        <div className={`${index === activeIndex ? 'text-white' : 'text-black'} text-2xs`}>
                                            {stat.label}
                                        </div>
                                        <div className={`font-bold text-2xs ${index === activeIndex ? 'text-white' : 'text-background'}`}>
                                            {stat.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='w-180 h-80 bg-white border border-background pt-3 pb-3 px-10 rounded-md rounded-bl-md overflow-y-hidden'>
                                <div className='text-center mb-5 font-semibold'>나의 쿠폰</div>

                                <div className='flex overflow-x-scroll space-x-8 scrollbar-hide w-full pb-2'>
                                    {couponData.map((coupon) => (
                                        <CouponItem 
                                            key={coupon.id}
                                            agency={coupon.agency}
                                            date={coupon.date}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>
                    
                    </div>

                </div>

            </div>
        </>
    )
}
