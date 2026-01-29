import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface StatusState {
  status: "idle" | "pending" | "success" | "error";
  error: string | null;
  message: string | null;
}

const initialState: StatusState = {
  status: "idle",
  error: null,
  message: null,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatus: (
      state: StatusState,
      action: PayloadAction<{
        status: "idle" | "pending" | "success" | "error";
        message: string | null;
        error: string | null;
      }>,
    ) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.error = action.payload.error;
    },
  },
});

export const { setStatus } = statusSlice.actions;
export default statusSlice.reducer;
