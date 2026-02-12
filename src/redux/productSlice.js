import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./action/fetchProductAction";
import { fetchSingleProduct } from "./action/fetchSingleProduct";

const initialState={
    products:[],
    productPending:false,
    productError:null,
    singleProductPending:false,
    singleProduct:null,
    singleProductError:null,
}


export const productSlice=createSlice({
    name:"productsSlice",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            state.products.push(action.payload);
        }
    },
    extraReducers:(builder)=>{
    builder.addCase(fetchProducts.fulfilled,(state,action)=>{
        state.products=action.payload;
        state.productPending=false;
        state.productError=null;

    }),
    builder.addCase(fetchProducts.pending,(state,action)=>{
        state.productError=null;
        state.productPending=true;
        state.products=[];
    }),
    builder.addCase(fetchProducts.rejected,(state,action)=>{
        state,productError=action.error.message;
        state.productPending=false;
        state.products=[]
    }),
    builder.addCase(fetchSingleProduct.fulfilled,(state,action)=>{
        state.singleProduct=action.payload;
        state.singleProductPending=false;
        state.singleProductError=null;
    }),
    builder.addCase(fetchSingleProduct.pending,(state,action)=>{
        state.singleProduct=null;
        state.singleProductError=null;
        state.singleProductPending=true;
    }),
    builder.addCase(fetchSingleProduct.rejected,(state,action)=>{
        state.singleProduct=null;
        state.singleProductPending=false;
        state.singleProductError=action.error.message;
    })
    }
});

export const {addToCart}=productSlice.actions;
export default productSlice.reducer;