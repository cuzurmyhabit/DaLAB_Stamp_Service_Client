import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import SideBar from "../components/SideBar";
import { UserTravelAgencyContext } from "../contexts/UserTravelAgencyContext";
import { UserStampContext } from "../contexts/UserStampContext";
import { AuthContext } from "../contexts/AuthContext";

// TODO : 스크롤바 커스텀

export default function ReceiverHome(){
  const navigate = useNavigate();
  const [selectAgencyModal, setSelectAgencyModal] = useState(false); 
  
  //useState
  const [code, setCode] = useState(null);

  //contexts
  const { user } = useContext(AuthContext);
  const { userTravelAgency, userTravelAgencyId, userTravelAgencyName, isAgencyExist } = useContext(UserTravelAgencyContext);
  const { userStamp, mileage, userPriorCountry } = useContext(UserStampContext);


  // TODO : 쿠키 저장해서 사용자의 마지막 정보 저장
  useEffect(()=>{
    if(!user){
      navigate('/login');
      return;
    }
  }, [navigate])

  
  // 여행사 추가하기 버튼 
  const handleAddTravelAgencySubmit = () => {

  }
  // 여행사 삭제하기 버튼
  const handleDeleteTravelAgencySubmit = () =>{
    
  }
  const handleCodeChange = (e) =>{
    setCode(e.target.value)
    // 코드 확인 절차 및 맞다면 정보 불러오기
  }
  const handleCodeSubmit = (e) =>{
    e.preventDefault(); 

  }

  return(
    <div>
    <SideBar className="flex flex-col justify-center items-center">
      {isAgencyExist ? 
        <div className="flex flex-col">
          <div>소속된 여행사가 없습니다</div>
          <Input
            label=""
            placeholder="초대코드 입력"
            onChange={handleCodeChange}
            children={
              <button type="submit" onSubmit={handleCodeSubmit}>제출</button>
            }
          />
        </div>
        :
        <div className="flex flex-col gap-[30px]">
          <div className="text-black font-bold">나의 여행사</div>
          <div className="relative rounded-xl border border-blue-400 h-[48px] w-[250px] text-blue-400 px-8 py-10">
            <button className="rounded-xl bg-blue-400 text-white border" 
              onClick={()=>selectAgencyModal?setSelectAgencyModal(false):setSelectAgencyModal(true)}>
              {"전환하기"}
            </button>
            {selectAgencyModal?
              <div className="flex-row absolute right-[500px] bottom-[10px] shadow-xl w-2xs overflow-scroll justify-between">
                <img src="/assets/travel_agency_modal.png"/>
                <div className="p-10">
                  {userTravelAgency.map((v, i)=>{
                    return(
                      <div key={i} className="flex justify-between px-0 py-5 ">
                        
                      </div>
                    )
                  })}
                </div>
            </div>
            : null
            }
          </div>
          <Input
            label={"마일리지"}
            value={`${mileage}M`}
            children={null}
            onChange={null}
          />
          <div className="flex">
            <div className="flex-row">
              <div>나라별 받은 도장</div>
              <button>순위 설정</button>
            </div>
            <div className="border-2 border-blue-400 px-10 xy-4">
              {userPriorCountry.map((v, i)=>(
                <div key={i} className="flex flex-col g-[5px] border-b-1 border-blue-400 px-8 py-4 bg-white justify-between">
                  <div className="font-bold text-blue-400">{i+1}</div>
                  <div className="text-black">{v.country_name}</div>
                  <div className="font-bold text-blue-400">{"1개"}</div>
                </div>
              ))}
            </div>
          </div>    
          <div className="flex flex-col g-10">
            <button onClick={handleAddTravelAgencySubmit}
              className="border-xl bg-blue-400 outline-none font-bold text-white"
              >여행사 추가하기</button>
            <button onClick={handleDeleteTravelAgencySubmit}
              className="border-xl bg-white border-1 font-bold text-blue-7"
              >여행사 탈퇴하기</button> 
          </div>
        </div>
      }
    </SideBar>
    
    <main className="flex-1 ml-[340px] p-4">
      지도
    </main>
  </div>
  )
}