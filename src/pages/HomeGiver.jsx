import { useEffect, useState, useContext } from "react";
import WorldMap from "../components/WorldMap";
import {TravelAgencyContext } from "../contexts/TravelAgencyContext";
import { UserTravelAgencyContext } from "../contexts/UserTravelAgencyContext";
import { HuePicker } from "react-color";
import "../style/CustomColorBar.css";
import {inputFormStyle, blueButtonStyle} from "../style/Global"

import EarthSvg from "../assets/icons/Earth.svg"
import Arrow from "../assets/icons/arrow.svg";

export default function HomeGiver() {
  // Context
  const {userTravelAgency, isAgencyExist, userTravelAgencyName} = useContext(UserTravelAgencyContext)
  const {travelAgency, continents, countries, coupons} = useContext(TravelAgencyContext)

  // state
  const [invitationCode, setInvitationCode] = useState("testCode")
  const [colorList, setColorList] = useState(Array.from(({length:5}, ()=>"#4192FF")))
  const [currentColor, setCurrentColor] = useState("#4192FF")

  const [selectContinent] = useState(["아시아", "유럽", "아프리카", "북아메리카", "남아메리카", "오세아니아"])
  const [continentModal, setContinentModal] = useState(false)
  const [continent, setContinent] = useState(selectContinent[0])

  //form value
  const [formName, setFormName] = useState(null);
  const [formContinent, setFormContinent] = useState(null)
  const [formColor, setFormColor] = useState(null)

  //handler
  const newTravelAgencySubmitHandler = () =>{
    e.preventDefault()

  }

  //style
  const formTitleStyle = "relative left-[10px] text-black font-regular"

  // TODO : 라우터 유효성 관리(path)
  // 코드 설정
  // // useEffect(()=>{

  // // })

  return (
    <>
    <div className="fixed top-0 left-0 h-screen w-[340px] bg-white shadow-lg overflow-y-auto">
      <div className="flex flex-col p-12 pt-12 text-[#010101]">
        {/* 여행사가 존재하지 않는다면! */}
        {!isAgencyExist ? (
          // 여행사 생성
          <div className="flex flex-col items-center justify-center w-full gap-[25px]">
            <div className="flex flex-col items-center gap-2 mb-4">
              <img className="h-[90px] w-[90px]" src={EarthSvg} alt="지구 이미지"/>
              <div className="text-lg font-bold text-black">여행사를 생성해요!</div>
            </div>
            <div className="w-full">
              <div className="">
                <form action="" className="flex flex-col gap-[15px]">
                  <div className="flex flex-col gap-[5px]">
                    <div className={`${formTitleStyle}`}>여행사 이름</div>
                    <input
                      type="text"
                      placeholder="이름을 입력하세요"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className={inputFormStyle}
                    />
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <div className={`${formTitleStyle}`}>대륙</div>
                    <div className="relative">
                      <div className="flex h-[45px] items-center justify-between px-4 py-3 border-1 border-blue-400 rounded-xl bg-white">
                        <span className="font-medium">{continent}</span>
                      </div>
                      <button
                        onClick={(e) =>{
                          e.preventDefault()
                          setContinentModal(!continentModal)
                        }}
                        className="absolute top-1/2 right-2 -translate-y-1/2"
                      ><img src={Arrow} alt="arrow" className="h-[35px] w-[35px] focus:color-blue-500 hover:color-blue-500" /></button>
                        {continentModal?(
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border-1 border-blue-400 rounded-xl shadow-lg z-10">
                          {selectContinent.map((continent, index) => {
                            const tapStyle = "px-4 py-3 hover:bg-blue-50 first:hover:rounded-t-xl last:hover:rounded-b-xl last:border-b-0 cursor-pointer border-b border-blue-100"
                            const onClickhandler = () =>{
                              console.log("선택한 대륙:", continent);
                              setContinent(continent)
                              setFormContinent(continent)
                              setContinentModal(false);
                            }
                              return(
                                <div
                                  className={tapStyle}
                                  key={index}
                                  onClick={onClickhandler}>
                                  <span className="text-gray-700">{continent}</span>
                                </div>
                              )
                          })}
                        </div>
                        ): null}
                      </div>
                    </div>
                  <div className="flex flex-col gap-[5px]">
                    <div className={`${formTitleStyle}`}>초대코드</div>
                    <input
                      readOnly
                      type="text"
                      value={invitationCode}
                      onChange={(e) => setCode(e.target.value)}
                      className={inputFormStyle}
                    />
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    {/* 색상 설정 */}
                    <div className={`${formTitleStyle}`}>색깔 설정</div>
                    <div className="flex flex-col gap-[20px] justify-center">
                      <div className="flex flex-row gap-[12px] justify-center">
                        <div className="h-[35px] w-[35px] rounded-[5px] bg-[#4500ff]"/>
                        <div className={`h-[35px] w-[35px] rounded-[5px] bg-[#4192FF]`}/>
                        <div className="h-[35px] w-[35px] rounded-[5px] bg-blue-400"/>
                        <div className="h-[35px] w-[35px] rounded-[5px] bg-blue-400"/>
                        <div className="h-[35px] w-[35px] rounded-[5px] bg-blue-400"/>
                        {/* {colorList.map((v)=>{
                          return(
                            <div className={`h-[35px] w-[35px] rounded-[3px] bg-[${v}]`}/>
                          )
                        })} */}
                      </div>
                      <HuePicker
                        color={currentColor}
                        onChange={(newColor) => {
                          // 이전 색상을 밀어내는 로직
                          setCurrentColor(newColor.hex)
                        }}
                        width="100%"
                        className="custom-hue-slider"
                        style={{
                          height: '16px'
                        }}
                      />
                    </div>
                  </div>
                  <button
                    className={`${blueButtonStyle}  mt-[30px]`}
                    onClick={newTravelAgencySubmitHandler}>
                    생성하기
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          // 여행사가 있을 때
          <div className="flex flex-col w-full gap-6">
            {/* 상단 아이콘 */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <img className="h-[90px] w-[90px]" src={EarthSvg} alt="지구 이미지"/>
              <div className="text-lg font-bold text-black">여행사를 생성해요!</div>
            </div>
          </div>
        )}
      </div>
    </div>
    {/* 지도 */}
    <main>
      <WorldMap

        className=""
      />
    </main>
    </>
  );
}