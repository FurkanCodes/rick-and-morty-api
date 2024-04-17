import { configureStore } from "@reduxjs/toolkit";
import LocationSlice from "../components/Locations/LocationSlice";
import favoritesSlice from "../components/Favorites/favoritesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    location: LocationSlice,
    favorites: favoritesSlice,
  },
});

//reducer içindeki sliceların typleri otomatik olarak atar.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//useappdispatch her kulanıldığında type girilmesine gerek olamamsı için
export const useAppDispatch = () => useDispatch<AppDispatch>();
//const todos = useSelector((store:RootState) => ) her seferinde state tipinini girilmemeis için
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
