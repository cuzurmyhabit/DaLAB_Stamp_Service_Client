import {useState, useContext} from "react";
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// import AuthContext from "../contexts/AuthContext";

const geoUrl = "https://raw.githubusercontent.com/d3-geom/topojson/master/test/world-countries.json";

const countryNameToCode = {
  "South Korea": "KOR",
  "United States of America": "USA",
};

const continentNameToCode = {

}

export default function WorldMap({
  highlightedCountries = [], 
  highlightColor = "#DAEBFF" 
  }){
  const {user} = createContext(AuthContext); // 유저의 타입을 검사 리시버, 기버
  const highlightedSet = new Set(highlightedCountries);

  return (
    <ComposableMap projection="geoMercator">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const countryName = geo.properties.name; 
            
            const isHighlighted = highlightedSet.has(countryName);

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: isHighlighted ? highlightColor : "#DAEBFF",
                    stroke: "#06162C",
                    outline: "none"
                  },
                  hover: {
                    fill: isHighlighted ? highlightColor : "#D6D6DA",
                    stroke: "#06162C",
                    outline: "none"
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}
