import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
} from "../redux/counterSlice";

export function useCounter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(5);

  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());
  const handleReset = () => dispatch(reset());
  const handleIncrementByAmount = () => dispatch(incrementByAmount(amount));

  return {
    count,
    amount,
    setAmount,
    handleIncrement,
    handleDecrement,
    handleReset,
    handleIncrementByAmount,
  };
}
