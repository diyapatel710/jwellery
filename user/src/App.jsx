import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import UserProtectedRoute from "./pages/UserProtectedRoute";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES */}

        <Route path="/wishlist" element={<UserProtectedRoute><Wishlist /></UserProtectedRoute>} />

        <Route path="/cart" element={<UserProtectedRoute><Cart /></UserProtectedRoute>} />

        <Route path="/checkout" element={<UserProtectedRoute><Checkout /></UserProtectedRoute>} />

        <Route path="/profile" element={
          <UserProtectedRoute><Profile /></UserProtectedRoute>} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;