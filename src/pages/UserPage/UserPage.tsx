import './UserPage.css';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

function UserPage() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <div className="user-page">
      <div className="section-heading">
        <p>Account</p>
        <h2>My Account</h2>
        <span>Manage your profile and preferences.</span>
      </div>

      <div className="user-page__grid">
        <div className="user-page__card">
          <div className="user-page__avatar">{user?.name.charAt(0).toUpperCase()}</div>
          <div className="user-page__info">
            <h3>{user?.name}</h3>
            <span>{user?.email}</span>
          </div>
        </div>

        <div className="user-page__card">
          <h4>Cart Summary</h4>
          <p>
            {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
          </p>
          <Link to="/cart" className="user-page__link">
            View Cart
          </Link>
        </div>

        <div className="user-page__card">
          <h4>Settings</h4>
          <p>Preferences and account details.</p>
          <button type="button" className="user-page__logout" onClick={logout}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
