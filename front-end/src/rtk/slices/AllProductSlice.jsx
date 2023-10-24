import { createSlice } from "@reduxjs/toolkit";

const AllProductSlice = createSlice({
  initialState: JSON.parse(localStorage.getItem("allProducts")) ?? [],
  name: "AllProductSlice",
  reducers: {
    addAllProducts: (state, action) => {
      localStorage.setItem("allProducts", JSON.stringify(action.payload));
      return action.payload;
    },
  },
});
export const { addAllProducts } = AllProductSlice.actions;
export default AllProductSlice.reducer;
