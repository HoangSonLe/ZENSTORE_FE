import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer py-80 bg-zenStore-100">
            <div className="container container-lg">
                <div className="d-flex align-items-start justify-content-between flex-wrap">
                    <div className="footer-item max-w-40">
                        <div className="footer-item__logo">
                            <Link to="/">
                                {" "}
                                <img src="/assets/images/logo/logo.png" alt="" />
                            </Link>
                        </div>
                        <p className="text-white mb-24">
                            Marketpro become the largest computer parts, gaming pc parts, and other
                            IT related products.
                        </p>
                        <div className="flex-align gap-16 mb-16">
                            <span className="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0">
                                <i className="ph-fill ph-phone-call" />
                            </span>
                            <Link
                                to="/tel:+00123456789"
                                className="text-md text-white hover-text-main-600"
                            >
                                +00 123 456 789
                            </Link>
                        </div>
                        <div className="flex-align gap-16 mb-16">
                            <span className="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0">
                                <i className="ph-fill ph-envelope" />
                            </span>
                            <Link
                                to="/mailto:support24@marketpro.com"
                                className="text-md text-white hover-text-main-600"
                            >
                                support24@marketpro.com
                            </Link>
                        </div>
                        <div className="flex-align gap-16 mb-16">
                            <span className="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0">
                                <i className="ph-fill ph-map-pin" />
                            </span>
                            <span className="text-md text-white ">
                                789 Inner Lane, California, USA
                            </span>
                        </div>
                    </div>
                    <div className="footer-item max-w-40">
                        <h6 className="text-white">Shop on The Go</h6>
                        <p className="text-white mb-16">Marketpro App is available. Get it now</p>
                        <div className="flex-align gap-8 my-32">
                            <Link to="/https://www.apple.com/store" className="">
                                <img src="/assets/images/thumbs/store-img1.png" alt="" />
                            </Link>
                            <Link to="/https://play.google.com/store/apps?hl=en" className="">
                                <img src="/assets/images/thumbs/store-img2.png" alt="" />
                            </Link>
                        </div>
                        <ul className="flex-align gap-16">
                            <li>
                                <Link
                                    to="/https://www.facebook.com"
                                    className="w-44 h-44 flex-center bg-main-two-50 text-main-two-600 text-xl rounded-8 hover-bg-main-two-600 hover-text-white"
                                >
                                    <i className="ph-fill ph-facebook-logo" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/https://www.twitter.com"
                                    className="w-44 h-44 flex-center bg-main-two-50 text-main-two-600 text-xl rounded-8 hover-bg-main-two-600 hover-text-white"
                                >
                                    <i className="ph-fill ph-twitter-logo" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/https://www.linkedin.com"
                                    className="w-44 h-44 flex-center bg-main-two-50 text-main-two-600 text-xl rounded-8 hover-bg-main-two-600 hover-text-white"
                                >
                                    <i className="ph-fill ph-instagram-logo" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/https://www.pinterest.com"
                                    className="w-44 h-44 flex-center bg-main-two-50 text-main-two-600 text-xl rounded-8 hover-bg-main-two-600 hover-text-white"
                                >
                                    <i className="ph-fill ph-linkedin-logo" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
