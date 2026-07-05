import './HomePage.css';
import { Link } from 'react-router-dom';

const featuredProducts = [
    {
        name: 'Kit Essencial para o Dia a Dia',
        category: 'Mais vendido',
        description: 'Combinação prática com os itens mais procurados da semana.',
        price: 'R$ 149,90',
        highlight: 'Frete grátis',
    },
    {
        name: 'Coleção Comfort Home',
        category: 'Novo na loja',
        description: 'Peças pensadas para deixar sua rotina mais leve e organizada.',
        price: 'R$ 219,90',
        highlight: '3x sem juros',
    },
    {
        name: 'Tech Pack Pro',
        category: 'Oferta limitada',
        description: 'Acessórios para produtividade com acabamento premium.',
        price: 'R$ 329,90',
        highlight: '12% off',
    },
    {
        name: 'Weekend Starter Set',
        category: 'Escolha da equipe',
        description: 'Seleção curada para quem quer qualidade sem complicação.',
        price: 'R$ 179,90',
        highlight: 'Pronto para presentear',
    },
];

function HomePage() {
    return (
        <main className="homepage">
            <section className="hero">
                <div className="hero__content">
                    <p className="hero__eyebrow">Wellcome to this portfolio site</p>
                    <h1>You'll need to create a account to access all features</h1>
                    <p className="hero__description">
                        Explore the products and discover the responsive design of this portfolio site.
                    </p>

                    <div className="hero__actions">
                        <Link className="hero__button hero__button--primary" to="/login">
                            Enter a account
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
                        <h2>Combo to cheer for the brazilian soccer team</h2>
                        <p>
                            Cheer for the brazilian soccer team with this exclusive combo, blue shorts and brazilian t-shirt.
                        </p>
                        <div className="hero__spotlight-footer">
                            <strong>R$ 279,90</strong>
                            <span>Estimated ship: 2 a 4 days</span>
                            <Link className="hero__button hero__button--primary" to="/store/product/brazil-collection">
                                View Details
                            </Link>
                        </div>
                    </div>
                </aside>
            </section>

            <section className="benefits" id="benefits">
                <p className='hero__eyebrow'>Benefits of this store model</p>
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
                        <article className="product-card" key={product.name}>
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
        </main>
    );
}

export default HomePage;