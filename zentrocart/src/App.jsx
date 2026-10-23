
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <div className="zentro-app">
        <Header />

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route
            path="/product/:id"
            element={<ProductDetail />}
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <footer className="zentro-footer">
          <div className="footer-logo">
            Zen<span>tro</span>
          </div>

          <p>
            Discover something new. Shop something special.
          </p>

          <small>
            © 2026 Zentro. Made for your everyday discoveries.
          </small>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
