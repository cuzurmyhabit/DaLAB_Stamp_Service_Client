import { createContext, useEffect, useState, useContext } from "react";
import supabase from "../lib/supabase";
import { AuthContext } from "../contexts/AuthContext";

export const UserStampContext = createContext(null);

export default function UserStampProvider({children}){
  const {user} = useContext(AuthContext);

  const [mileage, setMileage] = useState(0);
  const [userStamp, setUserStamp] = useState({});
  const [userPriorCountry, setUserPriorCountry] = useState([]);

  useEffect(()=>{
    async function fetchData(){
      if (!user?.id) {
        console.log("User data not available, skipping fetch.");
        return; // 이 지점에서 fetchData 실행을 중단하여 아래 코드에 접근하지 않음
      }

      const { data: userStampData, error: stampError } = await supabase
      .from("user_stamp")
      .select("*")
      .eq("user_id", user.id);

      const { data: userPriorCountryData, error: priorError } = await supabase
        .from("user_priority_country")
        .select("*")
        .eq("user_id", user.id);

      if (stampError) console.log("user_stamp error", stampError);
      if (priorError) console.log("user_priority_country error", priorError);
      const stamps = userStampData ?? [];
      const priorCountries = userPriorCountryData ?? [];

      setUserStamp(stamps);
      setMileage(stamps.length);
      const priorNames = priorCountries.slice().sort((a, b) => a.rank - b.rank).map((v) => v.country_name);
      setUserPriorCountry(priorNames);
    }
    fetchData();
  },[])

  return(
    <UserStampContext.Provider value={{
      mileage,
      userStamp,
      userPriorCountry
    }}>
      {children}
    </UserStampContext.Provider>
  );
}
