import { createSlice } from "@reduxjs/toolkit";

const SideBarSlice=createSlice({
    initialState:false ,
    name:"SideBarSlice" ,
    reducers:{
        sideBarCon:(state,action)=>{
            if(action.payload){
                return true ;
            }
            else{
                return false ;
            }
        }

    }
})
export const {sideBarCon}=SideBarSlice.actions ;
export default SideBarSlice.reducer ;