import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import usersSlice from "./slices/usersSlice";
import userInfoSlice from "./slices/userInfoSlice";
import paymentSlice from "./slices/paymentSlice";
import cartSlice from "./slices/cartSlice";
import SideBarSlice from "./slices/SideBarSlice";
import searchSlice from "./slices/searchSlice";
import AllProductSlice from "./slices/AllProductSlice";

const store=configureStore({
    reducer:{
        product:productSlice ,
        users:usersSlice ,
        userInfo:userInfoSlice ,
        payment:paymentSlice ,
        cart:cartSlice ,
        sideBar:SideBarSlice ,
        search:searchSlice ,
        allProducts:AllProductSlice ,
        

    }
})
export default store ;