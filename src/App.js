import { BrowserRouter, Route, Routes } from "react-router-dom";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import AccountPage from "./pages/AccountPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import BlogPage from "./pages/BlogPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import HomePageTwo from "./pages/HomePageTwo";
import ProductDetailsPageOne from "./pages/ProductDetailsPageOne";
import ProductDetailsPageTwo from "./pages/ProductDetailsPageTwo";
import ShopPage from "./pages/ShopPage";

function App() {
    return (
        <BrowserRouter>
            <RouteScrollToTop />
            <PhosphorIconInit />

            <Routes>
                <Route exact path="/" element={<HomePageTwo />} />
                <Route exact path="/shop" element={<ShopPage />} />
                <Route exact path="/product-details" element={<ProductDetailsPageOne />} />
                <Route exact path="/product-details-two" element={<ProductDetailsPageTwo />} />
                <Route exact path="/cart" element={<CartPage />} />
                <Route exact path="/checkout" element={<CheckoutPage />} />
                <Route exact path="/account" element={<AccountPage />} />
                <Route exact path="/blog" element={<BlogPage />} />
                <Route exact path="/blog-details" element={<BlogDetailsPage />} />
                <Route exact path="/contact" element={<ContactPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
