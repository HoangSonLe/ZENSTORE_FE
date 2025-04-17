import React, { useEffect, useState } from "react";
import query from "jquery";
import { Link, NavLink } from "react-router-dom";
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
        setActiveSearch(!activeSearch);
    };

    return (
        <>
            <div className="overlay" />
            <div className={`side-overlay ${menuActive && "show"}`} />
            {/* ==================== Search Box Start Here ==================== */}

            <form action="#" className={`search-box ${activeSearch && "active"}`}>
                <button
                    onClick={handleSearchToggle}
                    type="button"
                    className="search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1"
                >
                    <i className="ph ph-x" />
                </button>
                <div className="container">
                    <div className="position-relative">
                        <input
                            type="text"
                            className="form-control py-16 px-24 text-xl rounded-pill pe-64"
                            placeholder="Tìm kiếm ..."
                        />
                        <button
                            type="submit"
                            className="w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
                        >
                            <i className="ph ph-magnifying-glass" />
                        </button>
                    </div>
                </div>
            </form>
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
                                className={`on-hover-item nav-menu__item has-submenu ${
                                    activeIndex === 1 ? "d-block" : ""
                                }`}
                            >
                                <Link to="#" className="nav-menu__link">
                                    Shop
                                </Link>
                                <ul
                                    className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${
                                        activeIndex === 1 ? "open" : ""
                                    }`}
                                >
                                    <li className="common-dropdown__item nav-submenu__item">
                                        <Link
                                            onClick={() => setActiveIndex(null)}
                                            to="/shop"
                                            className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                                        >
                                            {" "}
                                            Shop
                                        </Link>
                                    </li>
                                    <li className="common-dropdown__item nav-submenu__item">
                                        <Link
                                            onClick={() => setActiveIndex(null)}
                                            to="/product-details"
                                            className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                                        >
                                            {" "}
                                            Shop Details
                                        </Link>
                                    </li>
                                </ul>
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
            <header className="header-middle style-two bg-color-neutral">
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
                        <div className="flex-align gap-16">
                            <form action="#" className="flex-align flex-wrap form-location-wrapper">
                                <div className="search-category style-two d-flex h-48 search-form d-sm-flex d-none">
                                    <div className="search-form__wrapper position-relative">
                                        <input
                                            type="text"
                                            className="search-form__input common-input py-13 ps-16 pe-18 rounded-0 border-0"
                                            placeholder="Tìm kiếm ..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-main-two-600 flex-center text-xl text-white flex-shrink-0 w-48 hover-bg-main-two-700 d-lg-flex d-none"
                                    >
                                        <i className="ph ph-magnifying-glass" />
                                    </button>
                                </div>
                            </form>
                        </div>
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
