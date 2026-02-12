import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import counterReducer from "./counterSlice";
export const store=configureStore({
    reducer:{
        product:productSlice,
        cart:cartSlice,
        counter:counterReducer
    }
})