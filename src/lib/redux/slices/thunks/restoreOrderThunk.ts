import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderSliceInitialState } from "../orderSlice";
import { restoreOrderFromTrash } from "@/api/trash";

export const restoreOrderThunk = createAsyncThunk(
  "orders/restoreOrderThunk",
  async (id: string) => {
    console.log("HI");
    const order = (await restoreOrderFromTrash(id)) as any;
    return order;
  }
);

export const restoreOrderThunkReucers = (
  builder: ActionReducerMapBuilder<OrderSliceInitialState>
) => {
  builder
    .addCase(restoreOrderThunk.pending, (state) => {
      state.trashStatus = "loading";
      state.ordersStatus = "loading";
    })
    .addCase(restoreOrderThunk.fulfilled, (state, action) => {
      const restoredOrder = action.payload;
      state.trashStatus = "succeeded";
      state.ordersStatus = "succeeded";

      if (state.orders[restoredOrder.originalIndex]) {
        state.orders.splice(restoredOrder.originalIndex, 0, restoredOrder);
      } else {
        state.orders[restoredOrder.originalIndex] = restoredOrder;
      }

      state.orders = state.orders.map((item, index) => item ?? null);
      state.trash = state.trash.filter(
        (order) => order.id !== restoredOrder.id
      );
    })
    .addCase(restoreOrderThunk.rejected, (state, action) => {
      state.trashStatus = "failed";
      state.ordersStatus = "failed";
      state.ordersError = action.error.message;
    });
};
