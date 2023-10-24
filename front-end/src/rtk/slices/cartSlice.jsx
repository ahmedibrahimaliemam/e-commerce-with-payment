import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    initialState:JSON.parse(localStorage.getItem("cart"))??{} ,
    name:"cartSlice" ,
    reducers:{
        saveCart:(state,action)=>{
            localStorage.setItem("cart",JSON.stringify(action.payload)) ;
            return action.payload ;
        }
    }
})
export const {saveCart}=cartSlice.actions ;
export default cartSlice.reducer ;