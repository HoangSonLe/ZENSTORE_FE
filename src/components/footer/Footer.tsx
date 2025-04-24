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
                            Sản phẩm được khách hàng tin dùng khắp cả nước. Mang lại giá trị và trải
                            nghiệm tuyệt vời dành cho bạn.
                        </p>
                        <div className="flex-align gap-16 mb-16">
                            <span className="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0">
                                <i className="ph-fill ph-phone-call" />
                            </span>
                            <a
                                href="tel:+0777999908"
                                className="text-md text-white hover-text-main-600"
                            >
                                0777999908
                            </a>
                            <span className="text-white">-</span>
                            <a
                                href="tel:+0865508888"
                                className="text-md text-white hover-text-main-600"
                            >
                                0865508888
                            </a>
                        </div>
                        <div className="flex-align gap-16 mb-16">
                            <span className="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0">
                                <i className="ph-fill ph-map-pin" />
                            </span>
                            <span className="text-md text-white ">
                                CN1: 796 Kha Vạn Cân - P.Linh Đông - TP. Thủ Đức
                            </span>
                        </div>
                        <div className="flex-align gap-16 mb-16">
                            <span className="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0">
                                <i className="ph-fill ph-map-pin" />
                            </span>
                            <span className="text-md text-white ">
                                CN2: 1207 Phan Văn Trị - P.10 - Q. Gò Vấp
                            </span>
                        </div>
                    </div>
                    <div className="footer-item max-w-40">
                        <h6 className="text-white">Kết nối với ZenStore</h6>
                        <p className="text-white mb-16">Chúng tôi luôn chào đón bạn.</p>

                        <ul className="flex-align gap-16">
                            <li>
                                <a
                                    href="https://www.facebook.com/profile.php?id=100084516681157"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-44 h-44 flex-center bg-facebook text-white text-xl rounded-8 hover-opacity-80"
                                >
                                    <i className="ph-fill ph-facebook-logo" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.tiktok.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-44 h-44 flex-center bg-tiktok text-white text-xl rounded-8 hover-opacity-80"
                                >
                                    <i className="ph-fill ph-tiktok-logo" />
                                </a>
                            </li>
                        </ul>
                        <div className="flex-align gap-8 my-32">
                            <div className="">
                                <img
                                    style={{ width: "138px", height: "40px" }}
                                    src="/assets/images/bg/footer1.png"
                                    alt=""
                                    // className="img-fluid rounded"
                                />
                            </div>
                            <div className="">
                                <img
                                    style={{ width: "138px", height: "40px" }}
                                    src="/assets/images/bg/footer2.png"
                                    alt=""
                                    // className="img-fluid rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
