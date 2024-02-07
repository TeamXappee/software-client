import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderSliceInitialState } from "../orderSlice";
import { softDeleteOrder } from "@/api/orders";
import { toast } from "sonner";

export const softDeleteOrderThunk = createAsyncThunk(
  "orders/softDeleteOrderThunk",
  async (data: { order: any; originalIndex: number }) => {
    try {
      const softDeletedOrder = await softDeleteOrder(
        data.order,
        data.originalIndex
      );
      toast.success(`Deleted order ${softDeletedOrder.id} successfully!`);
      return softDeletedOrder;
    } catch (error) {
      toast.error("Error deleting order");
    }
  }
);

export const softDeleteOrderThunkReducers = (
  builder: ActionReducerMapBuilder<OrderSliceInitialState>
) => {
  builder
    .addCase(softDeleteOrderThunk.pending, (state) => {
      state.ordersStatus = "loading";
    })
    .addCase(softDeleteOrderThunk.fulfilled, (state, action) => {
      state.ordersStatus = "succeeded";
      state.orders = state.orders.filter((order) => {
        if (order.id === action.payload?.id) {
          return false;
        }
        return true;
      });
      state.ordersCount = state.orders.length;
      state.trash.push(action.payload);
    })
    .addCase(softDeleteOrderThunk.rejected, (state, action) => {
      state.ordersStatus = "failed";
      state.ordersError = action.error.message;
    });
};
