import React from "react";
import { Link } from "react-router-dom";
import "./FooterStyles.css";

const EnhancedBottomFooter = () => {
    return (
        <div className="bottom-footer">
            <div className="container container-lg">
                <div className="bottom-footer__inner">
                    <p className="bottom-footer__text">
                        © {new Date().getFullYear()} ZenStore. All rights reserved.
                    </p>
                    <p className="bottom-footer__text">
                        Designed and developed by <Link to="/">ZenStore Team</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EnhancedBottomFooter;
