import React from "react";
import ScrollToTop from "react-scroll-to-top";
import "./ScrollToTopStyles.css";

const CustomScrollToTop = () => {
    return (
        <ScrollToTop
            smooth
            color="#FF5722"
            className="scroll-to-top"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            svgPath="M12 4l8 8h-6v8h-4v-8H4z"
        />
    );
};

export default CustomScrollToTop;
