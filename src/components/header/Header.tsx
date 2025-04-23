import query from "jquery";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import SearchBoxMobile from "./SearchBoxMobile";

const Header = (category: any) => {
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.onscroll = () => {
            if (window.pageYOffset < 150) {
                setScroll(false);
            } else if (window.pageYOffset > 150) {
                setScroll(true);
            }
            return () => (window.onscroll = null);
        };
        const selectElement = query(".js-example-basic-single");
        selectElement.select2();

        return () => {
            if (selectElement.data("select2")) {
                selectElement.select2("destroy");
            }
        };
    }, []);

    // Mobile menu support
    const [menuActive, setMenuActive] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const handleMenuClick = (index: any) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const handleMenuToggle = () => {
        setMenuActive(!menuActive);
    };

    // Search control support
    const [activeSearch, setActiveSearch] = useState(false);
    const handleSearchToggle = () => {
        console.log("d");
        setActiveSearch(!activeSearch);
    };

    return (
        <>
            <div className="overlay" />
            <div className={`side-overlay ${menuActive && "show"}`} />
            {/* ==================== Search Box Start Here ==================== */}

            <SearchBoxMobile activeSearch={activeSearch} handleSearchToggle={handleSearchToggle} />

            {/* ==================== Search Box End Here ==================== */}
            {/* ==================== Mobile Menu Start Here ==================== */}
            <div className={`mobile-menu scroll-sm d-lg-none d-block ${menuActive && "active"}`}>
                <button
                    onClick={() => {
                        handleMenuToggle();
                        setActiveIndex(null);
                    }}
                    type="button"
                    className="close-button"
                >
                    <i className="ph ph-x" />{" "}
                </button>
                <div className="mobile-menu__inner">
                    <Link to="/" className="mobile-menu__logo">
                        <img src="/assets/images/logo/logo.png" alt="Logo" />
                    </Link>
                    <div className="mobile-menu__menu">
                        {/* Nav Menu Start */}
                        <ul className="nav-menu flex-align nav-menu--mobile">
                            <li
                                onClick={() => handleMenuClick(0)}
                                className={`on-hover-item nav-menu__item`}
                            >
                                <Link to="/" className="nav-menu__link">
                                    Trang chủ
                                </Link>
                            </li>
                            <li
                                onClick={() => handleMenuClick(1)}
                                className={`on-hover-item nav-menu__item ${
                                    activeIndex === 1 ? "d-block" : ""
                                }`}
                            >
                                <Link to="/shop" className="nav-menu__link">
                                    Sản phẩm
                                </Link>
                            </li>
                            <li className="on-hover-item nav-menu__item">
                                <Link to="/blog" className="nav-menu__link">
                                    Tin tức
                                </Link>
                            </li>
                        </ul>
                        {/* Nav Menu End */}
                    </div>
                </div>
            </div>
            {/* ==================== Mobile Menu End Here ==================== */}
            {/* ======================= Middle Header Two Start ========================= */}
            <header className="header-middle style-two bg-zenStore-100">
                <div className="container container-lg">
                    <nav className="header-inner flex-between">
                        {/* Logo Start */}
                        <div className="logo">
                            <Link to="/" className="link">
                                <img src="/assets/images/logo/logo.png" alt="Logo" />
                            </Link>
                        </div>
                        {/* Logo End  */}
                        {/* form Category Start */}
                        <SearchBox />
                        {/* form Category start */}
                        {/* Header Middle Right start */}
                        <div className="header-right flex-align d-lg-block d-none"></div>
                        {/* Header Middle Right End  */}
                    </nav>
                </div>
            </header>
            {/* ======================= Middle Header Two End ========================= */}
            {/* ==================== Header Two Start Here ==================== */}
            <header
                className={`header bg-white border-bottom border-gray-100 ${
                    scroll && "fixed-header"
                }`}
            >
                <div className="container container-lg">
                    <nav className="header-inner d-flex justify-content-between gap-8">
                        <div className="flex-align menu-category-wrapper">
                            {/* Menu Start  */}
                            <div className="header-menu d-lg-block d-none">
                                {/* Nav Menu Start */}
                                <ul className="nav-menu flex-align ">
                                    <li className="on-hover-item nav-menu__item">
                                        <Link to="/" className="nav-menu__link">
                                            Trang chủ
                                        </Link>
                                    </li>
                                    <li className="on-hover-item nav-menu__item">
                                        <Link to="/shop" className="nav-menu__link">
                                            Sản phẩm
                                        </Link>
                                    </li>
                                    <li className="on-hover-item nav-menu__item">
                                        <Link to="/blog" className="nav-menu__link">
                                            Tin tức
                                        </Link>
                                    </li>
                                </ul>
                                {/* Nav Menu End */}
                            </div>
                            {/* Menu End  */}
                        </div>
                        {/* Header Right start */}
                        <div className="header-right flex-align">
                            <div className="me-8 d-lg-none d-block">
                                <div className="header-two-activities flex-align flex-wrap gap-32">
                                    <button
                                        onClick={handleSearchToggle}
                                        type="button"
                                        className="flex-align search-icon d-lg-none d-flex gap-4 item-hover-two"
                                    >
                                        <span className="text-2xl text-white d-flex position-relative item-hover__text">
                                            <i className="ph ph-magnifying-glass" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={handleMenuToggle}
                                type="button"
                                className="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"
                            >
                                {" "}
                                <i className="ph ph-list" />{" "}
                            </button>
                        </div>
                        {/* Header Right End  */}
                    </nav>
                </div>
            </header>
            {/* ==================== Header End Here ==================== */}
        </>
    );
};

export default Header;
