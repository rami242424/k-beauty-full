import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./features/home/HomePage";
import CatalogPage from "./features/catalog/CatalogPage";
import CartPage from "./features/order/CartPage";
import CheckoutPage from "./features/order/CheckoutPage";
import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignupPage";
import { useCartStore } from "./stores/cartStore";

export default function App() {
  const hydrateCart = useCartStore((s) => s.hydrateCart);

  useEffect(() => {
    hydrateCart();
  }, [hydrateCart]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}
