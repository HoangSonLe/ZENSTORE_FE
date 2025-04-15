import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/homePage/HomePage";
import MainLayout from "./pages/layout/MainLayout";
import ProductDetailsPage from "./pages/productDetail/ProductDetailsPage";
import ShopPage from "./pages/products/ShopPage";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import BlogPage from "./pages/blog/BlogPage";
import BlogDetailsPage from "./pages/blog/BlogDetailsPage";

function App() {
    return (
        <BrowserRouter>
            <RouteScrollToTop />
            <PhosphorIconInit />

            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="product-details" element={<ProductDetailsPage />} />
                    <Route path="blog" element={<BlogPage />} />
                    <Route path="blog-details" element={<BlogDetailsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
