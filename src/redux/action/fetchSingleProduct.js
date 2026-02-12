import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSingleProduct=createAsyncThunk(
    "products/fetchSingleProduct",
    async(id)=>{
        try{
            const response=await fetch(`https://fakestoreapi.com/products/${id}`);
            const data=await response.json();
            return data;
        }catch(error){
            console.error("Failed to fetch single product:", error);
            throw error;
        }
    }
)