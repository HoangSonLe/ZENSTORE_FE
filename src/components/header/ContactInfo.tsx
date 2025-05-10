import React from "react";
import "./ContactInfoStyles.css";

const ContactInfo = () => {
    // Function to scroll to footer store addresses
    const scrollToStoreAddresses = () => {
        const storeAddressElement = document.querySelector(".footer .contact-item:nth-of-type(2)");
        if (storeAddressElement) {
            storeAddressElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="contact-info-container">
            <div className="contact-info-item hotline">
                <div className="contact-icon">
                    <i className="ph ph-phone"></i>
                </div>
                <div className="contact-content">
                    <a href="tel:0777999908" className="contact-value phone-link">
                        0777999908
                    </a>
                    <a href="tel:0865508888" className="contact-value phone-link">
                        0865508888
                    </a>
                </div>
            </div>

            <div
                className="contact-info-item store"
                onClick={scrollToStoreAddresses}
                style={{ cursor: "pointer" }}
            >
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
    // Function to scroll to footer store addresses
    const scrollToStoreAddresses = () => {
        const storeAddressElement = document.querySelector(".footer .contact-item:nth-of-type(2)");
        if (storeAddressElement) {
            storeAddressElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="contact-info-mobile">
            <div className="contact-info-item-mobile hotline">
                <div className="contact-icon">
                    <i className="ph ph-phone"></i>
                </div>
                <div className="contact-content">
                    <a href="tel:0777999908" className="contact-value phone-link">
                        0777999908
                    </a>
                    <a href="tel:0865508888" className="contact-value phone-link">
                        0865508888
                    </a>
                </div>
            </div>

            <div
                className="contact-info-item-mobile store"
                onClick={scrollToStoreAddresses}
                style={{ cursor: "pointer" }}
            >
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
