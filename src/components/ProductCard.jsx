import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function ProductCard({ product, index }) {
  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <motion.div
        className="card h-100 shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }}
        whileTap={{ scale: 0.97 }}
      >
        <img
          src={product.image}
          className="card-img-top p-3"
          alt={product.title}
          style={{ height: "250px", objectFit: "contain" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title.substring(0, 40)}...</h5>
          <p className="card-text text-muted">
            {product.description.substring(0, 80)}...
          </p>
          <p className="card-text fw-bold fs-5">${product.price}</p>
          <Link to={`/detail/${product.id}`} className="btn btn-primary mt-auto">
            View Details
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductCard;
