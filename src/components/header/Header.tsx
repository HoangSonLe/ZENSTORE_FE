import query from "jquery";
import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBox from "./SearchBox";
import SearchBoxMobile from "./SearchBoxMobile";
import AppleAnimation from "./AppleAnimation";
import "./MobileMenuStyles.css"; // Import custom mobile menu styles
import "./LogoStyles.css"; // Import custom logo styles
import "./NavMenuStyles.css"; // Import custom nav menu styles

const Header = ({ logoUrl }: { logoUrl: string }) => {
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

    // Get current location
    const location = useLocation();

    // Determine active index based on current path
    const getActiveIndexFromPath = (path: string) => {
        if (path === "/") return 0;
        if (path.startsWith("/shop")) return 1;
        if (path.startsWith("/blog")) return 2;
        return null;
    };

    // Mobile menu support
    const [menuActive, setMenuActive] = useState(false);
    const [activeIndex, setActiveIndex] = useState(getActiveIndexFromPath(location.pathname));
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const handleMenuClick = (index: any) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleMenuToggle = () => {
        setMenuActive(!menuActive);
    };

    // Update activeIndex when location changes
    useEffect(() => {
        setActiveIndex(getActiveIndexFromPath(location.pathname));
    }, [location.pathname]);

    // Handle click outside to close mobile menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check if menu is active and click is outside menu and not on the toggle button
            if (
                menuActive &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(event.target as Node)
            ) {
                setMenuActive(false);
            }
        };

        // Add event listener when menu is active
        if (menuActive) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuActive]);

    // Search control support
    const [activeSearch, setActiveSearch] = useState(false);
    const handleSearchToggle = () => {
        console.log("d");
        setActiveSearch(!activeSearch);
    };

    return (
        <>
            <div className="overlay" />
            <div
                className={`side-overlay ${menuActive && "show"}`}
                onClick={() => menuActive && setMenuActive(false)}
            />
            {/* ==================== Search Box Start Here ==================== */}

            <SearchBoxMobile activeSearch={activeSearch} handleSearchToggle={handleSearchToggle} />

            {/* ==================== Search Box End Here ==================== */}
            {/* ==================== Mobile Menu Start Here ==================== */}
            <div
                ref={mobileMenuRef}
                className={`mobile-menu scroll-sm d-lg-none d-block ${menuActive && "active"}`}
            >
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
                    <Link to="/" className="mobile-menu__logo" onClick={handleMenuToggle}>
                        <img src={logoUrl} alt="Logo" />
                    </Link>
                    <div className="mobile-menu__menu">
                        {/* Nav Menu Start */}
                        <ul className="nav-menu flex-align nav-menu--mobile">
                            <li
                                onClick={() => handleMenuClick(0)}
                                className={`on-hover-item nav-menu__item ${
                                    activeIndex === 0 ? "active" : ""
                                }`}
                            >
                                <Link to="/" className="nav-menu__link" onClick={handleMenuToggle}>
                                    Trang chủ
                                </Link>
                            </li>
                            <li
                                onClick={() => handleMenuClick(1)}
                                className={`on-hover-item nav-menu__item ${
                                    activeIndex === 1 ? "active" : ""
                                }`}
                            >
                                <Link
                                    to="/shop"
                                    className="nav-menu__link"
                                    onClick={handleMenuToggle}
                                >
                                    Sản phẩm
                                </Link>
                            </li>
                            <li
                                onClick={() => handleMenuClick(2)}
                                className={`on-hover-item nav-menu__item ${
                                    activeIndex === 2 ? "active" : ""
                                }`}
                            >
                                <Link
                                    to="/blog"
                                    className="nav-menu__link"
                                    onClick={handleMenuToggle}
                                >
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
                                <img src={"/assets/images/logo/bg-1.png"} alt="Logo" />
                            </Link>
                        </div>
                        {/* Logo End  */}
                        {/* form Category Start */}
                        <div className="d-flex align-items-center" style={{ marginLeft: "108px" }}>
                            <SearchBox />
                            <div
                                className="contact-info d-flex d-none d-lg-flex"
                                style={{ marginLeft: "50px" }}
                            >
                                <div className="hotline d-flex align-items-center me-4">
                                    <i
                                        className="ph ph-phone text-white me-4"
                                        style={{ fontSize: "28px" }}
                                    ></i>
                                    <div className="d-flex flex-column">
                                        <span
                                            className="text-white"
                                            style={{ fontSize: "18px", fontWeight: "500" }}
                                        >
                                            Hotline liên hệ
                                        </span>
                                        <span
                                            className="text-white"
                                            style={{ fontSize: "16px", fontWeight: "700" }}
                                        >
                                            𝟎𝟖𝟔.𝟓𝟓𝟎.𝟖𝟖𝟖𝟖
                                        </span>
                                    </div>
                                </div>
                                <div className="store-system d-flex align-items-center">
                                    <i
                                        className="ph ph-map-pin text-white me-4"
                                        style={{ fontSize: "28px" }}
                                    ></i>
                                    <div className="d-flex flex-column">
                                        <span
                                            className="text-white"
                                            style={{ fontSize: "18px", fontWeight: "500" }}
                                        >
                                            Hệ thống
                                        </span>
                                        <span
                                            className="text-white"
                                            style={{ fontSize: "16px", fontWeight: "700" }}
                                        >
                                            02 cửa hàng
                                        </span>
                                    </div>
                                </div>
                                <AppleAnimation />
                            </div>
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
                            <div className="header-menu d-lg-block">
                                {/* Nav Menu Start */}
                                <ul className="nav-menu flex-align ">
                                    <li
                                        className={`on-hover-item nav-menu__item ${
                                            activeIndex === 0 ? "active" : ""
                                        }`}
                                    >
                                        <Link to="/" className="nav-menu__link">
                                            Trang chủ
                                        </Link>
                                    </li>
                                    <li
                                        className={`on-hover-item nav-menu__item ${
                                            activeIndex === 1 ? "active" : ""
                                        }`}
                                    >
                                        <Link to="/shop" className="nav-menu__link">
                                            Sản phẩm
                                        </Link>
                                    </li>
                                    <li
                                        className={`on-hover-item nav-menu__item ${
                                            activeIndex === 2 ? "active" : ""
                                        }`}
                                    >
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
                                        <span className="text-2xl text-zenStore-100 d-flex position-relative item-hover__text">
                                            <i className="ph ph-magnifying-glass" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                            {/* <button
                                ref={menuButtonRef}
                                onClick={handleMenuToggle}
                                type="button"
                                className="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"
                            >
                                <i className="ph ph-list" />
                            </button> */}
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
