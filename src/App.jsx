import { Routes, Route } from 'react-router-dom'

import ProductDetail from "./pages/ProductDetail/ProductDetails"
import ProductListing from "./pages/ProductListing/ProductListing"
import Navbar from './components/Navbar/Navbar';
import CartDrawer from "./components/CartDrawer/CartDrawer";

function App() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App
