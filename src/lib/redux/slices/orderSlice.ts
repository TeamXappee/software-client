import { fetchOrders } from "@/api/orders";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DateRange } from "react-day-picker";
import { fetchOrdersThunkReducers } from "./thunks/fetchOrdersthunk";
import { fixOrdersThunkReducers } from "./thunks/fixOrdersThunk";

export interface OrderSliceInitialState {
  orders: any[];
  ordersStatus: "idle" | "loading" | "succeeded" | "failed";
  ordersError?: string | undefined;
  ordersCount?: number;
}

const initialState: OrderSliceInitialState = {
  orders: [],
  ordersStatus: "idle",
  ordersError: undefined,
  ordersCount: 0,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    fetchOrdersThunkReducers(builder);
    fixOrdersThunkReducers(builder);
  },
});

export const selectOrderSlice = (state: any) =>
  state.order as OrderSliceInitialState;
