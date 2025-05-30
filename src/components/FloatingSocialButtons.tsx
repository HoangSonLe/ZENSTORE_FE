import React from "react";
import "./FloatingSocialButtonsStyles.css";

const FloatingSocialButtons = () => {
    return (
        <div className="floating-social-buttons">
            <a
                href="https://www.facebook.com/profile.php?id=100084516681157"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-social-button facebook"
                aria-label="Facebook"
            >
                <i className="ph-fill ph-facebook-logo" />
            </a>
            <a
                href="https://m.me/100084516681157"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-social-button messenger"
                aria-label="Messenger"
            >
                <i className="ph-fill ph-messenger-logo" />
            </a>
            <a
                href="https://www.tiktok.com/@zenstore796khavancan"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-social-button tiktok"
                aria-label="TikTok"
            >
                <i className="ph-fill ph-tiktok-logo" />
            </a>
            <a href="tel:+0777999908" className="floating-social-button phone" aria-label="Call Us">
                <i className="ph-fill ph-phone-call" />
            </a>
        </div>
    );
};

export default FloatingSocialButtons;
