import React, { useState, useEffect } from "react";
import "./apple-animation.css";

const AppleAnimation: React.FC = () => {
    const [animationActive, setAnimationActive] = useState(false);

    // Trigger the eating animation every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationActive(true);

            // Reset animation after it completes
            setTimeout(() => {
                setAnimationActive(false);
            }, 3000); // Animation duration is 6 seconds
        }, 10000); // Trigger every 15 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="apple-animation-container d-flex align-items-center"
            style={{
                margin: "auto",
                position: "relative",
                overflow: "visible",
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            {/* Apple logo that will eat the text */}

            {/* Text that will be eaten */}
            <div className={`animated-text-container ms-2 ${animationActive ? "being-eaten" : ""}`}>
                <p
                    className="animated-text text-white mb-0"
                    style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        letterSpacing: "0.5px",
                        whiteSpace: "nowrap",
                    }}
                >
                    <span>M</span>
                    <span>a</span>
                    <span>n</span>
                    <span>g</span>
                    <span>&nbsp;</span>
                    <span>l</span>
                    <span>ạ</span>
                    <span>i</span>
                    <span>&nbsp;</span>
                    <span>t</span>
                    <span>r</span>
                    <span>ả</span>
                    <span>i</span>
                    <span>&nbsp;</span>
                    <span>n</span>
                    <span>g</span>
                    <span>h</span>
                    <span>i</span>
                    <span>ệ</span>
                    <span>m</span>
                    <span>&nbsp;</span>
                    <span>t</span>
                    <span>ố</span>
                    <span>t</span>
                    <span>&nbsp;</span>
                    <span>n</span>
                    <span>h</span>
                    <span>ấ</span>
                    <span>t</span>
                    {/* <span>&nbsp;</span>
          <span>d</span>
          <span>à</span>
          <span>n</span>
          <span>h</span>
          <span>&nbsp;</span>
          <span>c</span>
          <span>h</span>
          <span>o</span>
          <span>&nbsp;</span>
          <span>b</span>
          <span>ạ</span>
          <span>n</span> */}
                </p>
            </div>
        </div>
    );
};

export default AppleAnimation;
