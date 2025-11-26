
import { createContext, useEffect, useState, useContext } from "react";
import supabase from "../lib/supabase";
import { AuthContext } from "./AuthContext";

export const TravelAgencyContext = createContext(null);

export default function TravelAgencyProvider({children}){
  const  {user} = useContext(AuthContext);
  const [travelAgency, setTravelAgency] = useState(); //색깔, 이름, 코드,
  const [travelAgencyContinentsId, setTravelAgencyContinentsId] = useState();
  const [continents, setContinents] = useState(null)
  const [countries, setCountries] = useState(null);
  const [coupons, setCoupons] = useState(null);
  const [travelAgencyStamp, setTravelAgencyStamp] = useState(null)

  useEffect(()=>{
    async function fetchData(){
      if (!user || !user.user_id) {
        console.log("User data not available, skipping fetch.");
        return; // 이 지점에서 fetchData 실행을 중단하여 아래 코드에 접근하지 않음
      }

      const {data: travelAgencyData, error: travelAgencyDataError} = await supabase.from('travel_agency').select('*').eq("user_id", user.user_id);
      if(travelAgencyDataError) console.log("travelAgencyDataError");
      setTravelAgency(travelAgencyData);

      // travelAgency.travel_agency_id << 타입 오류 발생 가능성
      const {data: continentsIdData, error:continentsIdDataError} = await supabase.from("travel_agency_continent").select("*").eq("travel_agency_id", travelAgency[0].travel_agency_id)
      if(continentsIdDataError) console.log("continentsIdDataError");
      setTravelAgencyContinentsId(continentsIdData)

      const {data: countriesData, error: countriesDataError} = await supabase.from("continent").select("*").eq("travel_agency_id", travelAgency.travel_agency_id);
      if(countriesDataError) console.log("countriesDataError");
      setCountries(countriesData.map((country)=>country.country_name))
      setContinents(countriesData.map((country)=>country.continent_name).filter((e, _, arr)=> -1 === arr.indexOf(e))) //중복 제거 : 오버헤드 주의

      const {data: couponsData, error:couponsDataError} = await supabase.from("travel_agency_coupon").select("*").eq("travel_agency_id", travelAgency.travel_agency_id);
      if(couponsDataError) console.log("couponsDataError");
      setCoupons(couponsData)

      const {data: travelAgencyStampData, error: travelAgencyStampDataError} = await supabase.from("travel_agency_coupon").select("*").eq("travel_agency_id", travelAgency.travel_agency_id);
      if(travelAgencyStampDataError) console.log("travelAgencyStampDataError");
      setTravelAgencyStamp(travelAgencyStampData)
    }
    fetchData();
  },[user, travelAgency])

  return(
    <TravelAgencyContext.Provider value={{
      travelAgency,
      continents,
      countries,
      coupons
    }}>
      {children}
    </TravelAgencyContext.Provider>
  )
}