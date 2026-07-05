import './StorePage.css';

const products = [
    {
        id: 1,
        category: 'New drop',
        highlight: 'Best seller',
        name: 'Brazil Collection Tee',
        description: 'Lightweight cotton tee with a clean everyday fit.',
        price: 'R$32,90',
    },
    {
        id: 2,
        category: 'Basics',
        highlight: 'Soft touch',
        name: 'Essential Hoodie',
        description: 'Relaxed hoodie made for layering and comfort.',
        price: 'R$58,90',
    },
    {
        id: 3,
        category: 'Accessories',
        highlight: 'Limited',
        name: 'Canvas Tote',
        description: 'Structured tote for daily carry and quick errands.',
        price: 'R$18,90',
    },
];

function StorePage() {
    return (
        <section className="store-page">
            <div className="section-heading">
                <p>Store</p>
                <h2>Complete catalog under construction</h2>
                <span>This page keeps navigation working while the catalog grows.</span>
            </div>
            <div className="products-map">
                {products.map((product) => (
                    <article className="product-card" key={product.id}>
                        <div className="product-card__visual">
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
        </section>
    );
}

export default StorePage;