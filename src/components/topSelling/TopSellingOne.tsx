import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { IProduct } from "../../apis/product/product.interface";
import ProductItem from "../../pages/homePage/component/ProductItem";
import { IBanner } from "../../apis/banner/banner.interface";

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
                className={` ${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
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
                className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
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
        speed: 1000,
        slidesToShow,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <section className="top-selling-products pt-80" id="featureSection">
            <div className="container container-lg">
                <div className="border border-gray-100 p-24 rounded-16">
                    <div className="section-heading mb-24">
                        <div className="flex-between flex-wrap gap-8">
                            <h5 className="mb-0">Sản phẩm bán chạy</h5>
                        </div>
                    </div>
                    <div className="row g-12">
                        <div className="col-md-4">
                            <div className="position-relative rounded-16 overflow-hidden p-28 z-1 text-center">
                                <img
                                    src="/assets/images/bg/deal-bg.png"
                                    alt=""
                                    className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100"
                                />
                                <div className="py-xl-2">
                                    <h6 className="mb-4 fw-semibold">
                                        {bannerList[0].bannerSubTitle}
                                    </h6>
                                    <h5 className="mb-20 fw-semibold">
                                        {bannerList[0].bannerTitle}
                                    </h5>
                                    <Link
                                        to="/shop"
                                        className="btn text-heading border-neutral-600 hover-bg-neutral-600 hover-text-white py-16 px-24 flex-center d-inline-flex rounded-pill gap-8 fw-medium"
                                        tabIndex={0}
                                    >
                                        Mua ngay{" "}
                                        <i className="ph ph-shopping-cart text-xl d-flex" />
                                    </Link>
                                </div>
                                <div className="d-md-block d-none">
                                    <img
                                        style={{ height: "213px", width: "303px" }}
                                        alt={bannerList[0].bannerImage}
                                        src={bannerList[0].bannerImage}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="top-selling-product-slider arrow-style-two">
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
                </div>
            </div>
        </section>
    );
};

export default TopSellingOne;
