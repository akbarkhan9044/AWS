import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { fetchSingleProduct } from "../redux/action/fetchSingleProduct";
import {addToCart} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
function Detail() {
  const naviagate=useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id]);

  const { singleProduct, singleProductPending ,singleProductError} = useSelector(state => state.product);
  const cartItems=useSelector((state)=>state.cart.cartItems);
  console.log("Cart Items:", cartItems);
  const checkCurrentProductInCart=cartItems.find((item)=>item.id===singleProduct?.id);
  if (singleProductPending) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!singleProduct) {
    return (
      <div className="container mt-5 text-center">
        <h3>Product not found</h3>
        <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        &larr; Back to Products
      </Link>
      <div className="row">
        <div className="col-md-5">
          <img
            src={singleProduct.image}
            alt={singleProduct.title}
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "contain", width: "100%" }}
          />
        </div>
        <div className="col-md-7">
          <h2>{singleProduct.title}</h2>
          <span className="badge bg-secondary mb-3">{singleProduct.category}</span>
          <p className="fs-3 fw-bold text-success">${singleProduct.price}</p>
          <p className="text-muted">{singleProduct.description}</p>
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge bg-warning text-dark">
              {singleProduct.rating?.rate} / 5
            </span>
            <span className="text-muted">
              ({singleProduct.rating?.count} reviews)
            </span>
          </div>
          {checkCurrentProductInCart?     <button className="btn btn-primary btn-lg"
          onClick={()=>{
            dispatch({type:addToCart,payload:singleProduct})
          }}
          >Remove from Cart</button>:     <button className="btn btn-primary btn-lg"
          onClick={()=>{
            dispatch({type:addToCart,payload:{...singleProduct,qty:1}})
          }}
          >Add to Cart</button>}

          <button className="btn btn-outline-secondary btn-lg ms-3" onClick={()=>{naviagate("/cart")}}>Buy Now</button>
     
        </div>
      </div>
    </div>
  );
}

export default Detail;
