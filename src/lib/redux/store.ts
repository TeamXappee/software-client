import { configureStore } from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";
import { orderSlice } from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    order: orderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const useDispatch = () => useReduxDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;

export type Store = typeof store;
export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
