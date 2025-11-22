import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";
import { getCurrentUser } from "../lib/auth";
import Input from "../components/Input";
import SideBar from "../components/SideBar";

// TODO : 스크롤바 커스텀

export default function ReceiverHome(){
  const navigate = useNavigate();
  const [code, setCode] = useState(null);
  const [travelAgency, setTravelAgency] = useState([]);
  const [mileage, setMileage] = useState(0);
  const [userStamp, setUserStamp] = useState({});
  
  const [isAgencyExist, setIsAgencyExist] = useState(false);
  const [selectAgencyModal, setSelectAgencyModal] = useState(false); 
  const [selectAgencyValue, setSelectAgencyValue] = useState(null); 

  useEffect(()=>{
    async function fetchAgency(){
      // 처음에 여행사 데이터에 존재여부를 확인
      const user = await getCurrentUser();
      if(!user) {
        navigate("/login");
        return;
      }
      const {data:userAgency, error} = await supabase.from('user_agency').select("*").eq("user_id", user.id);

      if(error){
        console.log("ReceiverHome supabase error")
      }
      else if(Array(userAgency).length <= 0){
        setIsAgencyExist(false);
      }else{
        setTravelAgency(Array(userAgency));
        setIsAgencyExist(true);
        fetchData();
      }
    }

    async function fetchData(){
      const user = await getCurrentUser();
      const {userStamp, error} = await supabase.from("user_stamp").select("*").eq("user_id", user.id);
      setUserStamp(Array(userStamp));
      setMileage(Array(userStamp).length);
      if(error){
        console.log("Receiver 기본 데이터 로딩 오류" + str(error));
      }
    }
    fetchAgency();
  }, [])

  // TODO : 쿠키 저장해서 사용자의 마지막 정보 저장


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
    <div className="flex">
    <SideBar>
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
          <div>나의 여행사</div>
          <div className="relative rounded-xl border border-blue-400 h-[48px] w-[250px] text-blue-400 px-8 py-10">
            <button className="rounded-xl bg-blue-400 text-white border" onClick={()=>{selectAgencyModal?setSelectAgencyModal(false):setSelectAgencyModal(true)}}>
              {"전환하기"}
            </button>
            {selectAgencyModal?
            <div className="flex-row absolute right-[500px] bottom-[10px] shadow-xl w-2xs overflow-scroll justify-between">
              <img src="/assets/travel_agency_modal.png"/>
              <div className="p-10">
                {travelAgency.map((v, i)=>
                  (<div key={i} className="flex justify-between px-0 py-5 ">
                    <div>{v[i]}</div>
                    <label key={v[i]}>
                    <input
                      type="radio"
                      value={v[i]}
                      checked={selectAgencyValue === value}
                      onChange={(e)=>{setSelectAgencyValue(e.target.value)}}
                    />
                    </label>
                  </div>))}
              </div>
            </div>
            : null}
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
            <div className="border border-blue-400 ">
              {userStamp.map((v)=>(
                <div>
                  
                </div>
              ))}
            </div>
          </div>    
          <div>
            <button onClick={handleAddTravelAgencySubmit}>여행사 추가하기</button>
            <button onClick={handleDeleteTravelAgencySubmit}>여행사 탈퇴하기</button>  
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