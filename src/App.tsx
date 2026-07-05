import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';

import Header from './layouts/Header';
import Footer from './layouts/Footer';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyles />
        <Footer />
    </BrowserRouter>
  );
}

export default App;
