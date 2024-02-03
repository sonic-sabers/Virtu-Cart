import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Service from "./pages/Service";
import Services from "./pages/Services";
import Signup from "./pages/Signup";
import { IRootState } from "./store/store";
import { setActive, setActiveUrl } from "./store/userSlice";
import Error from "./pages/Error";

function App() {
  const { activeUrl, isLoggedIn } = useSelector(
    (state: IRootState) => state.user
  );
  const location = useLocation();
  const currentPath = location.pathname;

  const dispatch = useDispatch();
  useEffect(() => {
    const path = window.location.pathname;
    dispatch(setActiveUrl(path));
  }, [window.location.pathname]);
  if (activeUrl && (activeUrl === "/home" || activeUrl === "/")) {
    dispatch(setActive(2));
  } else if (activeUrl && activeUrl.includes("/products")) {
    dispatch(setActive(3));
  } else if (activeUrl && activeUrl === "/services") {
    dispatch(setActive(4));
  }
  return (
    <div className="app">
      <Routes>
        {/* <Route path="/" element={<Navigate to="/home" />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/service/:id" element={<Service />} />
        <Route path="/services" element={<Services />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={isLoggedIn ? <Orders /> : <Error />} />
      </Routes>
      {currentPath === "/login" || currentPath === "/signup" ? "" : <Footer />}
    </div>
  );
}

export default App;
