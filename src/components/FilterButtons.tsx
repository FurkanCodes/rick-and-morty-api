import { FILTER_OPTIONS } from "../constants/constants";

interface FilterButtonsProps {
  setFilter: (filterOption: string) => void;
}

const FilterButtons = ({ setFilter }: FilterButtonsProps) => (
  <div className="filter-buttons-container">
    <div className="button-group">
      <button onClick={() => setFilter(FILTER_OPTIONS.ALL)}>All</button>
      <button onClick={() => setFilter(FILTER_OPTIONS.DEAD)}>Dead</button>
      <button onClick={() => setFilter(FILTER_OPTIONS.ALIVE)}>Alive</button>
      <button onClick={() => setFilter(FILTER_OPTIONS.UNKNOWN)}>Unknown</button>
    </div>
  </div>
);

export default FilterButtons;
