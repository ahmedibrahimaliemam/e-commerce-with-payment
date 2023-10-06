import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const fetchProducts = createAsyncThunk(
  "productSlice/fetchProducts",
  async () => {
    const data = await axios.get("http://localhost:5000/api/products");
    return data;
  }
);

const productSlice = createSlice({
  initialState: JSON.parse(localStorage.getItem("products")) ?? [],
  name: "productSlice",
  reducers: {
    addToCart: (state, action) => {
      const findProduct = state.find(
        (product) => product._id === action.payload._id
      );
      if (findProduct) {
        //check if the quantity is greater than count in stock to stop increasing
        if (findProduct.quantity >= findProduct.countInStock) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "the quantity is greater than count in stock!",
          });
        } else {
          findProduct.quantity += 1;
        }
      } else {
        const productClone = { ...action.payload, quantity: 1 };
        state.push(productClone);
      }
    },
    increment: (state, action) => {
      const findProduct = state.find(
        (product) => product._id === action.payload._id
      );
      if (findProduct.quantity < findProduct.countInStock) {
        findProduct.quantity += 1;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry the product is out of stock!",
        });
        return;
      }
    },
    decrement: (state, action) => {
      const findProduct = state.find(
        (product) => product._id === action.payload._id
      );
      if (findProduct.quantity > 1) {
        findProduct.quantity -= 1;
      }
    },
    deleteFromCart: (state, action) => {
      //check if all products deleted to clear local storage
      const allProductsDeleted = state.filter(
        (ele) => ele._id != action.payload._id
      );
      if (allProductsDeleted.length === 0) {
        localStorage.clear();
      }
      return state.filter((ele) => ele._id != action.payload._id);
    },
    clearCart:(state,action)=>{
      //remove all data from local storage
      return [] ;

    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (action, state) => {
      console.log(action.payload);
    });
  },
});
export const {
  addToCart,
  increment,
  decrement,
  deleteFromCart,
  clearCart ,
} = productSlice.actions;
export default productSlice.reducer;
