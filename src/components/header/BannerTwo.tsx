import { useEffect, useState } from "react";
import Slider from "react-slick";
import { IBanner } from "../../apis/banner/banner.interface";
import "./SliderStyles.css"; // Import custom slider styles

interface IProps {
    bannerList: IBanner[];
}
const BannerTwo = ({ bannerList }: IProps) => {
    // State to trigger re-render on window resize
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Clean up
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    // Custom styles for responsive behavior
    const sliderContainerStyle = {
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
        overflow: "hidden",
    };

    // Responsive slide styles based on screen size
    const getSlideStyle = () => {
        // Responsive styles based on breakpoints
        if (windowWidth < 576) {
            // Extra small devices
            return {
                height: "auto",
                maxHeight: "300px",
                minHeight: "200px",
                aspectRatio: "16/9",
            };
        } else if (windowWidth < 768) {
            // Small devices
            return {
                height: "auto",
                maxHeight: "400px",
                minHeight: "250px",
                aspectRatio: "16/9",
            };
        } else if (windowWidth < 992) {
            // Medium devices
            return {
                height: "auto",
                maxHeight: "500px",
                minHeight: "300px",
                aspectRatio: "16/9",
            };
        } else {
            // Large devices and up
            return {
                height: "auto",
                maxHeight: "600px",
                minHeight: "350px",
                aspectRatio: "16/9",
            };
        }
    };

    // Responsive image styles
    const getImageStyle = () => {
        // Base styles for all screen sizes
        const baseStyles = {
            width: "100%",
            height: "100%",
            objectPosition: "center",
        };

        // Add responsive adjustments
        if (windowWidth < 576) {
            return {
                ...baseStyles,
                objectFit: "contain" as "contain",
            };
        } else {
            return {
                ...baseStyles,
                objectFit: "cover" as "cover",
            };
        }
    };

    const settings = {
        dots: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true, // Enable auto-slide
        autoplaySpeed: 3000,
        arrows: false, // Hide navigation arrows
        adaptiveHeight: true, // Allow height to adapt based on content
        centerMode: false, // Disable center mode for full width
        infinite: true, // Enable infinite looping
        dotsClass: "slick-dots custom-dots", // Add custom class for dots
        customPaging: () => <div className="custom-dot"></div>, // Custom dot rendering
        appendDots: (dots: React.ReactNode) => (
            <div>
                <ul className="custom-dots">{dots}</ul>
            </div>
        ),
        responsive: [
            {
                breakpoint: 1200, // Large screens
                settings: {
                    arrows: false,
                    dots: true,
                },
            },
            {
                breakpoint: 992, // Medium screens
                settings: {
                    arrows: false,
                    dots: true,
                },
            },
            {
                breakpoint: 768, // Small screens
                settings: {
                    arrows: false,
                    dots: true,
                },
            },
            {
                breakpoint: 576, // Extra small screens
                settings: {
                    arrows: false,
                    dots: true,
                    autoplay: true,
                },
            },
        ],
    };
    return bannerList ? (
        <div className="banner-two">
            <div className="container container-lg">
                <div className="banner-two-wrapper">
                    <div
                        className="banner-item-two-wrapper rounded-24 overflow-hidden position-relative arrow-center mb-0"
                        style={sliderContainerStyle}
                    >
                        <div className="banner-item-two__slider responsive-slider-container">
                            <Slider {...settings}>
                                {bannerList.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="text-center"
                                            style={getSlideStyle()}
                                        >
                                            <img
                                                src={item.bannerImage}
                                                alt={item.bannerName || "Banner image"}
                                                className="banner-img mx-auto z-n1 rounded-24"
                                                style={getImageStyle()}
                                            />
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default BannerTwo;
