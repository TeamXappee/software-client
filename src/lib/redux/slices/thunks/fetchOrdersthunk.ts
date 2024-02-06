import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderSliceInitialState } from "../orderSlice";
import { DateRange } from "react-day-picker";
import { fetchOrders } from "@/api/orders";

export const fetchOrdersThunk = createAsyncThunk(
  "orders/fetchOrdersThunk",
  async (data: {
    dateRange: DateRange | undefined;
    selectedChannelIds: any;
  }) => {
    if (!data.dateRange || !data.dateRange.from || !data.dateRange.to) return;
    const orders = (await fetchOrders(
      data.dateRange.from,
      data.dateRange.to,
      data.selectedChannelIds
    )) as any[];
    return orders;
  }
);

export const fetchOrdersThunkReducers = (
  builder: ActionReducerMapBuilder<OrderSliceInitialState>
) => {
  builder
    .addCase(fetchOrdersThunk.pending, (state) => {
      state.ordersStatus = "loading";
    })
    .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
      state.ordersStatus = "succeeded";
      state.orders = action.payload || [];
      state.ordersCount = action.payload?.length as number;
    })
    .addCase(fetchOrdersThunk.rejected, (state, action) => {
      state.ordersStatus = "failed";
      state.ordersError = action.error.message;
    });
};
