import { LocationData, Location } from "../type-declerations/Location";
import api from "./api";

export const URL = {
  fetchLocationUrl: "location",
};

// fetches all locations, RTK query olabilir cachelemek için
export const fetchLocation = (page = 1) => {
  return api.get<LocationData>(`${URL.fetchLocationUrl}?page=${page}`);
};

// fetches residents based on location id

export const fetchResidentsForLocation = (id: string) => {
  return api.get<Location>(`${URL.fetchLocationUrl}/${id}`);
};
