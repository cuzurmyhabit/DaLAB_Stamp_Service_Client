import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const UserTravelAgencyContext = createContext(null);

export function UserTravelAgencyProvider({children}){
  const { user } = useContext(AuthContext);
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
  })

  return (
    <UserTravelAgencyContext value={{userTravelAgency, userTravelAgencyId, userTravelAgencyName}}>
      {children}
    </UserTravelAgencyContext>
  );
}