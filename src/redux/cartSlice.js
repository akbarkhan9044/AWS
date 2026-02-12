import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cartItems:[],
    likedItems:[],
}

export const cartSlice=createSlice({
    name:"cartSlice",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const  existingItem=state.cartItems.findIndex(item=>item.id === action.payload.id);
            if(existingItem<0){
                //Add item to cart
                state.cartItems.push(action.payload);

            }
            else if(existingItem>=0){
                //Remove item from cart
                state.cartItems=state.cartItems.filter((item)=>item.id !== action.payload.id);
            }
        },
         qtyIncrease:(state,action)=>{
            state.cartItems=state.cartItems.map((item)=>{
                if(item.id === action.payload.id){
                    return {...item,qty:item.qty+1};
                }else{
                    return item;
                }
            })

         },
         descQty:(state,action)=>{
            const itemQty=state.cartItems.find(item=>item.id === action.payload.id);
            if(itemQty.qty ===1){
                state.cartItems=state.cartItems.filter((item)=>item.id !== action.payload.id);
            }else{
                state.cartItems=state.cartItems.map(item=>{
                    if(item.id === action.payload.id){
                             return {...item,qty:item.qty-1};
                    }else{
                        return item;
                    }
                })
            }
         }
    },
    extraReducers:(builder)=>{}
});

export const {addToCart,qtyIncrease,descQty}=cartSlice.actions;
export default cartSlice.reducer;