export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: number | null;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface LocationData {
  info: Info;
  results: Location[];
}

export interface Resident {
  id: number;
  name: string;
  status: string;
  image: string;
}
