import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

import GlobalStyles from './styles/GlobalStyles';

import Header from './layouts/Header';
import Footer from './layouts/Footer';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header />
          <Routes />
          <GlobalStyles />
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
