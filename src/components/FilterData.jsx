import { useApiCall } from "../hooks/useApiCall";
import { useFilterData } from "../hooks/useFilterData";

function FilterData() {
  const { data, loading, error } = useApiCall(
    "https://fakestoreapi.com/products"
  );

  const { searchTerm, setSearchTerm, sortOrder, toggleSortOrder, filteredItems } =
    useFilterData(data || []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-4">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Filter Products</h2>

      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-primary" onClick={toggleSortOrder}>
          Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
        </button>
      </div>

      <p>{filteredItems.length} results found</p>

      <ul className="list-group">
        {filteredItems.map((item) => (
          <li key={item.id} className="list-group-item">
            <strong>{item.title}</strong> — ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterData;
