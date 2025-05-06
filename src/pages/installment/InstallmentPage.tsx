import React, { useEffect, useState } from 'react';
import './InstallmentPage.css';

const InstallmentPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Fade-in animation on component mount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`installment-page py-5 ${isVisible ? 'fade-in' : ''}`}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="content-box bg-white rounded">
                            <div className="heading-container">
                                <h1 className="text-center text-danger fw-bold mb-4 animated-text">
                                    TRẢ GÓP ĐIỆN THOẠI - IPAD - APPLE WATCH
                                </h1>
                            </div>

                            <div className="info-section">
                                <h2 className="text-primary fw-bold mb-3 slide-in-right">ZEN STORE</h2>

                                <h3 className="fw-bold mb-3 slide-in-left">HỖ TRỢ GÓP QUA CCCD GẮN CHIP</h3>

                                <div className="installment-options">
                                    <p className="mb-2 fade-in-item">
                                        <span className="text-primary">* TRẢ GÓP 0% Lãi Suất qua thẻ TÍN DỤNG Visa , JCB ,Napas ,Mastercard ,...</span>
                                    </p>

                                    <p className="mb-2 fade-in-item" style={{animationDelay: '0.1s'}}>
                                        <span>⇒ Hỗ Trợ hơn 26 Ngân Hàng liên kết ( VietinBank, FECREDIT, TECHCOMBANK, VPBANK, ...)</span>
                                    </p>

                                    <p className="mb-2 fade-in-item" style={{animationDelay: '0.2s'}}>
                                        <span className="text-primary">* TRẢ GÓP qua Hồ Sơ hỗ trợ:</span>
                                    </p>

                                    <p className="mb-2 fade-in-item" style={{animationDelay: '0.3s'}}>
                                        <span>. Chỉ cần CCCD từ 18 tuổi trở lên </span>
                                        <span className="fw-bold highlight-text">XÉT DUYỆT 15 phút trả lại giấy tờ ngay !</span>
                                    </p>

                                    <p className="mb-4 fade-in-item" style={{animationDelay: '0.4s'}}>
                                        <span className="fw-bold">Công ty tài chính hỗ trợ : HDsaison - Mcredit - Mirae asset - FEcredit- Homecredit</span>
                                    </p>
                                </div>
                            </div>

                            

                            {/* Banner Image Section */}
                            <div className="banner-section mt-4">
                                <div className="banner-image">
                                    <img
                                        src="/assets/images/bg/banner-bg.png"
                                        alt="Trả góp banner"
                                        className="img-fluid rounded shadow-sm"
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
