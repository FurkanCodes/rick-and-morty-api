import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchResidentsByLocation } from "../Locations/LocationSlice";
import { Link, useParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import "./Residents.modules.scss";
import { addFavorite } from "../Favorites/favoritesSlice";
import NotFound from "../../pages/NotFound";
import { RootState } from "../../redux/store";
import {
  FAVORITE_BUTTON_CLASSES,
  FAVORITE_BUTTON_LABELS,
  FILTER_OPTIONS,
} from "../../constants/constants";
import { getStatusClass } from "../../utils/utils";
import FilterButtons from "../FilterButtons";

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

  const filteredResidents = residents.filter((resident) => {
    if (filter === FILTER_OPTIONS.ALL) return true;
    if (filter === FILTER_OPTIONS.DEAD && resident.status === "Dead")
      return true;
    if (filter === FILTER_OPTIONS.ALIVE && resident.status === "Alive")
      return true;
    if (filter === FILTER_OPTIONS.UNKNOWN && resident.status === "unknown")
      return true;
    return false;
  });

  const totalPages = Math.ceil(filteredResidents.length / residentsPerPage);

  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = filteredResidents.slice(
    indexOfFirstResident,
    indexOfLastResident
  );

  return (
    <div>
      <FilterButtons setFilter={setFilter} />
      <div className="residentsContainer">
        {currentResidents.map((resident) => (
          <Link
            key={resident.id}
            to={`/residents/${resident.id}`}
            className="residentCard"
          >
            <h3>{resident.name}</h3>
            <p className={getStatusClass(resident.status)}>
              Status: {resident.status}
            </p>
            <img src={resident.image} alt={resident.name} />
            <button
              onClick={(e) => {
                e.stopPropagation(); //favoriye ekledğinde propagate edip linke gitmesini engeller
                dispatch(addFavorite(resident));
              }}
              className={
                favorites.some((fav) => fav.id === resident.id)
                  ? FAVORITE_BUTTON_CLASSES.ACTIVE
                  : FAVORITE_BUTTON_CLASSES.INACTIVE
              }
            >
              {favorites.some((fav) => fav.id === resident.id)
                ? FAVORITE_BUTTON_LABELS.REMOVE
                : FAVORITE_BUTTON_LABELS.ADD}
            </button>
          </Link>
        ))}
        <div className="notfound">
          {" "}
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
