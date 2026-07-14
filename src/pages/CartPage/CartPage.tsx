import './CartPage.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import axios from '../../api/axios';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setCheckoutStatus('loading');
    try {
      await axios.post('/checkout', {
        items: cartItems.map((item) => ({
          product_name: item.name,
          price: item.priceValue,
          quantity: item.quantity,
        })),
        total: cartTotal,
      });
      setCheckoutStatus('success');
      clearCart();
    } catch {
      setCheckoutStatus('error');
    }
  };

  if (checkoutStatus === 'success') {
    return (
      <section className="cart-page">
        <div className="cart-heading">
          <p>Cart</p>
          <h2>Order placed successfully!</h2>
          <span>Thank you for your purchase. Your order has been registered.</span>
        </div>
        <Link className="cart-page__checkout" to="/store">
          Continue Shopping
        </Link>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-heading">
          <p>Cart</p>
          <h2>Your cart is empty</h2>
          <span>Add products to see the selected items here.</span>
        </div>
        <Link className="cart-page__checkout" to="/store">
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-heading">
        <p>Cart</p>
      </div>
      <div className="cart-items">
        {cartItems.map((item) => (
          <article className="cart-item" key={item.id}>
            <div className="cart-item__visual">
              <img
                src={`https://picsum.photos/seed/${item.id}/400/300`}
                alt={item.name}
                loading="lazy"
              />
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
              <button type="button" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="cart-summary">
        <strong>{cartTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong>
      </div>
      {checkoutStatus === 'error' && (
        <p className="cart-page__error">Checkout failed. Please try again.</p>
      )}
      <button
        className="cart-page__checkout"
        type="button"
        onClick={handleCheckout}
        disabled={checkoutStatus === 'loading'}
      >
        {checkoutStatus === 'loading' ? 'Processing...' : 'Proceed to Checkout'}
      </button>
    </section>
  );
}

export default CartPage;
