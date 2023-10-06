import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import usersSlice from "./slices/usersSlice";
import userInfoSlice from "./slices/userInfoSlice";

const store=configureStore({
    reducer:{
        product:productSlice ,
        users:usersSlice ,
        userInfo:userInfoSlice
        

    }
})
export default store ;