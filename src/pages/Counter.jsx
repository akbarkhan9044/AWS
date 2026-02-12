import { useCounter } from "../hooks/useCounter";

function Counter() {
  const {
    count,
    amount,
    setAmount,
    handleIncrement,
    handleDecrement,
    handleReset,
    handleIncrementByAmount,
  } = useCounter();

  return (
    //Check the useCounter hook for the logic of this component
    <div className="container mt-4 text-center">
      <h2>Counter</h2>
      <h1 className="display-1">{count}</h1>

      <div className="d-flex justify-content-center gap-2 mb-3">
        <button className="btn btn-success" onClick={handleIncrement}>
          + Increment
        </button>
        <button className="btn btn-danger" onClick={handleDecrement}>
          - Decrement
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="d-flex justify-content-center gap-2">
        <input
          type="number"
          className="form-control"
          style={{ width: "100px" }}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          className="btn btn-primary"
          onClick={handleIncrementByAmount}
        >
          Add {amount}
        </button>
      </div>
    </div>
  );
}

export default Counter;
