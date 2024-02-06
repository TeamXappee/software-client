import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderSliceInitialState } from "../orderSlice";
import { DateRange } from "react-day-picker";

export const fixOrdersThunk = createAsyncThunk(
  "orders/fixOrdersThunk",
  async (orders: any[]) => {
    try {
      const res = await fetch("http://localhost:8000/api/orders/fix-weight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: orders.map((order) => order.id),
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to fix missing weights");
      }
      const data = await res.json();
      if (data.updatedOrders && data.updatedOrders.length > 0) {
        console.log("Updated orders:", data.updatedOrders);
        return data.updatedOrders;
      }
    } catch (error) {
      console.error("Error fixing missing weights:", error);
    }
  }
);

export const fixOrdersThunkReducers = (
  builder: ActionReducerMapBuilder<OrderSliceInitialState>
) => {
  builder
    .addCase(fixOrdersThunk.pending, (state) => {
      state.ordersStatus = "loading";
    })
    .addCase(fixOrdersThunk.fulfilled, (state, action) => {
      state.ordersStatus = "succeeded";
      state.orders = action.payload || [];
    })
    .addCase(fixOrdersThunk.rejected, (state, action) => {
      state.ordersStatus = "failed";
      state.ordersError = action.error.message;
    });
};
