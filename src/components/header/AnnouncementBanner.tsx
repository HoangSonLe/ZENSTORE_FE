import React from "react";
import { Link } from "react-router-dom";
import "./AnnouncementBanner.css";

interface AnnouncementBannerProps {
    text: string;
    linkText: string;
    linkUrl: string;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ text, linkText, linkUrl }) => {
    // Check if the URL is external (starts with http:// or https://)
    const isExternalLink = linkUrl.startsWith("http://") || linkUrl.startsWith("https://");

    return (
        <div className="announcement-banner">
            <div className="container container-lg">
                <div className="announcement-banner__content">
                    <p className="announcement-banner__text">
                        <span className="blinking-dot"></span>
                        {text}
                    </p>
                    {isExternalLink ? (
                        <a
                            href={linkUrl}
                            className="announcement-banner__link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {linkText}
                            <i className="ph ph-arrow-right"></i>
                        </a>
                    ) : (
                        <Link to={linkUrl} className="announcement-banner__link">
                            {linkText}
                            <i className="ph ph-arrow-right"></i>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBanner;
