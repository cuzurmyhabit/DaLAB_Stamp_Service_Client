import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const UserTravelAgencyContext = createContext(null);

export function UserTravelAgencyProvider({children}){
  const { user } = useContext(AuthContext);
  const [isAgencyExist, setIsAgencyExist] = useState(false);
  const [userTravelAgency, setUserTravelAgency] = useState([]);
  const [userTravelAgencyId, setUserTravelAgencyId] = useState([]);
  const [userTravelAgencyName, setUserTravelAgencyName] = useState([]);

  useEffect(async ()=>{
    if (!user) return;
    
    const {data:userAgency, error:userAgencyError} = await supabase.from('user_agency').select("*").eq("user_id", user.id);
    if(userAgencyError){
      console.error(userAgencyError);
      console.log("ReceiverHome supabase error")
      setIsAgencyExist(false);
      setUserTravelAgencyId([])
      return;
    }
    const agencies = userAgency ?? [];
    if(agencies.length <= 0){
      setIsAgencyExist(false);
      setUserTravelAgencyId([]);
      return;
    }
    setIsAgencyExist(true);
    setUserTravelAgencyId(agencies);
    // 오버해드 확인
    const rtnUserTravelAgency = await userTravelAgencyId.map(async (v, i) => {
      const {data, error} = await supabase.from("travel_agency").select("*").eq("travel_agency_id", v.travel_agency_id)
      if(error) console.log("rtnUserTravelAgency 오류 발생 맵함수")
      return data
    })
    setUserTravelAgency(rtnUserTravelAgency);
    setUserTravelAgencyName(userTravelAgency.map((v)=>v.name))
  })

  return (
    <UserTravelAgencyContext value={{
      userTravelAgency, 
      userTravelAgencyId, 
      userTravelAgencyName,
      isAgencyExist
    }}>
      {children}
    </UserTravelAgencyContext>
  );
}