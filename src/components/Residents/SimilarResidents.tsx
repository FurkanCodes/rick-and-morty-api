import { STATUS_CLASSES } from "../../constants/constants";

interface SimilarResidentsProps {
  name: string;
  status: string;
  location: string;
  img: string;
}

function SimilarResidents({
  name,
  status,
  location,
  img,
}: SimilarResidentsProps) {
  const statusClass =
    STATUS_CLASSES[status.toUpperCase() as keyof typeof STATUS_CLASSES] || "";

  return (
    <div>
      <h4>Name: {name}</h4>
      <h4 className={statusClass}>Status: {status}</h4>
      <h4>Location: {location}</h4>
      <img src={img} alt={name} />
    </div>
  );
}

export default SimilarResidents;
