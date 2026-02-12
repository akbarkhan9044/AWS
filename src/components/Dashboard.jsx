import { useApiCall } from "../hooks/useApiCall";
import { useFilterData } from "../hooks/useFilterData";
import { useCounter } from "../hooks/useCounter";

function Dashboard() {
  const { data, loading, error, refetch } = useApiCall(
    "https://fakestoreapi.com/products"
  );

  const {
    searchTerm,
    setSearchTerm,
    sortOrder,
    toggleSortOrder,
    filteredItems,
  } = useFilterData(data || []);

  const {
    count,
    handleIncrement,
    handleDecrement,
    handleReset,
  } = useCounter();

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-4">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      <div className="card mb-4">
        <div className="card-body text-center">
          <h5 className="card-title">Favorites Count</h5>
          <h3>{count}</h3>
          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-sm btn-success" onClick={handleIncrement}>+</button>
            <button className="btn btn-sm btn-danger" onClick={handleDecrement}>-</button>
            <button className="btn btn-sm btn-secondary" onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>

      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-primary" onClick={toggleSortOrder}>
          {sortOrder === "asc" ? "A-Z" : "Z-A"}
        </button>
        <button className="btn btn-outline-secondary" onClick={refetch}>
          Refresh
        </button>
      </div>

      <p className="text-muted">{filteredItems.length} products found</p>

      <div className="row">
        {filteredItems.map((item) => (
          <div key={item.id} className="col-md-4 mb-3">
            <div className="card h-100">
              <img
                src={item.image}
                alt={item.title}
                className="card-img-top p-3"
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h6 className="card-title">{item.title}</h6>
                <p className="card-text text-success fw-bold">${item.price}</p>
                <span className="badge bg-info">{item.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
