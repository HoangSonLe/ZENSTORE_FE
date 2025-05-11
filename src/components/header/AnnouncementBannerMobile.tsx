import React from "react";
import { Link } from "react-router-dom";
import "./AnnouncementBannerMobile.css";

interface AnnouncementBannerMobileProps {
    text: string;
    linkText: string;
    linkUrl: string;
    style?: React.CSSProperties;
}

const AnnouncementBannerMobile: React.FC<AnnouncementBannerMobileProps> = ({ 
    text, 
    linkText, 
    linkUrl, 
    style 
}) => {
    // Check if the URL is external (starts with http:// or https://)
    const isExternalLink = linkUrl.startsWith("http://") || linkUrl.startsWith("https://");

    return (
        <div className="announcement-banner-mobile">
            <div className="container container-lg">
                <div className="announcement-banner-mobile__content">
                    <p className="announcement-banner-mobile__text">
                        <span className="blinking-dot-mobile" aria-hidden="true"></span>
                        <span>{text}</span>
                    </p>
                    {isExternalLink ? (
                        <a
                            href={linkUrl}
                            className="announcement-banner-mobile__link"
                        >
                            {linkText}
                            <i className="ph ph-arrow-right"></i>
                        </a>
                    ) : (
                        <Link to={linkUrl} className="announcement-banner-mobile__link">
                            {linkText}
                            <i className="ph ph-arrow-right"></i>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBannerMobile;
