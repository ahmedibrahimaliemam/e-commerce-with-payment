import { createSlice } from "@reduxjs/toolkit" ;

const paymentSlice=createSlice({
    initialState:JSON.parse(localStorage.getItem("payment"))??{} ,
    name:"paymentSlice" ,
    reducers:{
        addPayment:(state,action)=>{
            localStorage.setItem("payment",JSON.stringify(action.payload))
            return action.payload ;
        }
    }
})
export const {addPayment}=paymentSlice.actions ;
export default paymentSlice.reducer ;