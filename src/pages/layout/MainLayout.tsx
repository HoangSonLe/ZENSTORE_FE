// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import BottomFooter from "../../components/footer/BottomFooter";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import ColorInit from "../../helper/ColorInit";
import Preloader from "../../helper/Preloader";
const MainLayout = () => {
    return (
        <div className="main-layout">
            <header>
                <ColorInit color={true} />

                <ScrollToTop smooth color="#FA6400" />

                <Preloader />

                {/* HeaderTwo */}
                <Header />
            </header>
            <main>
                <Outlet /> {/* This is where child routes will be rendered */}
            </main>
            <footer>
                <Footer />
                {/* BottomFooter */}
                <BottomFooter />
            </footer>
        </div>
    );
};

export default MainLayout;
