import { createContext, useEffect, useState, useContext } from "react";
import supabase from "../lib/supabase";
import { UserTravelAgencyContext } from "./UserTravelAgencyContext";

export const TravelAgencyContext = createContext(null);

export default function TravelAgencyProvider({ children }) {
  const { userTravelAgencyId } = useContext(UserTravelAgencyContext);

  const [travelAgency, setTravelAgency] = useState(null);
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    if (!userTravelAgencyId || userTravelAgencyId.length === 0) {
      setTravelAgency(null);
      return;
    }

    async function fetchData() {
      const { data: agencyData, error: agencyError } = await supabase
        .from("travel_agency")
        .select("*")
        .eq("travel_agency_id", userTravelAgencyId[0])  // 첫 번째 여행사 기준
        .single();
      if (agencyError) {
        console.error(agencyError);
        return;
      }
      setTravelAgency(agencyData);

      
      const { data: continentData, error: continentError } = await supabase
        .from("travel_agency_continent")
        .select("*")
        .eq("travel_agency_id", agencyData.travel_agency_id);
      if (continentError) console.error(continentError);
      setContinents(continentData ?? []);

      const { data: couponData, error: couponError } = await supabase
        .from("travel_agency_coupon")
        .select("*")
        .eq("travel_agency_id", agencyData.travel_agency_id);

      if (couponError) console.error(couponError);

      setCoupons(couponData ?? []);
    }

    fetchData();
  }, [userTravelAgencyId]);

  return (
    <TravelAgencyContext.Provider
      value={{
        travelAgency,
        continents,
        countries,
        coupons
      }}
    >
      {children}
    </TravelAgencyContext.Provider>
  );
}
