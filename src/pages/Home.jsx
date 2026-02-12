import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useSelector,useDispatch } from "react-redux";
import { fetchProducts } from "../redux/action/fetchProductAction";
function Home() {
    const [loading, setLoading] = useState(true);
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    
      },[]);
  
      const  products=useSelector((state)=>state.product.products);
      const productPending=useSelector((state)=>state.product.productPending);
      const productError=useSelector((state)=>state.product.productError);

      useEffect(() => {
        if (!productPending) {
          setLoading(false);
        }
      }, [productPending]);

      if (productError) {
        return (
          <div className="container mt-5 text-center">
            <h3 className="text-danger">Failed to load products: {productError}</h3>
          </div>
        );
      }
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">All The Favirote Code</h2>
      // Show message if no products are available
      // This check is optional since we are fetching products from an API, but it's good to handle the case where the API returns an empty array.  
      {products.length === 0 ? (
        <p className="text-center">No products available.</p>
      ) : null}

      <div className="row justify-content-center">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Home;
