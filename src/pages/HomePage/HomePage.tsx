import './HomePage.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import type Product from '../../types/Product';

const FEATURED_IDS = [1, 7, 11, 17];

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;

    axios
      .get('/products')
      .then((res) => {
        if (cancelled) return;
        if (res.data.success && Array.isArray(res.data.data)) {
          const filtered = (res.data.data as Product[]).filter((p) => FEATURED_IDS.includes(p.id));
          setFeaturedProducts(filtered);
        }
      })
      .catch(() => {
        // silently fail, featured stays empty
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="homepage">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Welcome to this portfolio site</p>
          <h1>You'll need to create an account to access all features</h1>
          <p className="hero__description">
            Explore the products and discover the responsive design of this portfolio site.
          </p>

          <div className="hero__actions">
            <Link className="hero__button hero__button--primary" to="/login">
              Sign In
            </Link>
            <Link className="hero__button hero__button--secondary" to="/store">
              Visit the catalog
            </Link>
          </div>
        </div>

        <aside className="hero__spotlight" aria-label="Highlight Product">
          <div className="hero__spotlight-badge">Highlight of the Week</div>
          <div className="hero__spotlight-card">
            <span className="hero__spotlight-category">Brazil Collection</span>
            <h2>Combo to cheer for the Brazilian soccer team</h2>
            <p>
              Cheer for the Brazilian soccer team with this exclusive combo: blue shorts and
              Brazilian t-shirt.
            </p>
            <div className="hero__spotlight-footer">
              <strong>$279.90</strong>
              <span>Estimated ship: 2 to 4 days</span>
              <Link className="hero__button hero__button--primary" to="/store">
                View Details
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <section className="benefits" id="benefits">
        <p className="benefits__heading">Benefits of this store model</p>
        <article>
          <strong>Smart selection</strong>
          <p>Chosen products to highlight items with the best value perception.</p>
        </article>
        <article>
          <strong>Quick purchase</strong>
          <p>Less visual noise, more clarity and a direct path to what matters.</p>
        </article>
        <article>
          <strong>Reliable experience</strong>
          <p>Structure designed to reinforce trust and facilitate store navigation.</p>
        </article>
      </section>

      <section className="featured-products" id="featured-products">
        <div className="section-heading">
          <p>Featured Products</p>
          <h2>Items that deserve attention now</h2>
          <span>A clean showcase to present the best of the catalog.</span>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-card__visual">
                <img
                  src={`https://picsum.photos/seed/${product.id}/400/300`}
                  alt={product.name}
                  loading="lazy"
                />
                <span>{product.category}</span>
              </div>
              <div className="product-card__content">
                <span className="product-card__highlight">{product.highlight}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <div className="product-card__footer">
                <strong>{product.price}</strong>
                <Link to="/store">View in Store</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
