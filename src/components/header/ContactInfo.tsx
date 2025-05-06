import React from "react";
import "./ContactInfoStyles.css";

const ContactInfo = () => {
    return (
        <div className="contact-info-container">
            <div className="contact-info-item hotline">
                <div className="contact-icon">
                    <i className="ph ph-phone"></i>
                </div>
                <div className="contact-content">
                    <span className="contact-label">Hotline liên hệ</span>
                    <span className="contact-value">𝟎𝟖𝟔.𝟓𝟓𝟎.𝟖𝟖𝟖𝟖</span>
                </div>
            </div>

            <div className="contact-info-item store">
                <div className="contact-icon">
                    <i className="ph ph-map-pin"></i>
                </div>
                <div className="contact-content">
                    <span className="contact-label">Hệ thống</span>
                    <span className="contact-value">02 cửa hàng</span>
                </div>
            </div>
        </div>
    );
};

// Mobile version of the contact info
export const ContactInfoMobile = () => {
    return (
        <div className="contact-info-mobile">
            <div className="contact-info-item-mobile hotline">
                <div className="contact-icon">
                    <i className="ph ph-phone"></i>
                </div>
                <div className="contact-content">
                    <span className="contact-label">Hotline liên hệ</span>
                    <span className="contact-value">𝟎𝟖𝟔.𝟓𝟓𝟎.𝟖𝟖𝟖𝟖</span>
                </div>
            </div>

            <div className="contact-info-item-mobile store">
                <div className="contact-icon">
                    <i className="ph ph-map-pin"></i>
                </div>
                <div className="contact-content">
                    <span className="contact-label">Hệ thống</span>
                    <span className="contact-value">02 cửa hàng</span>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
