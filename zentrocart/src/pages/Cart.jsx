
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../features/cart/cartSlice";

import QuantityStepper from "../components/QuantityStepper";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);

  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 5;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛍</div>

          <h1>Your cart is waiting</h1>

          <p>
            Looks like you haven't added anything yet.
          </p>

          <Link to="/" className="continue-shopping">
            Discover Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <div>
          <span className="section-label">
            YOUR SELECTION
          </span>

          <h1>Shopping Cart</h1>

          <p>
            {cartItems.length} different products in your cart
          </p>
        </div>

        <button
          className="clear-cart-btn"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="cart-item-info">
                <span className="detail-category">
                  {item.category}
                </span>

                <h3>{item.title}</h3>

                <p className="cart-item-price">
                  ${item.price.toFixed(2)}
                </p>

                <QuantityStepper
                  quantity={item.quantity}
                  onIncrease={() =>
                    dispatch(increaseQuantity(item.id))
                  }
                  onDecrease={() =>
                    dispatch(decreaseQuantity(item.id))
                  }
                />
              </div>

              <div className="cart-item-actions">
                <strong>
                  ${(item.price * item.quantity).toFixed(2)}
                </strong>

                <button
                  className="remove-btn"
                  onClick={() =>
                    dispatch(removeFromCart(item.id))
                  }
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>

            <strong>
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </strong>
          </div>

          {subtotal < 100 && (
            <p className="shipping-note">
              Add ${(100 - subtotal).toFixed(2)} more
              for free shipping.
            </p>
          )}

          <div className="summary-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <button
            className="checkout-btn"
            onClick={() =>
              alert("Checkout functionality can be added next!")
            }
          >
            Continue to Checkout →
          </button>

          <Link to="/" className="continue-link">
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
