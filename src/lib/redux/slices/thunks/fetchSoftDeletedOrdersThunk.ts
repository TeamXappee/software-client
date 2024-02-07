import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderSliceInitialState } from "../orderSlice";
import { DateRange } from "react-day-picker";
import { fetchOrders } from "@/api/orders";
import { fethSoftDeletedOrders } from "@/api/trash";

export const fetchSoftDeletedOrdersThunk = createAsyncThunk(
  "orders/fetchSoftDeletedOrdersThunk",
  async () => {
    const trash = (await fethSoftDeletedOrders()) as any[];
    return trash;
  }
);

export const fetchSoftDeletedOrdersThunkReducers = (
  builder: ActionReducerMapBuilder<OrderSliceInitialState>
) => {
  builder
    .addCase(fetchSoftDeletedOrdersThunk.pending, (state) => {
      state.trashStatus = "loading";
    })
    .addCase(fetchSoftDeletedOrdersThunk.fulfilled, (state, action) => {
      state.trashStatus = "succeeded";
      state.trash = action.payload || [];
    })
    .addCase(fetchSoftDeletedOrdersThunk.rejected, (state, action) => {
      state.trashStatus = "failed";
      state.ordersError = action.error.message;
    });
};
