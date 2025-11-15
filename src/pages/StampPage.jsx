import React, { useState } from 'react';
import NavigatorBar from '../components/NavigatorBar';
import BookBgImage from '../assets/icons/book-background.svg';
import FilledStampIcon from '../assets/icons/stamp-filled.svg';
import LeftArrowIcon from '../assets/icons/left-arrow.svg'; 
import RightArrowIcon from '../assets/icons/right-arrow.svg';

function Stamp({ isFilled, agency, date }) {
    if (isFilled) {
        return (
            <div className="flex flex-col items-center">
                <img src={FilledStampIcon} alt="도장" className="w-20 h-20" />
                <div className="text-center text-xs mt-1 text-gray-700">
                    <p>{agency}</p>
                    <p>{date}</p>
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border-2 border-blue-400"></div>
            <div className="text-center text-xs mt-1">
                <p className="opacity-0">placeholder</p>
                <p className="opacity-0">placeholder</p>
            </div>
        </div>
    );
}

export default function StampPage() {
    const [koreaStamps] = useState([
        { id: 1, isFilled: true, agency: 'OO여행사', date: '25/11/02' },
        { id: 2, isFilled: true, agency: 'OO여행사', date: '25/11/02' },
        { id: 3, isFilled: true, agency: 'OO여행사', date: '25/11/02' },
        { id: 4, isFilled: true, agency: 'OO여행사', date: '25/11/02' },
        { id: 5, isFilled: true, agency: 'OO여행사', date: '25/11/02' },
        { id: 6, isFilled: false },
        { id: 7, isFilled: false },
        { id: 8, isFilled: false },
        { id: 9, isFilled: false },
        { id: 10, isFilled: false },
        { id: 11, isFilled: false },
        { id: 12, isFilled: false },
    ]);

    const [japanStamps] = useState([
        { id: 1, isFilled: true, agency: 'OO여행사', date: '25/11/02' },
        { id: 2, isFilled: true, agency: 'OO여행사', date: '25/11/02' },
        { id: 3, isFilled: true, agency: 'OO여행사', date: '25/11/02' },
        { id: 4, isFilled: true, agency: 'OO여행사', date: '25/11/02' },
        { id: 5, isFilled: false },
        { id: 6, isFilled: false },
        { id: 7, isFilled: false },
        { id: 8, isFilled: false },
        { id: 9, isFilled: false },
        { id: 10, isFilled: false },
        { id: 11, isFilled: false },
        { id: 12, isFilled: false },
    ]);

    const handlePrevPage = () => {};
    const handleNextPage = () => {};

    return (
        <div className="bg-gradient-to-b from-white to-[#F2F7FF] w-screen min-h-screen">
            <NavigatorBar />

            <div className="relative w-full flex justify-center items-center pt-28 px-28">
                <button
                    onClick={handlePrevPage}
                    className="absolute left-16 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition"
                >
                    <img
                        src={LeftArrowIcon}
                        alt="이전"
                        className="w-10 h-10"
                    />
                </button>

                <div className="relative w-full max-w-5xl h-[80vh]">
                    <img src={BookBgImage} alt="Stamp Book Background" className="absolute w-full h-full object-contain" />
                    <div className="absolute inset-0 flex p-16">

                        <div className="w-1/2 pr-8">
                            <h2 className="text-center text-2xl font-bold from-blue to-[#4192FF] mb-6 mt-8">
                                대한민국
                            </h2>
                            <div className="grid grid-cols-3 gap-y-1 gap-x-0.5">
                                {koreaStamps.map(stamp => (
                                    <Stamp key={stamp.id} {...stamp} />
                                ))}
                            </div>
                        </div>

                        <div className="w-1/2 pl-8">
                            <h2 className="text-center text-2xl font-bold from-blue to-[#4192FF] mb-6 mt-8">
                                일본
                            </h2>
                            <div className="grid grid-cols-3 gap-y-1 gap-x-0.5">
                                {japanStamps.map(stamp => (
                                    <Stamp key={stamp.id} {...stamp} />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
                <button
                    onClick={handleNextPage}
                    className="absolute right-16 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition"
                >
                    <img
                        src={RightArrowIcon}
                        alt="다음"
                        className="w-10 h-10"
                    />
                </button>

            </div>
        </div>
    );
}