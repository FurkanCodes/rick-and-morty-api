import { useState } from "react";
import { fetchLocation, fetchResidentsForLocation } from "../api/locationApi";
import { Location } from "../type-declerations/Location";

export const useFetchLocation = () => {
  const [locations, setLocation] = useState<Location[] | undefined>();

  const initFetchLocation = async () => {
    const response = await fetchLocation();
    setLocation(response.data.results);
  };

  return {
    locations,
    initFetchLocation,
  };
};

export const useFetchResidents = () => {
  const [residents, setResidents] = useState<Location>();

  const initResidentLocation = async (id: string) => {
    const response = await fetchResidentsForLocation(id);
    setResidents(response.data);
  };
  return {
    residents,
    initResidentLocation,
  };
};
