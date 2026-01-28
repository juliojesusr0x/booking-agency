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
    addProperty: (state: PropertyState, action: PayloadAction<Property>) => {
      state.properties.push(action.payload);
    },
    updateProperty: (state: PropertyState, action: PayloadAction<Property>) => {
      const { id, ...updatedProperty } = action.payload;
      state.properties = state.properties.map((property) =>
        property.id === id ? { ...property, ...updatedProperty } : property,
      );
    },
    deleteProperty: (state: PropertyState, action: PayloadAction<number>) => {
      state.properties = state.properties.filter(
        (property) => property.id !== action.payload,
      );
    },
  },
});

export const { setProperties, addProperty, updateProperty, deleteProperty } =
  propertySlice.actions;
export default propertySlice.reducer;
