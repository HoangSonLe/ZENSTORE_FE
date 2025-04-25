import React from "react";
import { Link } from "react-router-dom";
import "./FooterStyles.css";

const EnhancedBottomFooter = () => {
    return (
        <div className="bottom-footer">
            <div className="container container-lg">
                <div className="bottom-footer__inner">
                    <div className="bottom-footer__left">
                        <p className="bottom-footer__text">
                            © {new Date().getFullYear()} Team 3TS.
                        </p>
                        <p className="bottom-footer__text">
                            Phần mềm được thiết kế và phát triển bởi <Link to="/">3TS Team</Link>
                        </p>
                    </div>

                    <div className="bottom-footer__contact">
                        <div className="contact-number">
                            <span className="contact-number__icon">
                                <i className="ph ph-phone"></i>
                            </span>
                            <div className="contact-number__content">
                                <p className="contact-number__label">Số hotline:</p>
                                <a href="tel:0782065079" className="contact-number__value">
                                    0782065079
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnhancedBottomFooter;
