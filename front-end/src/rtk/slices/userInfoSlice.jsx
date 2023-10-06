import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  initialState: JSON.parse(localStorage.getItem("userInfo")) ?? {},
  name: "userInfoSlice",
  reducers: {
    svaUserInfo: (state, action) => {
      //manage local storage to save data
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return action.payload;
    },
    removeUserInfo: (state, action) => {
      return {};
    },
  },
});
export const { svaUserInfo, removeUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
