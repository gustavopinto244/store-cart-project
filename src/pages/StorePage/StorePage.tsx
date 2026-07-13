import './StorePage.css';
import { useMemo, useState } from 'react';

type Product = {
  id: number;
  category: string;
  highlight: string;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  brand: string;
  type: string;
};

const products: Product[] = [
  {
    id: 1,
    category: 'New drop',
    highlight: 'Best seller',
    name: 'Brazil Collection Tee',
    description: 'Lightweight cotton tee with a clean everyday fit.',
    price: 'R$ 32,90',
    priceValue: 32.9,
    brand: 'Urban Stitch',
    type: 'Camisetas',
  },
  {
    id: 2,
    category: 'Basics',
    highlight: 'Soft touch',
    name: 'Essential Hoodie',
    description: 'Relaxed hoodie made for layering and comfort.',
    price: 'R$ 58,90',
    priceValue: 58.9,
    brand: 'Minimal Wear',
    type: 'Blusas',
  },
  {
    id: 3,
    category: 'Accessories',
    highlight: 'Limited',
    name: 'Canvas Tote',
    description: 'Structured tote for daily carry and quick errands.',
    price: 'R$ 18,90',
    priceValue: 18.9,
    brand: 'EcoWeave',
    type: 'Bolsas',
  },
  {
    id: 4,
    category: 'New drop',
    highlight: 'Trending',
    name: 'Linen Resort Shirt',
    description: 'Breathable linen shirt, ideal for warm-weather looks.',
    price: 'R$ 89,90',
    priceValue: 89.9,
    brand: 'TropiCool',
    type: 'Camisas',
  },
  {
    id: 5,
    category: 'Basics',
    highlight: 'Everyday',
    name: 'Slim Chino Pants',
    description: 'Tailored chinos in stretch cotton twill.',
    price: 'R$ 129,90',
    priceValue: 129.9,
    brand: 'Urban Stitch',
    type: 'Calças',
  },
  {
    id: 6,
    category: 'Accessories',
    highlight: 'New',
    name: 'Leather Belt',
    description: 'Full-grain leather belt with brushed metal buckle.',
    price: 'R$ 49,90',
    priceValue: 49.9,
    brand: 'Nomad Essentials',
    type: 'Cintos',
  },
  {
    id: 7,
    category: 'Shoes',
    highlight: 'Comfort',
    name: 'Cloud Runner Sneakers',
    description: 'Lightweight sneakers with memory foam insole.',
    price: 'R$ 199,90',
    priceValue: 199.9,
    brand: 'Urban Stitch',
    type: 'Tênis',
  },
  {
    id: 8,
    category: 'New drop',
    highlight: 'Exclusive',
    name: 'Silk Blend Dress',
    description: 'Midi dress with a flattering wrap silhouette.',
    price: 'R$ 249,90',
    priceValue: 249.9,
    brand: 'Minimal Wear',
    type: 'Vestidos',
  },
  {
    id: 9,
    category: 'Basics',
    highlight: 'Value',
    name: 'Cotton Crew Neck 3-Pack',
    description: 'Three essential crew neck tees in neutral tones.',
    price: 'R$ 69,90',
    priceValue: 69.9,
    brand: 'Minimal Wear',
    type: 'Camisetas',
  },
  {
    id: 10,
    category: 'Accessories',
    highlight: 'Summer',
    name: 'Round Sunglasses',
    description: 'UV400 protection with gold-tone metal frames.',
    price: 'R$ 79,90',
    priceValue: 79.9,
    brand: 'TropiCool',
    type: 'Óculos',
  },
  {
    id: 11,
    category: 'Shoes',
    highlight: 'Best seller',
    name: 'Leather Loafers',
    description: 'Hand-stitched penny loafers in burnished leather.',
    price: 'R$ 279,90',
    priceValue: 279.9,
    brand: 'Nomad Essentials',
    type: 'Calçados',
  },
  {
    id: 12,
    category: 'Basics',
    highlight: 'Soft',
    name: 'Ribbed Tank Top',
    description: 'Fitted rib-knit tank, layers perfectly under jackets.',
    price: 'R$ 39,90',
    priceValue: 39.9,
    brand: 'EcoWeave',
    type: 'Blusas',
  },
  {
    id: 13,
    category: 'New drop',
    highlight: 'Statement',
    name: 'Oversized Denim Jacket',
    description: 'Vintage-wash denim jacket with a relaxed boxy fit.',
    price: 'R$ 179,90',
    priceValue: 179.9,
    brand: 'Urban Stitch',
    type: 'Jaquetas',
  },
  {
    id: 14,
    category: 'Accessories',
    highlight: 'Trending',
    name: 'Braided Bracelet Set',
    description: 'Set of three hand-braided cotton bracelets.',
    price: 'R$ 24,90',
    priceValue: 24.9,
    brand: 'TropiCool',
    type: 'Bijuterias',
  },
  {
    id: 15,
    category: 'Basics',
    highlight: 'Stretch',
    name: 'Relaxed Fit Shorts',
    description: 'Drawstring shorts in breathable cotton-linen blend.',
    price: 'R$ 64,90',
    priceValue: 64.9,
    brand: 'EcoWeave',
    type: 'Bermudas',
  },
  {
    id: 16,
    category: 'Shoes',
    highlight: 'Minimal',
    name: 'Flat Leather Sandals',
    description: 'Handmade leather sandals with a cushioned footbed.',
    price: 'R$ 119,90',
    priceValue: 119.9,
    brand: 'Nomad Essentials',
    type: 'Sandálias',
  },
  {
    id: 17,
    category: 'New drop',
    highlight: 'Premium',
    name: 'Wool Blend Blazer',
    description: 'Unstructured blazer in lightweight wool blend.',
    price: 'R$ 349,90',
    priceValue: 349.9,
    brand: 'Minimal Wear',
    type: 'Jaquetas',
  },
  {
    id: 18,
    category: 'Accessories',
    highlight: 'Classic',
    name: 'Embroidered Baseball Cap',
    description: 'Six-panel cap with embroidered logo and adjustable strap.',
    price: 'R$ 44,90',
    priceValue: 44.9,
    brand: 'Urban Stitch',
    type: 'Bonés',
  },
  {
    id: 19,
    category: 'Basics',
    highlight: 'Lightweight',
    name: 'Linen Wide-Leg Pants',
    description: 'Flowy wide-leg pants in premium washed linen.',
    price: 'R$ 139,90',
    priceValue: 139.9,
    brand: 'TropiCool',
    type: 'Calças',
  },
  {
    id: 20,
    category: 'Accessories',
    highlight: 'Modern',
    name: 'Minimalist Watch',
    description: 'Japanese quartz movement with a stainless steel case.',
    price: 'R$ 229,90',
    priceValue: 229.9,
    brand: 'Nomad Essentials',
    type: 'Relógios',
  },
  {
    id: 21,
    category: 'New drop',
    highlight: 'Elegant',
    name: 'Pleated Midi Skirt',
    description: 'Flowy pleated skirt with an elasticated waistband.',
    price: 'R$ 109,90',
    priceValue: 109.9,
    brand: 'Minimal Wear',
    type: 'Saias',
  },
  {
    id: 22,
    category: 'Shoes',
    highlight: 'Athletic',
    name: 'Trail Runner Hiking Shoes',
    description: 'Grippy outsole and waterproof membrane for trail runs.',
    price: 'R$ 319,90',
    priceValue: 319.9,
    brand: 'Urban Stitch',
    type: 'Tênis',
  },
  {
    id: 23,
    category: 'Basics',
    highlight: 'Organic',
    name: 'Hemp Blend Pullover',
    description: 'Relaxed-fit pullover in soft hemp-cotton blend.',
    price: 'R$ 94,90',
    priceValue: 94.9,
    brand: 'EcoWeave',
    type: 'Blusas',
  },
  {
    id: 24,
    category: 'Accessories',
    highlight: 'Bold',
    name: 'Resin Statement Earrings',
    description: 'Lightweight geometric earrings in marbled resin.',
    price: 'R$ 34,90',
    priceValue: 34.9,
    brand: 'TropiCool',
    type: 'Bijuterias',
  },
];

const priceRanges = [
  { label: 'Até R$ 50', min: 0, max: 50 },
  { label: 'R$ 50 a R$ 100', min: 50, max: 100 },
  { label: 'R$ 100 a R$ 200', min: 100, max: 200 },
  { label: 'Acima de R$ 200', min: 200, max: Infinity },
];

const productTypes = [
  'Camisetas',
  'Camisas',
  'Blusas',
  'Jaquetas',
  'Vestidos',
  'Saias',
  'Calças',
  'Bermudas',
  'Bolsas',
  'Bonés',
  'Cintos',
  'Óculos',
  'Relógios',
  'Bijuterias',
  'Tênis',
  'Sandálias',
  'Calçados',
];

const brands = ['Urban Stitch', 'Minimal Wear', 'TropiCool', 'EcoWeave', 'Nomad Essentials'];

const sortOptions: { label: string; value: string }[] = [
  { label: 'Mais recentes', value: 'newest' },
  { label: 'Menor preço', value: 'price-asc' },
  { label: 'Maior preço', value: 'price-desc' },
  { label: 'Nome A-Z', value: 'name-asc' },
  { label: 'Nome Z-A', value: 'name-desc' },
];

function StorePage() {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
  }, [selectedPriceRanges, selectedTypes, selectedBrands]);

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
        result.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name, 'pt-BR'));
        break;
      case 'newest':
      default:
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [filteredProducts, sortBy]);

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
            {mobileFiltersOpen ? 'Fechar filtros' : 'Filtros'}
          </button>
          <div className="store-page__sort-wrapper">
            <label htmlFor="store-sort-select">Ordenar por</label>
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
            <h3>Filtros</h3>
            {anyFilterActive && (
              <button className="store-page__clear-filters" type="button" onClick={clearFilters}>
                Limpar filtros
              </button>
            )}
          </div>

          <div className="store-page__filter-group">
            <h4>Faixa de preço</h4>
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
            <h4>Tipo de produto</h4>
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
            <h4>Marca</h4>
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
          {sortedProducts.length === 0 ? (
            <div className="store-page__empty">
              <p>Nenhum produto encontrado com os filtros selecionados.</p>
            </div>
          ) : (
            <>
              <p className="store-page__results-count">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'produto' : 'produtos'}{' '}
                encontrado{sortedProducts.length === 1 ? '' : 's'}
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
                      <button type="button">Add to Cart</button>
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
