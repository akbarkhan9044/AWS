import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts=createAsyncThunk(
    "products/fetchProducts",

    async()=>{
        try{
        const response=await fetch("https://fakestoreapi.com/products");
        const res=await response.json();
        return res;
        }catch(error){
            console.log("Failed to fetch products:",error);
            throw error;
        }
    }

)