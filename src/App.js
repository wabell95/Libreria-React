import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { CartProvider } from './context/CartContext';
import { Cart } from './routes/Cart';
import Checkout from './routes/Checkout';
import { Home } from './routes/Home';
import LibroDetalle from './routes/LibroDetalle';
import PageNoFound from './routes/PageNoFound';

const App = () => {
  return (
    <>
      <CartProvider>
        <BrowserRouter>

          {/* <Navbar/> */}

          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/librodetalle/:id" element={<LibroDetalle/>}/>
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="*" element={ <PageNoFound/> } />
          </Routes>
        
        </BrowserRouter>

      </CartProvider>
      
    </>
  );
}

export default App;
