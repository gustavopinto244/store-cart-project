import './CartPage.css';
import { useMemo, useState } from 'react';

const initialCart = [
    {
        id: 1,
        name: 'Brazil Collection',
        category: 'Clothing',
        quantity: 1,
        price: 'R$ 279,90',
    },
    {
        id: 2,
        name: 'Brazil Cap',
        category: 'Accessories',
        quantity: 2,
        price: 'R$ 79,90',
    },
    {
        id: 3,
        name: 'Brazil Soccer Ball',
        category: 'Sports',
        quantity: 1,
        price: 'R$ 149,90',
    }
];

type CartItem = {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: string;
};

function CartPage() {
    const [cart, setCart] = useState<CartItem[]>(initialCart);

    const updateQuantity = (itemId: number, nextQuantity: number) => {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(1, nextQuantity) }
                    : item,
            ),
        );
    };

    const total = useMemo(
        () =>
            cart.reduce((sum, item) => {
                const itemPrice = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));

                return sum + itemPrice * item.quantity;
            }, 0),
        [cart],
    );

    return (
        <section className="cart-page">
            <div className="cart-heading">
                <p>Cart</p>
                {cart.length === 0 ? (
                    <>
                    <h2>Your cart is empty</h2>
                    <span>Add products to see the selected items here.</span>
                    </>
                ) : null}
            </div>
            <div className="cart-items">
                {cart.map((item) => (
                    <article className="cart-item" key={item.id}>
                        <div className="cart-item__visual">
                            <span>{item.category}</span>
                        </div>
                        <div className="cart-item__content">
                            <h3>{item.name}</h3>
                            <div className="cart-quantity-control" aria-label={`Quantity for ${item.name}`}>
                                <span>Quantity</span>
                                <div className="cart-quantity-control__actions">
                                    <button
                                        type="button"
                                        className="cart-quantity-control__button"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        aria-label={`Decrease quantity of ${item.name}`}
                                    >
                                        -
                                    </button>
                                    <input
                                        className="cart-quantity-control__input"
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                                        aria-label={`Edit quantity of ${item.name}`}
                                    />
                                    <button
                                        type="button"
                                        className="cart-quantity-control__button"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        aria-label={`Increase quantity of ${item.name}`}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="cart-item__footer">
                            <strong>{item.price}</strong>
                            <button type="button">Remove</button>
                        </div>
                    </article>
                ))}
            </div>
            <div className="cart-summary">
                <strong>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
            </div>
            <button className="cart-page__checkout" type="button">Proceed to Checkout</button>

        </section>
    );
}

export default CartPage;
