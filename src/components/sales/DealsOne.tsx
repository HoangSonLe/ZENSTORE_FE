import React, { memo } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { IBanner } from "../../apis/banner/banner.interface";
import { IProduct } from "../../apis/product/product.interface";
import ProductItem from "../../pages/homePage/component/ProductItem";

const SampleNextArrow = memo(function SampleNextArrow(props: any) {
    const { className, onClick } = props;
    return (
        <button
            type="button"
            onClick={onClick}
            className={` ${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
        >
            <i className="ph ph-caret-right" />
        </button>
    );
});

const SamplePrevArrow = memo(function SamplePrevArrow(props: any) {
    const { className, onClick } = props;
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
        >
            <i className="ph ph-caret-left" />
        </button>
    );
});
interface IProps {
    bannerList: IBanner[];
    productList: IProduct[];
}
const DealsOne = ({ bannerList, productList }: IProps) => {
    const slidesToShow = Math.min(productList.length, 6);

    const settings = {
        dots: false,
        arrows: true,
        infinite: productList.length > slidesToShow,
        speed: 1000,
        slidesToShow,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1599,
                settings: {
                    slidesToShow: slidesToShow - 1,
                },
            },
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: slidesToShow - 2,
                },
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: slidesToShow - 3,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: slidesToShow - 4,
                },
            },
        ],
    };
    return (
        <section className="deals-weeek pt-80">
            <div className="container container-lg">
                <div className="border border-gray-100 p-24 rounded-16">
                    <div className="section-heading mb-24">
                        <div className="flex-between flex-wrap gap-8">
                            <h5 className="mb-0">Khuyến mãi tuần này</h5>
                        </div>
                    </div>
                    <div className="deal-week-box rounded-16 overflow-hidden position-relative z-1 mb-24">
                        <div style={{ height: "140px" }}>
                            <img
                                src={bannerList[0]?.bannerImage}
                                alt="Weekly sale background"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                    </div>
                    <div className="deals-week-slider arrow-style-two">
                        <Slider {...settings}>
                            {productList.map((i) => (
                                <div key={i.productId}>
                                    <ProductItem product={i} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealsOne;
