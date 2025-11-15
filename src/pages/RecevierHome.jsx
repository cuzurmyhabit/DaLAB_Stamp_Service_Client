import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";
import { getCurrentUser } from "../lib/auth";
import Input from "../components/Input";
import SideBar from "../components/SideBar";

export default function ReceiverHome(){
  const navigate = useNavigate();
  const [code, setCode] = useState(null);
  const [travelAgency, setTravelAgency] = useState([]);
  const [mileage, setMileage] = useState(0);
  const [userStamp, setUserStamp] = useState({});
  
  const [isAgencyExist, setIsAgencyExist] = useState(false);

  useEffect(()=>{
    async function fetchAgency(){
      // 처음에 여행사 데이터에 존재여부를 확인
      const user = await getCurrentUser();
      if(!user) {
        navigate("/login");
        return;
      }
      const {userAgency, error} = await supabase.from('user_agency').select("*").eq("user_id", user.id);

      if(error){
        console.log("ReceiverHome supabase error")
      }
      else if(userAgency.length <= 0){
        setIsAgencyExist(false);
      }else{
        setTravelAgency(userAgency);
        setIsAgencyExist(true);
        fetchData();
      }
    }

    async function fetchData(){
      const user = await getCurrentUser();
      const {userStamp, error} = await supabase.from("user_stamp").select("*").eq("user_id", user.id);
      setUserStamp(userStamp);
      setMileage(userStamp.lengh);

      if(error){
        console.log("Receiver 기본 데이터 로딩 오류");
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
        <div className="flex flex-col">
          <div>나의 여행사</div>
          {/* 여행사 */}
          <Input
            label={""}
            placeholder={""}
            // 정보 전달
            onChange={""}
            // 전환하기 모달창
            children={
              <button onClick={()=>{}}></button>
            } 
          />
          <Input
            label={"마일리지"}
            value={mileage}
            children={null}
            onChange={null}
          />
          <div className="flex">
            <div className="flex-row">
              <div>나라별 받은 도장</div>
              <button></button>
            </div>
            <div className="border border-blue-400 ">

            </div>
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