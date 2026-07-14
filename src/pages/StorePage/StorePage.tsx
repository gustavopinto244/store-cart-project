import './StorePage.css';
import { useEffect, useMemo, useState } from 'react';

import Product from '../../types/Product';
import axios from '../../api/axios';
import { useCart } from '../../contexts/CartContext';

const priceRanges = [
  { label: 'Up to $50', min: 0, max: 50 },
  { label: '$50 to $100', min: 50, max: 100 },
  { label: '$100 to $200', min: 100, max: 200 },
  { label: 'Above $200', min: 200, max: Infinity },
];

const productTypes = [
  'T-Shirts',
  'Shirts',
  'Blouses',
  'Jackets',
  'Dresses',
  'Skirts',
  'Pants',
  'Shorts',
  'Bags',
  'Caps',
  'Belts',
  'Sunglasses',
  'Watches',
  'Jewelry',
  'Sneakers',
  'Sandals',
  'Shoes',
];

const brands = ['Urban Stitch', 'Minimal Wear', 'TropiCool', 'EcoWeave', 'Nomad Essentials'];

const sortOptions: { label: string; value: string }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Lowest price', value: 'price-asc' },
  { label: 'Highest price', value: 'price-desc' },
  { label: 'Name A-Z', value: 'name-asc' },
  { label: 'Name Z-A', value: 'name-desc' },
];

function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { addToCart } = useCart();

  const togglePriceRange = (index: number) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const clearFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedTypes([]);
    setSelectedBrands([]);
  };

  const anyFilterActive =
    selectedPriceRanges.length > 0 || selectedTypes.length > 0 || selectedBrands.length > 0;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedPriceRanges.length > 0) {
      result = result.filter((product) =>
        selectedPriceRanges.some((rangeIndex) => {
          const range = priceRanges[rangeIndex];
          return product.priceValue >= range.min && product.priceValue < range.max;
        }),
      );
    }

    if (selectedTypes.length > 0) {
      result = result.filter((product) => selectedTypes.includes(product.type));
    }

    if (selectedBrands.length > 0) {
      result = result.filter((product) => selectedBrands.includes(product.brand));
    }

    return result;
  }, [products, selectedPriceRanges, selectedTypes, selectedBrands]);

  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case 'price-desc':
        result.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name, 'en-US'));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name, 'en-US'));
        break;
      case 'newest':
      default:
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [filteredProducts, sortBy]);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await axios.get('/products');
        if (!cancelled) setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="store-page">
      <div className="store-page__header">
        <div className="section-heading">
          <p>Store</p>
          <h2>Complete Catalog</h2>
          <span>Explore our curated collection of clothing and accessories.</span>
        </div>
        <div className="store-page__controls">
          <button
            className="store-page__mobile-filters-toggle"
            type="button"
            onClick={() => setMobileFiltersOpen((open) => !open)}
          >
            {mobileFiltersOpen ? 'Close filters' : 'Filters'}
          </button>
          <div className="store-page__sort-wrapper">
            <label htmlFor="store-sort-select">Sort by</label>
            <select
              id="store-sort-select"
              className="store-page__sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="store-page__layout">
        <aside
          className={`store-page__filters ${mobileFiltersOpen ? 'store-page__filters--open' : ''}`}
        >
          <div className="store-page__filters-header">
            <h3>Filters</h3>
            {anyFilterActive && (
              <button className="store-page__clear-filters" type="button" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </div>

          <div className="store-page__filter-group">
            <h4>Price range</h4>
            <ul className="store-page__filter-list">
              {priceRanges.map((range, index) => (
                <li key={range.label}>
                  <label className="store-page__filter-option">
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes(index)}
                      onChange={() => togglePriceRange(index)}
                    />
                    <span>{range.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="store-page__filter-group">
            <h4>Product type</h4>
            <ul className="store-page__filter-list">
              {productTypes.map((type) => (
                <li key={type}>
                  <label className="store-page__filter-option">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    <span>{type}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="store-page__filter-group">
            <h4>Brand</h4>
            <ul className="store-page__filter-list">
              {brands.map((brand) => (
                <li key={brand}>
                  <label className="store-page__filter-option">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                    />
                    <span>{brand}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="store-page__products">
          {loading ? (
            <div className="store-page__empty">
              <p>Loading products...</p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="store-page__empty">
              <p>No products found with the selected filters.</p>
            </div>
          ) : (
            <>
              <p className="store-page__results-count">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
              </p>
              <div className="product-grid">
                {sortedProducts.map((product) => (
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
                      <button type="button" onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default StorePage;
