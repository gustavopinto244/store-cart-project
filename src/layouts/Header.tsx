import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Header.module.css';

function Header() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    await logout();
  };

  return (
    <header className={styles.header}>
      <h1>Clothes Store</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Link to="/cart">Cart</Link>
        {isAuthenticated ? (
          <>
            <Link to="/user">My Account</Link>
            <a href="/login/logout" onClick={handleLogout}>
              Logout
            </a>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
