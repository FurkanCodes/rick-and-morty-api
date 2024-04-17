import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchResidentsByLocation } from "../Locations/LocationSlice";
import { Link, useParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import "./Residents.modules.scss";
import NotFound from "../../pages/NotFound";
import { RootState } from "../../redux/store";
import { FILTER_OPTIONS } from "../../constants/constants";
import { getStatusClass } from "../../utils/utils";
import FilterButtons from "../FilterButtons";
import { addFavorite, removeFavorite } from "../Favorites/favoritesSlice";

const Residents: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { residents, isLoading } = useAppSelector(
    (state: RootState) => state.location
  );
  const favorites = useAppSelector(
    (state: RootState) => state.favorites.favorites
  );

  // State for current page, residents per page, and filter
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 10;
  const [filter, setFilter] = useState(FILTER_OPTIONS.ALL);

  useEffect(() => {
    if (id) {
      dispatch(fetchResidentsByLocation(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  if (isLoading === "pending") {
    return <div>Loading...</div>;
  }

  const filteredResidents = residents.filter(() => {
    if (filter === FILTER_OPTIONS.ALL) return true;
    if (filter === FILTER_OPTIONS.DEAD) return true;
    if (filter === FILTER_OPTIONS.ALIVE) return true;
    if (filter === FILTER_OPTIONS.UNKNOWN) return true;
    return false;
  });

  const totalPages = Math.ceil(filteredResidents.length / residentsPerPage);

  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = filteredResidents.slice(
    indexOfFirstResident,
    indexOfLastResident
  );

  const handleFavoriteClick = (resident: any) => {
    if (favorites.some((fav) => fav.id === resident.id)) {
      dispatch(removeFavorite(resident.id));
    } else {
      dispatch(addFavorite(resident));
    }
  };

  return (
    <div>
      <FilterButtons setFilter={setFilter} />
      <div className="residentsContainer">
        {currentResidents.map((resident) => (
          <div className="residentCard" key={resident.id}>
            <Link to={`/residents/${resident.id}`}>
              <h3>{resident.name}</h3>
              <p className={getStatusClass(resident.status)}>
                Status: {resident.status}
              </p>
              <img src={resident.image} alt={resident.name} />
            </Link>
            <button onClick={() => handleFavoriteClick(resident)}>
              {favorites.some((fav) => fav.id === resident.id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        ))}
        <div className="notfound">
          {filteredResidents.length === 0 ? <NotFound /> : null}
        </div>
      </div>
      <div>
        <Pagination
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Residents;
