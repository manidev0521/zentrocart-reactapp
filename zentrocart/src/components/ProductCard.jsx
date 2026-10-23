
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-image"
      >
        <img src={product.image} alt={product.title} />

        <span className="product-category">
          {product.category}
        </span>
      </Link>

      <div className="product-info">
        <Link to={`/product/${product.id}`}>
          <h3>{product.title}</h3>
        </Link>

        <div className="product-rating">
          ★ {product.rating?.rate || "4.5"}
          <span>({product.rating?.count || 0} reviews)</span>
        </div>

        <div className="product-bottom">
          <span className="product-price">
            ${product.price.toFixed(2)}
          </span>

          <button
            className="add-cart-btn"
            onClick={() => dispatch(addToCart(product))}
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
