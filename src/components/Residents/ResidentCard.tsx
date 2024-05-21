import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

import SimilarResidents from "./SimilarResidents";
import { addFavorite, removeFavorite } from "../Favorites/favoritesSlice";


interface Resident {
  id: string | number;
  name: string;
  status: string;
  image: string;
  gender: string;
  species: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
  type?: string; // Optional property
}


interface RootState {
  location: {
    residents: Resident[];
  };
  favorites: {
    favorites: Resident[];
  };
}



function ResidentCard() {
  const { id } = useParams<{ id: string }>();
  const residents = useAppSelector((state: RootState) => state.location.residents);
  const resident = residents.find((resident) => resident.id.toString() === id);
  const dispatch = useDispatch();

  const favorites = useAppSelector((state: RootState) => state.favorites.favorites);
  const isFavorite = favorites.some((favorite) => favorite.id === resident?.id);

  if (!resident) {
    return <div>Character not found</div>;
  }

  const filteredResidents = residents.filter(
    (r) =>
      r.status === resident.status &&
      r.location.name === resident.location.name &&
      r.id!== resident.id
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(resident.id));
    } else {
      dispatch(addFavorite(resident));
    }
  };

  const hasSimilarResidents = filteredResidents.length > 0;

  return (
    <div className="residentCard">
      <div className="text">
        <h2>{resident.name}</h2>
        <p>Status: {resident.status}</p>
        <img src={resident.image} alt={resident.name} />
        <p>Gender: {resident.gender}</p>
        <p>Species: {resident.species}</p>
        <p>Location: {resident.location.name}</p>
        <p>Origin: {resident.origin.name}</p>
        <p>Type: {resident.type ? resident.type : "TYPE IS NOT SPECIFIED"}</p>
        <button onClick={toggleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
      <h3>Other Characters with the Same Status and Location</h3>
      <div
        className={`relatedResidents ${
          hasSimilarResidents ? "hasSimilarResidents" : ""
        }`}
      >
        {filteredResidents.length <= 0 ? (
          <p>NO SIMILAR RESIDENTS FOUND!</p>
        ) : (
          filteredResidents.map(
            (r) =>
              r.id !== resident.id && (
                <div key={r.id} className="relatedResidentCard">
                  <SimilarResidents
                    name={r.name}
                    status={r.status}
                    location={r.location.name}
                    img={r.image}
                  />
                </div>
              )
          )
        )}
      </div>
    </div>
  );
}

export default ResidentCard;
