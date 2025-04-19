import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getCountdown } from "../../helper/Countdown";
import { IBanner } from "../../apis/banner/banner.interface";
import { IProduct } from "../../apis/product/product.interface";
import { getTagCssClass } from "../products/ShopSection";
import { formatVND, getRandomFloat, getRandomInteger } from "../../utils/numberUtils";
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
    const [timeLeft, setTimeLeft] = useState(getCountdown());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getCountdown());
        }, 1000);

        return () => clearInterval(interval);
    }, []);
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
                            <h5 className="mb-0">Khuyến mãi trong tuần</h5>
                        </div>
                    </div>
                    <div className="deal-week-box rounded-16 overflow-hidden flex-between position-relative z-1 mb-24">
                        <img
                            src="/assets/images/bg/week-deal-bg.png"
                            alt=""
                            className="position-absolute inset-block-start-0 inset-block-start-0 w-100 h-100 z-n1 object-fit-cover"
                        />
                        <div className="d-lg-block d-none ps-32 flex-shrink-0">
                            <img
                                style={{ width: "195px", height: "171px" }}
                                src={bannerList[0]?.bannerImage}
                                alt={bannerList[0]?.bannerImage}
                            />
                        </div>
                        <div className="deal-week-box__content px-sm-4 d-block w-100 text-center">
                            <h6 className="mb-20">Apple AirPods Max, Over Ear Headphones</h6>
                            <div className="countdown mt-20" id="countdown4">
                                <ul className="countdown-list style-four flex-center flex-wrap">
                                    <li className="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-neutral-600">
                                        <span className="days" />
                                        {timeLeft.days} <br /> Ngày
                                    </li>
                                    <li className="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-neutral-600">
                                        <span className="hours" />
                                        {timeLeft.hours} <br /> Giờ
                                    </li>
                                    <li className="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-neutral-600">
                                        <span className="minutes" />
                                        {timeLeft.minutes} <br /> Phút
                                    </li>
                                    <li className="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-neutral-600">
                                        <span className="seconds" />
                                        {timeLeft.seconds} <br /> Giây
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="d-lg-block d-none flex-shrink-0 pe-xl-5">
                            <div className="me-xxl-5">
                                <img
                                    style={{ width: "195px", height: "171px" }}
                                    src={bannerList[1]?.bannerImage}
                                    alt={bannerList[1]?.bannerImage}
                                />
                            </div>
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
