import { fetchOrdersThunkReducers } from "./thunks/fetchOrdersthunk";
import { fixOrdersThunkReducers } from "./thunks/fixOrdersThunk";
import { softDeleteOrderThunkReducers } from "./thunks/softDeleteOrderThunk";
import { fetchSoftDeletedOrdersThunkReducers } from "./thunks/fetchSoftDeletedOrdersThunk";

import { restoreOrderThunkReucers } from "./thunks/restoreOrderThunk";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface OrderSliceInitialState {
  orders: any[];
  trash: any[];
  ordersStatus: "idle" | "loading" | "succeeded" | "failed";
  trashStatus: "idle" | "loading" | "succeeded" | "failed";
  ordersError?: string | undefined;
  ordersCount?: number;
}

const initialState: OrderSliceInitialState = {
  orders: [],
  trash: [],
  ordersStatus: "idle",
  trashStatus: "idle",
  ordersError: undefined,
  ordersCount: 0,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setLoadeing: (state, action: PayloadAction<"loading" | "idle">) => {
      state.ordersStatus = action.payload;
    },
  },
  extraReducers(builder) {
    fetchOrdersThunkReducers(builder);
    fixOrdersThunkReducers(builder);
    fetchSoftDeletedOrdersThunkReducers(builder);
    softDeleteOrderThunkReducers(builder);
    restoreOrderThunkReucers(builder);
  },
});

export const selectOrderSlice = (state: any) =>
  state.order as OrderSliceInitialState;
