
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../features/cart/cartSlice";

function Header() {
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="zentro-header">
      <Link to="/" className="zentro-logo">
        Zen<span>tro</span>
        <small>SHOP YOUR WAY</small>
      </Link>

      <nav className="header-nav">
        <Link to="/">Discover</Link>
        <Link to="/cart">My Cart</Link>
      </nav>

      <Link to="/cart" className="header-cart">
        <span>🛍</span>
        Cart
        <span className="cart-badge">{cartCount}</span>
      </Link>
    </header>
  );
}

export default Header;
