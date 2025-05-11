import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import MainLayout from "./pages/layout/MainLayout";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import ProductPage from "./pages/products/ProductPage";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import BlogPage from "./pages/blog/BlogPage";
import BlogDetailsPage from "./pages/blog/BlogDetailsPage";
import InstallmentPage from "./pages/installment/InstallmentPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchProvider } from "./context/SearchContext";
function App() {
    return (
        <SearchProvider>
            <BrowserRouter>
                <ToastContainer position="top-right" autoClose={3000} />
                <RouteScrollToTop />
                <PhosphorIconInit />

                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="tra-gop" element={<InstallmentPage />} />
                        <Route path="shop" element={<ProductPage />} />
                        <Route
                            path="product-details/:productParamId?"
                            element={<ProductDetailsPage />}
                        />
                        <Route path="blog" element={<BlogPage />} />
                        <Route path="tin-tuc/:blogParamId" element={<BlogDetailsPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </SearchProvider>
    );
}

export default App;
