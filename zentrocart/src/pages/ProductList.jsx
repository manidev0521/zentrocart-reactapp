
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
} from "../features/products/productsSlice";

import ProductCard from "../components/ProductCard";

function ProductList() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(items.map((product) => product.category)),
    ];
  }, [items]);

  const filteredProducts = useMemo(() => {
    let result = [...items];

    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (search.trim()) {
      result = result.filter((product) =>
        product.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort(
        (a, b) => b.rating.rate - a.rating.rate
      );
    }

    return result;
  }, [items, category, search, sort]);

  return (
    <main className="zentro-main">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">
            ✦ YOUR DAILY DISCOVERY
          </span>

          <h1>
            Find your
            <br />
            <span>next favorite.</span>
          </h1>

          <p>
            Discover products made for your lifestyle.
            A better shopping experience starts here.
          </p>

          <a href="#products" className="hero-button">
            Explore Collection →
          </a>
        </div>

        <div className="hero-art">
          <div className="hero-circle">
            <span>✦</span>
            <strong>Z</strong>
            <small>ZEN / TRO</small>
          </div>
        </div>
      </section>

      <section id="products" className="shop-section">
        <div className="shop-heading">
          <div>
            <span className="section-label">
              CURATED FOR YOU
            </span>

            <h2>Discover Products</h2>

            <p>
              Explore our collection of amazing finds.
            </p>
          </div>

          <div className="sort-box">
            <label htmlFor="sort">Sort by</label>

            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">
                Price: Low to High
              </option>
              <option value="price-high">
                Price: High to Low
              </option>
              <option value="rating">
                Top Rated
              </option>
            </select>
          </div>
        </div>

        <div className="shop-tools">
          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item ? "active" : ""
                }
                onClick={() => setCategory(item)}
              >
                {item === "all"
                  ? "All Products"
                  : item.charAt(0).toUpperCase() +
                    item.slice(1)}
              </button>
            ))}
          </div>

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading && (
          <div className="status-message">
            <div className="loader"></div>
            <p>Finding amazing products...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
            <button
              onClick={() => dispatch(fetchProducts())}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="results-count">
              Showing {filteredProducts.length} products
            </div>

            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-products">
                <span>⌕</span>
                <h3>No products found</h3>
                <p>Try another search or category.</p>

                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("all");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default ProductList;
