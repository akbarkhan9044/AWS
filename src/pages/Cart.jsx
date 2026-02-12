import React from 'react'
import { useSelector } from 'react-redux';
import { qtyIncrease,descQty } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
export default function Cart() {
    const dispatch=useDispatch();
    const cartItems=useSelector((state)=>state.cart.cartItems);
    console.log("Cart Items in Cart Page:", cartItems);

  return (
    <div>
      {cartItems && cartItems.map((item)=>(
    <div>
        <h3>{item.title}</h3>
        <p>${item.price}</p>    
        <img src={item.image} alt={item.title} style={{width:"100px",height:"100px"}}/>
        <div>
                    <button onClick={()=>{
                        dispatch(qtyIncrease(item))
                    }}>+</button>
                    <h1>{item.qty}</h1>
                    <button
                    onClick={()=>{
                        dispatch(descQty(item))
                    }}
                    >-</button>
        </div>

    </div>        
      ))}
    </div>
  )
}
