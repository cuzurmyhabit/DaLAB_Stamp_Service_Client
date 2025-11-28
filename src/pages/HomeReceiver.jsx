import { useEffect, useState, useContext } from "react";
import WorldMap from "../components/WorldMap";
import { UserStampContext } from "../contexts/UserStampContext";
import { UserTravelAgencyContext } from "../contexts/UserTravelAgencyContext";
import { TravelAgencyContext } from "../contexts/TravelAgencyContext";

export default function HomeReceiver() {
  const [selectAgencyModal, setSelectAgencyModal] = useState(false);
  const [code, setCode] = useState("");

  // Context
  const {userTravelAgency, isAgencyExist, userTravelAgencyName} = useContext(UserTravelAgencyContext)
  const {travelAgency, continents, countries, coupons} = useContext(TravelAgencyContext)

  // // 라우터 유효성 관리(path)
  // // useEffect(()=>{

  // // })

  // // 디버그
  // / const [isAgencyExist, setIsAgencyExist] = useState(true);
  // const userTravelAgency = [
  //   { id: 1, agency_name: "○○여행사" },
  //   { id: 2, agency_name: "△△투어" },
  //   { id: 3, agency_name: "□□트래블" }
  // ];
  // const mileage = 0;
  // const userPriorCountry = [
  //   { country_name: "대한민국", count: 5 },
  //   { country_name: "일본", count: 4 },
  //   { country_name: "러시아", count: 3 },
  //   { country_name: "중국", count: 2 },
  //   { country_name: "필리핀", count: 1 }
  // ];

  const handleCodeSubmit = (e) => {
    e.target.prevent(e)
    console.log("제출된 코드:", code);
  };

  return (
    <>
    <div className="fixed top-0 left-0 h-screen w-[340px] bg-white shadow-lg overflow-y-auto">
      <div className="flex flex-col items-center p-6 pt-12">
        {!isAgencyExist ? (
          // 여행사가 없을 때
          <div className="flex flex-col items-center w-full gap-6">
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="text-lg font-bold text-gray-800">나의 여행사</div>
            </div>

            <div className="text-gray-600 text-sm mb-2">소속된 여행사가 없습니다</div>

            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="초대코드 입력"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 pr-20 border-2 border-blue-400 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleCodeSubmit}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-400 text-white text-sm rounded-md hover:bg-blue-500"
                >
                  전달 하기
                </button>
              </div>
            </div>
          </div>
        ) : (
          // 여행사가 있을 때
          <div className="flex flex-col w-full gap-6">
            {/* 상단 아이콘 */}
            <div className="flex flex-col items-center gap-3 mb-2">
              <div className="text-lg font-bold text-gray-800">나의 여행사</div>
            </div>

            {/* 여행사 선택 */}
            <div className="relative">
              <div className="flex items-center justify-between px-4 py-3 border-2 border-blue-400 rounded-lg bg-white">
                <span className="text-blue-400 font-medium">○○여행사</span>
                <button
                  onClick={() => setSelectAgencyModal(!selectAgencyModal)}
                  className="px-4 py-1.5 bg-blue-400 text-white text-sm rounded-md hover:bg-blue-500"
                >
                  전환 하기
                </button>
              </div>

              {selectAgencyModal && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-400 rounded-lg shadow-lg z-10">
                  {userTravelAgency?.map((agency) => (
                    <div
                      key={agency.id}
                      onClick={() => {
                        console.log("선택한 여행사:", agency.agency_name);
                        setSelectAgencyModal(false);
                      }}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-blue-100 last:border-b-0"
                    >
                      <span className="text-gray-700">{agency.agency_name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 마일리지 */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1.5">나의 마일리지</label>
              <div className="px-4 py-3 border-2 border-blue-400 rounded-lg bg-white">
                <span className="text-gray-700 font-medium">{mileage}M</span>
              </div>
            </div>

            {/* 나라별 받은 도장 */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">나라별 받은 도장</span>
                <button className="px-3 py-1 bg-blue-400 text-white text-xs rounded-md hover:bg-blue-500">
                  순위 설정
                </button>
              </div>

              <div className="border-2 border-blue-400 rounded-lg overflow-hidden bg-white">
                {userPriorCountry.map((country, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 border-b border-blue-100 last:border-b-0"
                  >
                    <span className="font-bold text-blue-400 w-6">{i + 1}</span>
                    <span className="flex-1 text-gray-700 text-center">{country.country_name}</span>
                    <span className="font-bold text-blue-400">{country.count}개</span>
                  </div>
                ))}

                <button className="w-full py-2 flex items-center justify-center text-blue-400 hover:bg-blue-50">
                  {/* <ChevronDown className="w-5 h-5" /> */}
                </button>
              </div>
            </div>

            {/* 버튼들 */}
            <div className="flex flex-col gap-3 mt-2">
              <button className="w-full py-3 bg-blue-400 text-white font-bold rounded-lg hover:bg-blue-500">
                여행사 추가하기
              </button>
              <button className="w-full py-3 bg-white border-2 border-blue-400 text-blue-400 font-bold rounded-lg hover:bg-blue-50">
                여행사 탈퇴하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    {/* 지도 */}
    <main>
      <WorldMap

      />
    </main>
    </>
  );
}