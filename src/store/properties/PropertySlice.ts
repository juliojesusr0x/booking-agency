import type { Property } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PropertyState {
  properties: Property[];
}

const initialState: PropertyState = {
  properties: [],
};

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setProperties: (
      state: PropertyState,
      action: PayloadAction<Property[]>,
    ) => {
      state.properties = action.payload;
    },
  },
});

export const { setProperties } = propertySlice.actions;
export default propertySlice.reducer;
