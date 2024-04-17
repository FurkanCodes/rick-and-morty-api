import { useEffect, useState } from "react";

import { fetchLocationData } from "./LocationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Pagination from "../Pagination/Pagination";
import LocationCard from "./LocationCard";
import "./Location.modules.scss";
import { Location } from "../../type-declerations/Location";

function Locations() {
  const dispatch = useAppDispatch();
  const { results, info } = useAppSelector((state) => state.location.locations);
  const [currentPage, setCurrentPage] = useState<number>(1); // State for current page

  useEffect(() => {
    dispatch(fetchLocationData(currentPage));
  }, [dispatch, currentPage]);

  // Log results and info for debugging
  useEffect(() => {
    console.log(results);
    console.log(info);
  }, [results, info]);

  return (
    <div>
      <div className="location-cards-container">
        {results.map((location: Location) => (
          <LocationCard location={location} />
        ))}
      </div>
      <div>
        <Pagination
          totalPages={info.pages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Locations;
