import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  initialState: JSON.parse(localStorage.getItem("user")) ?? {},
  name: "userSlice",
  reducers: {
    addUser: (state, action) => {
      localStorage.removeItem("user");
      //manage local storage to save user data if refresh page
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    removeUser:(state,action)=>{
    //clear cart to make it ready to new user
    localStorage.clear() ;
      return {} ;
    },
    updateUser:(state,action)=>{
      //update local storage
      localStorage.setItem("user",JSON.stringify(action.payload)) ;
      return action.payload ;
    }
  },
});
export const { addUser ,removeUser,updateUser } = userSlice.actions;
export default userSlice.reducer;
