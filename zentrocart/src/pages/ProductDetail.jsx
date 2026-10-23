
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const product = items.find(
    (item) => item.id === Number(id)
  );

  if (loading && !product) {
    return (
      <div className="status-message">
        <div className="loader"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-products">
        <h2>Product not found</h2>
        <Link to="/">Back to Products</Link>
      </div>
    );
  }

  return (
    <main className="detail-page">
      <Link to="/" className="back-link">
        ← Back to Discover
      </Link>

      <div className="detail-card">
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="detail-content">
          <span className="detail-category">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          <div className="detail-rating">
            ★ {product.rating?.rate}
            <span>
              ({product.rating?.count} reviews)
            </span>
          </div>

          <p className="detail-description">
            {product.description}
          </p>

          <div className="detail-price">
            ${product.price.toFixed(2)}
          </div>

          <button
            className="detail-add-btn"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>

          <div className="detail-benefits">
            <p>✓ Quality products</p>
            <p>✓ Secure shopping experience</p>
            <p>✓ Easy cart management</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
