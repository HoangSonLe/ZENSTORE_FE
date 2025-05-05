import { Link } from "react-router-dom";
import "./FooterStyles.css";

const EnhancedFooter = ({ logoUrl }: { logoUrl: string }) => {
    return (
        <footer className="footer">
            <div className="container container-lg">
                <div className="footer-container">
                    {/* First Column - About & Contact */}
                    <div className="footer-item wide">
                        <Link to="/" className="footer-item__logo">
                            <img src={logoUrl} alt="ZenStore Logo" />
                        </Link>
                        <p className="footer-text">
                            Sản phẩm được khách hàng tin dùng khắp cả nước. Mang lại giá trị và trải
                            nghiệm tuyệt vời dành cho bạn.
                        </p>

                        {/* Phone Numbers */}
                        <div className="contact-item">
                            <span className="contact-icon">
                                <i className="ph-fill ph-phone-call" />
                            </span>
                            <div>
                                <a href="tel:+0777999908" className="contact-link">
                                    0777999908
                                </a>
                                <span className="contact-text"> - </span>
                                <a href="tel:+0865508888" className="contact-link">
                                    0865508888
                                </a>
                            </div>
                        </div>

                        {/* Address 1 */}
                        <div className="contact-item">
                            <span className="contact-icon">
                                <i className="ph-fill ph-map-pin" />
                            </span>
                            <span className="contact-text">
                                CN1: 796 Kha Vạn Cân - P.Linh Đông - TP. Thủ Đức
                            </span>
                        </div>

                        {/* Address 2 */}
                        <div className="contact-item">
                            <span className="contact-icon">
                                <i className="ph-fill ph-map-pin" />
                            </span>
                            <span className="contact-text">
                                CN2: 1207 Phan Văn Trị - P.10 - Q. Gò Vấp
                            </span>
                        </div>
                    </div>

                    {/* Second Column - Social & Apps */}
                    <div className="footer-item">
                        <h6 className="footer-title">Kết nối với ZenStore</h6>
                        <p className="footer-text">Chúng tôi luôn chào đón bạn.</p>

                        {/* Social Media Icons */}
                        <ul className="social-icons">
                            <li>
                                <a
                                    href="https://www.facebook.com/profile.php?id=100084516681157"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon bg-facebook"
                                    aria-label="Facebook"
                                >
                                    <i className="ph-fill ph-facebook-logo" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.tiktok.com/@zenstore796khavancan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon bg-tiktok"
                                    aria-label="TikTok"
                                >
                                    <i className="ph-fill ph-tiktok-logo" />
                                </a>
                            </li>
                        </ul>

                        {/* App Download Badges */}
                        <div className="app-download">
                            <a href="#" className="app-badge">
                                <img src="/assets/images/bg/footer1.png" alt="App Store" />
                            </a>
                            <a href="#" className="app-badge">
                                <img src="/assets/images/bg/footer2.png" alt="Google Play" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default EnhancedFooter;
