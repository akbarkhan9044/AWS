import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
export default function Form() {
    const zodSchema=z.object({
        username:z.string().min(3,"Username must be at least 3 characters long")
        .max(8,"Username must be 8 characters maximum"),
        password:z.string().min(2,"Password must be at least 2 characters long")
        .max(8,"Password maximum length is 8 characters")
    });
  
    

  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver:zodResolver(zodSchema)
  });
  //chec
  const handleFormSubmit=(data)=>{

    console.log("Data",data);
  }
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <input
      type='text'
      placeholder='Enter Username'
      {...register("username"
      )}
      />
      {errors.username &&<p style={{color:"red"}}>{errors.username.message}</p>}
      <input
      type="password"
      placeholder='Enter Password'
      {...register("password")}
      />
      {errors.password &&<p style={{color:"red"}}>{errors.password.message}</p>}
     <button type="submit">Submit</button>
    </form>
  )
}
