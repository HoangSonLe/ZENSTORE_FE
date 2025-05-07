import React, { useEffect, useState } from "react";
import "./InstallmentPage.css";

const InstallmentPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Fade-in animation on component mount
    useEffect(() => {
        setIsVisible(true);

        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`installment-page py-5 ${isVisible ? "fade-in" : ""}`}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                        <div className="content-box bg-white rounded">
                            <div className="heading-container">
                                <h1 className="text-center text-danger fw-bold mb-4 animated-text responsive-title">
                                    <i
                                        className="ph-fill ph-credit-card"
                                        style={{ fontSize: "1.2em", marginBottom: "8px" }}
                                    ></i>
                                    <div className="title-container">
                                        <span className="title-text">MUA TRẢ GÓP</span>
                                        <span className="title-text">
                                            IPHONE - IPAD - APPLE WATCH
                                        </span>
                                    </div>
                                </h1>
                            </div>

                            <div className="info-section">
                                <h3 className="fw-bold mb-4 slide-in-left d-flex align-items-center">
                                    <i
                                        className="ph-fill ph-lightning me-2"
                                        style={{ fontSize: "1.5rem" }}
                                    ></i>
                                    DUYỆT HỒ SƠ NHANH CHÓNG QUA CCCD GẮN CHIP
                                </h3>

                                <div className="installment-options">
                                    <p className="mb-3 fade-in-item">
                                        <span className="text-primary d-flex align-items-center">
                                            <i
                                                className="ph-fill ph-check-circle me-2"
                                                style={{ fontSize: "1.3rem" }}
                                            ></i>
                                            <span style={{ textIndent: "10px", display: "block" }}>
                                                TRẢ GÓP 0% LÃI SUẤT qua thẻ tín dụng Visa, JCB,
                                                Napas, Mastercard và nhiều ngân hàng khác
                                            </span>
                                        </span>
                                    </p>

                                    <p
                                        className="mb-3 fade-in-item"
                                        style={{ animationDelay: "0.1s" }}
                                    >
                                        <span className="d-flex align-items-center">
                                            <i
                                                className="ph-fill ph-bank me-2"
                                                style={{ fontSize: "1.3rem" }}
                                            ></i>
                                            <span style={{ textIndent: "10px", display: "block" }}>
                                                Hỗ trợ hơn 26 ngân hàng liên kết: VietinBank,
                                                Techcombank, VPBank, BIDV, Agribank và nhiều ngân
                                                hàng khác
                                            </span>
                                        </span>
                                    </p>

                                    <p
                                        className="mb-3 fade-in-item"
                                        style={{ animationDelay: "0.2s" }}
                                    >
                                        <span className="text-primary d-flex align-items-center">
                                            <i
                                                className="ph-fill ph-file-text me-2"
                                                style={{ fontSize: "1.3rem" }}
                                            ></i>
                                            <span
                                                style={{
                                                    textIndent: "10px",
                                                    display: "block",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                PHƯƠNG THỨC TRẢ GÓP QUA HỒ SƠ:
                                            </span>
                                        </span>
                                    </p>

                                    <p
                                        className="mb-3 fade-in-item"
                                        style={{ animationDelay: "0.3s" }}
                                    >
                                        <span className="d-flex align-items-center">
                                            <i
                                                className="ph-fill ph-identification-card me-2"
                                                style={{ fontSize: "1.3rem" }}
                                            ></i>
                                            <span style={{ textIndent: "10px", display: "block" }}>
                                                Chỉ cần CCCD gắn chip, độ tuổi từ 18-70
                                            </span>
                                        </span>
                                        <span className="fw-bold highlight-text d-flex align-items-center">
                                            <i
                                                className="ph-fill ph-timer me-2"
                                                style={{ fontSize: "1.2rem" }}
                                            ></i>
                                            DUYỆT HỒ SƠ NHANH TRONG 15 PHÚT!
                                        </span>
                                    </p>

                                    <p
                                        className="mb-4 fade-in-item"
                                        style={{ animationDelay: "0.4s" }}
                                    >
                                        <span className="fw-bold d-flex align-items-center">
                                            <i
                                                className="ph-fill ph-handshake me-2"
                                                style={{ fontSize: "1.3rem" }}
                                            ></i>
                                            <span style={{ textIndent: "10px", display: "block" }}>
                                                Đối tác tài chính: HD Saison, MCredit, Mirae Asset,
                                                FE Credit, Home Credit
                                            </span>
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Banner Image Section */}
                            <div className="banner-section">
                                <div className="banner-image" style={{ maxHeight: "none" }}>
                                    <img
                                        src="/assets/images/bg/banner_gop.png"
                                        alt="Trả góp banner"
                                        className="img-fluid"
                                        loading="lazy"
                                        style={{ height: "100% !important", width: "100%" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstallmentPage;
