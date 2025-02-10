import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import GaugeDisplay from "./GaugeDisplay";
import AirDataGrid from "./AirDataGrid";
import SearchBar from "@/components/SearchBar";
import CoordinatesDisplay from "./CoordinatesDisplay";
import Loader from "../Loader";
import dynamic from "next/dynamic";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// Dynamic import for Map Component
const Map: any = dynamic(() => import("../../components/Map"), {
  loading: () => <p className="text-white m-auto">A Map is loading...</p>,
  ssr: false, //Prevents Server-Side render
});

interface AirData {
  location: string;
  components: Record<string, number>;
  aqi: number;
}

const AirData: React.FC = () => {
  const [data, setData] = useState<{
    location: string;
    components: Record<string, number>;
    aqi: number;
  } | null>(null);

  //Pretoria coordinates for reference
  const defaultLatitude = -25.7479;
  const defaultLongitude = 28.2293;

  const [lat, setLat] = useState<number | undefined>(defaultLatitude);
  const [lon, setLon] = useState<number | undefined>(defaultLongitude);
  const [isLoading, setIsLoading] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const aqiValues = [0, 100, 70, 50, 30, 10];
  const gaugeValue = aqiValues[data?.aqi || 0];

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const MAP_TOKEN = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN;

  useEffect(() => {
    if (MAP_TOKEN) {
      setMapReady(true);
    } else {
      console.error("Mapbox token is missing");
    }
  }, [MAP_TOKEN]);

  const fetchAirPollutionData = useCallback(async () => {
    if (!API_KEY) {
      console.error("API key is missing");
      return;
    }

    if (!lat || !lon) {
      console.error("Invalid coordinates");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const { data }  = response;
      // TODO: refactor to add data handling and null checks
        setData({
          location: data.coord && `${data.coord.lat}, ${data.coord.lon}`,
          components: data.list && data.list[0].components,
          aqi: data.list && data.list[0].main.aqi
        });
    } catch (error) {
      console.error("Error fetching air pollution data:", error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [lat, lon, API_KEY]);

  useEffect(() => {
    fetchAirPollutionData();
  }, [fetchAirPollutionData]);

  const handleSearchLat = (newLat: number | any) => {
    if (!isNaN(newLat)) {
      setLat(newLat);
    }
  };

  const handleSearchLon = (newLon: number | any) => {
    if (!isNaN(newLon)) {
      setLon(newLon);
    }
  };

  return (
    <>
      <div className="flex w-auto mt-5 mb-1 sm:mb-5 sm:mt-0 ">
        <SearchBar setLat={handleSearchLat} setLon={handleSearchLon} />
      </div>
      <main
        id="air-data-container"
        className="z-10 p-5 h-auto w-100 max-w-2xl bg-slate-950 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
      >
        {data ? (
          <>
            <GaugeDisplay
              gaugeValue={gaugeValue}
              dataAqi={data.aqi}
              data={data}
              aqi={undefined}
            />
            <hr className="mb-2 mt-8 h-0.5 border-t-0 ng-neutral-100 opacity-100 dark:opacity-50" />
            <CoordinatesDisplay lat={lat} lon={lon} />
            <AirDataGrid data={data} end={data} value={0} />
          </>
        ) : (
          <Loader />
        )}
      </main>
      {mapReady && MAP_TOKEN && (
        <div className="map-container h-96 w-full relative">
          <Map lat={lat} lon={lon} mapToken={MAP_TOKEN} />
        </div>
      )}
    </>
  );
};

export default AirData;
