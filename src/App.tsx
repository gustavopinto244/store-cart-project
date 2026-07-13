import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import GlobalStyles from './styles/GlobalStyles';

import Header from './layouts/Header';
import Footer from './layouts/Footer';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes />
        <GlobalStyles />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
