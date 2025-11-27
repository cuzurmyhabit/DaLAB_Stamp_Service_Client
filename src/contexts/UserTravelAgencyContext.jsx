import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import supabase from "../lib/supabase"

export const UserTravelAgencyContext = createContext(null);

export default function UserTravelAgencyProvider({children}){
  const { user } = useContext(AuthContext);
  const [isAgencyExist, setIsAgencyExist] = useState(false);
  const [userTravelAgency, setUserTravelAgency] = useState([]);
  const [userTravelAgencyId, setUserTravelAgencyId] = useState([]);
  const [userTravelAgencyName, setUserTravelAgencyName] = useState([]);

  useEffect(()=>{
    async function fetchData(){
      const {data:userAgency, error:userAgencyError} = await supabase.from('user_agency').select("*").eq("user_id", user.id);
      if(userAgencyError){
        console.log("ReceiverHome supabase error")
        setIsAgencyExist(false);
        setUserTravelAgencyId([])
        return;
      }
      const agencies = userAgency ?? [];
      if(agencies.length === 0){
        setIsAgencyExist(false);
        setUserTravelAgencyId([]);
        return;
      }
      setIsAgencyExist(true);
      // 타입 오류 가능성
      setUserTravelAgencyId(agencies.map((v)=>v.travel_agency_id));

      // 상세정보
      const result = await Promise.all(
        agencies.map(async (v) => {
          const { data, error } = await supabase
            .from("travel_agency")
            .select("*")
            .eq("travel_agency_id", v.travel_agency_id);

          if (error) console.error(error);

          return data?.[0];
        })
      );
      setUserTravelAgency(result);
      setUserTravelAgencyName(result.map(v => v?.name));
    }
    fetchData()
  }, [user])

  return (
    <UserTravelAgencyContext.Provider value={{
      userTravelAgency,
      userTravelAgencyId,
      userTravelAgencyName,
      isAgencyExist
    }}>
      {children}
    </UserTravelAgencyContext.Provider>
  );
}