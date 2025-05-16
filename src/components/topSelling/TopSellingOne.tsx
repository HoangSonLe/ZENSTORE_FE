import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { IProduct } from "../../apis/product/product.interface";
import ProductItem from "../../pages/homePage/component/ProductItem";
import { IBanner } from "../../apis/banner/banner.interface";
import "./TopSellingStyles.css";

interface IProps {
    productList: IProduct[];
    bannerList: IBanner[];
}
const TopSellingOne = ({ productList, bannerList }: IProps) => {
    function SampleNextArrow(props: any) {
        const { className, onClick } = props;
        return (
            <button
                type="button"
                onClick={onClick}
                className={`${className} slick-next slick-arrow`}
                aria-label="Next slide"
            >
                <i className="ph ph-caret-right" />
            </button>
        );
    }

    function SamplePrevArrow(props: any) {
        const { className, onClick } = props;
        return (
            <button
                type="button"
                onClick={onClick}
                className={`${className} slick-prev slick-arrow`}
                aria-label="Previous slide"
            >
                <i className="ph ph-caret-left" />
            </button>
        );
    }
    const slidesToShow = Math.min(productList.length, 6);

    const settings = {
        dots: false,
        arrows: true,
        infinite: (productList ?? []).length > slidesToShow,
        speed: 800,
        slidesToShow: Math.min(3, slidesToShow), // Limit to 4 slides maximum
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };
    return (
        <section className="top-selling-products" id="featureSection">
            <div className="container container-lg">
                <div className="top-selling-container">
                    <div className="section-heading">
                        <div className="flex-between flex-wrap gap-8">
                            <h5>Sản phẩm bán chạy</h5>
                        </div>
                    </div>
                    <div className="row g-12 h-100">
                        <div className="col-md-4 d-flex">
                            <div className="banner-section w-100">
                                <img
                                    src={bannerList[0].bannerImage}
                                    alt="Background"
                                    className="banner-bg"
                                />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="slider-section h-100">
                                <Slider {...settings}>
                                    {productList.map((product) => (
                                        <div key={product.productId} className="slider-item">
                                            <ProductItem product={product} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopSellingOne;
