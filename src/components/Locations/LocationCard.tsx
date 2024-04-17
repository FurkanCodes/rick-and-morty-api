import { Link } from "react-router-dom";

interface LocationCardProps {
  location: {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
  };
}

const LocationCard = ({ location }: LocationCardProps) => {
  return (
    <div className="location-card">
      <Link to={`/location/${location.id}`}>
        <div className="text">
          <h3>Planet: {location.name}</h3>
          <p>Type: {location.type}</p>
          <p>Dimension: {location.dimension}</p>
          <p>Residents: {location.residents.length}</p>
        </div>
      </Link>
    </div>
  );
};

export default LocationCard;
