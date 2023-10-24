import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  initialState: [],
  name: "SearchSlice",
  reducers: {
    search: (state, action) => {
      state.push(action.payload);
    },
    removeSearch:(state,action)=>{
        return [] ;
    }
  },
});
export const { search ,removeSearch } = SearchSlice.actions;
export default SearchSlice.reducer;
