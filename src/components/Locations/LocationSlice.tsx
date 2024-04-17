import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchLocation,
  fetchResidentsForLocation,
} from "../../api/locationApi";
import axios from "axios";
import { Location, LocationData } from "../../type-declerations/Location";

export const fetchLocationData = createAsyncThunk<LocationData, number>(
  "location/fetchLocationData",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetchLocation(page);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchResidentsByLocation = createAsyncThunk<Location[], string>(
  "location/fetchResidentsByLocation",
  async (locationId, { rejectWithValue }) => {
    try {
      const locationResponse = await fetchResidentsForLocation(locationId);
      const locationData = locationResponse.data;
      const residentUrls = locationData.residents;

      const residents = await Promise.all(
        residentUrls.map(async (url: string) => {
          const residentResponse = await axios.get<Location>(url); // Assuming each resident is a Location object
          return residentResponse.data;
        })
      );

      return residents;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locations: {
      info: {
        pages: 0,
      },
      results: [] as Location[],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    residents: [] as any[],
    selectedLocationId: 0,
    isLoading: "idle",
    currentPage: 1,
  },
  reducers: {
    setSelectedLocationId: (state, action: PayloadAction<number>) => {
      state.selectedLocationId = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationData.pending, (state) => {
        state.isLoading = "pending";
      })
      .addCase(
        fetchLocationData.fulfilled,
        (state, action: PayloadAction<LocationData>) => {
          state.locations = action.payload;
          state.isLoading = "idle";
        }
      )
      .addCase(fetchResidentsByLocation.pending, (state) => {
        state.isLoading = "pending";
      })
      .addCase(
        fetchResidentsByLocation.fulfilled,
        (state, action: PayloadAction<Location[]>) => {
          state.residents = action.payload;
          state.isLoading = "idle";
        }
      );
  },
});

export const { setSelectedLocationId, setCurrentPage } = locationSlice.actions;

export default locationSlice.reducer;
