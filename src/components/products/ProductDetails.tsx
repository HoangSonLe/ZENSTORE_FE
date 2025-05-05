import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { IApiResponse } from "../../apis/interface";
import productApi from "../../apis/product/product.api";
import { IProduct } from "../../apis/product/product.interface";
import Preloader from "../../helper/Preloader";
import { useApi } from "../../hooks";
import { formatVND } from "../../utils/numberUtils";
import InlineCountDown from "./InlineCountDown";
import { EProductStatus } from "../../constants/enum";
import "./ProductDetailsStyles.css";

const ProductDetails = ({ productId }: { productId: number }) => {
    const [productData, setProductData] = useState<IProduct>();
    const { request: getProductDetail } = useApi(productApi.getProductDetail);

    const getProductData = async () => {
        await getProductDetail(
            {
                params: {
                    productId: productId,
                },
            },
            (response) => {
                const { data } = response as IApiResponse<IProduct>;

                setProductData(data);
            }
        );
    };

    useEffect(() => {
        getProductData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    const productImages = useMemo(
        () => (productData && productData.listImage ? productData.listImage : []),
        [productData]
    );
    useEffect(() => {
        setMainImage(productImages?.length > 0 ? productImages[0] : "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productData]);

    const [mainImage, setMainImage] = useState(productImages?.length > 0 ? productImages[0] : "");
    const slidesToShow = Math.min(productImages.length, 4);
    const settingsThumbs = {
        dots: false,
        infinite: productImages.length > slidesToShow,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        focusOnSelect: true,
    };
    return productData ? (
        <section className="product-details py-80">
            <div className="container container-lg">
                <div className="row gy-4">
                    <div className="col-xl-12">
                        <div className="row gy-4">
                            <div className="col-xl-6">
                                <div className="product-details__left">
                                    <div className="product-details__thumb-slider border border-gray-100 rounded-16">
                                        <div className="">
                                            <div className="product-details__thumb flex-center h-100">
                                                <img src={mainImage} alt="Main Product" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-24">
                                        <div className="product-details__images-slider">
                                            <Slider {...settingsThumbs}>
                                                {productImages.map((image, index) => (
                                                    <div
                                                        className="center max-w-120 max-h-120 h-100 flex-center border border-gray-100 rounded-16 p-8"
                                                        key={index}
                                                        onClick={() => setMainImage(image)}
                                                    >
                                                        <img
                                                            className="thumb"
                                                            src={image}
                                                            alt={`Thumbnail ${index}`}
                                                        />
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>
                                    </div>
                                    {/* Product Short Description */}
                                    <div className="product-short-description">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: productData.productShortDetail,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="product-details__content">
                                    <InlineCountDown />
                                    <h5 className="mb-12">{productData.productName}</h5>

                                    {productData.productPrice == 0 ? (
                                        <div className="my-32 flex-align gap-16 flex-wrap">
                                            <div className="flex-align gap-8">
                                                <h6 className="mb-0 contact-price">Giá liên hệ</h6>
                                            </div>
                                        </div>
                                    ) : productData.productPrice !== productData.productPriceSale &&
                                      productData.productPrice &&
                                      productData.productPriceSale ? (
                                        <div className="my-32 flex-align gap-16 flex-wrap">
                                            <div className="flex-align gap-8">
                                                {productData.productStatusCode.startsWith(
                                                    EProductStatus.SALE
                                                ) ? (
                                                    <div className="flex-align gap-8 text-main-two-600">
                                                        <i className="ph-fill ph-seal-percent text-xl" />
                                                        {productData.productStatusName}
                                                    </div>
                                                ) : null}
                                                <h6 className="mb-0 text-danger-600">
                                                    {formatVND(productData.productPriceSale)}
                                                </h6>
                                            </div>
                                            <div className="flex-align gap-8">
                                                <h6 className="text-xl text-gray-400 mb-0 fw-medium text-decoration-line-through">
                                                    {formatVND(productData.productPrice)}
                                                </h6>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="my-32 flex-align gap-16 flex-wrap">
                                            <div className="flex-align gap-8">
                                                <h6 className="mb-0">
                                                    {formatVND(productData.productPrice)}
                                                </h6>
                                            </div>
                                        </div>
                                    )}

                                    {/* Contact Info Box */}
                                    <div className="contact-info-box">
                                        <div className="contact-info-box__icon">
                                            <i className="ph-fill ph-phone"></i>
                                        </div>
                                        <div className="contact-info-box__content">
                                            <div className="contact-info-box__title">
                                                Tư vấn mua hàng miễn phí
                                            </div>
                                            <div className="contact-info-box__phone">
                                                𝟎𝟕𝟕𝟕.𝟗𝟗𝟗𝟗.𝟎𝟖 - 𝟎𝟖𝟔.𝟓𝟓𝟎.𝟖𝟖𝟖𝟖
                                            </div>
                                            <div className="contact-info-box__hours">
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Warranty Box */}
                                    <div className="warranty-box">
                                        <div className="warranty-box__header">
                                            <i className="ph-fill ph-shield-check"></i>
                                            BẢO HÀNH
                                        </div>
                                        <div className="warranty-box__content">
                                            <div className="warranty-item">
                                                <div className="warranty-item__icon">
                                                    <i className="ph-fill ph-check-circle"></i>
                                                </div>
                                                <div className="warranty-item__text">
                                                    01 đổi 01 trong 30 ngày cho tất cả các lỗi do
                                                    máy phát sinh. (07 ngày đối với máy mới).
                                                </div>
                                            </div>
                                            <div className="warranty-item">
                                                <div className="warranty-item__icon">
                                                    <i className="ph-fill ph-check-circle"></i>
                                                </div>
                                                <div className="warranty-item__text">
                                                    Bảo hành pin trọn đời.
                                                </div>
                                            </div>
                                            <div className="warranty-item">
                                                <div className="warranty-item__icon">
                                                    <i className="ph-fill ph-check-circle"></i>
                                                </div>
                                                <div className="warranty-item__text">
                                                    Bảo hành phần cứng mainboard máy 12 tháng.
                                                </div>
                                            </div>
                                            <div className="warranty-item">
                                                <div className="warranty-item__icon">
                                                    <i className="ph-fill ph-check-circle"></i>
                                                </div>
                                                <div className="warranty-item__text">
                                                    Bảo hành nâng cấp phần mềm trọn đời.
                                                </div>
                                            </div>
                                            <div className="warranty-item">
                                                <div className="warranty-item__icon">
                                                    <i className="ph-fill ph-check-circle"></i>
                                                </div>
                                                <div className="warranty-item__text">
                                                    Bảo hành phụ kiện suốt thời gian dùng máy.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Promotion Box */}
                                    <div className="promotion-box">
                                        <div className="promotion-box__header">
                                            <i className="ph-fill ph-gift"></i>
                                            KHUYẾN MÃI
                                        </div>
                                        <div className="promotion-box__content">
                                            <div className="promotion-item">
                                                <div className="promotion-item__icon">
                                                    <i className="ph-fill ph-check-circle"></i>
                                                </div>
                                                <div className="promotion-item__text">
                                                    Tặng củ, cáp sạc.
                                                </div>
                                            </div>
                                            <div className="promotion-item">
                                                <div className="promotion-item__icon">
                                                    <i className="ph-fill ph-check-circle"></i>
                                                </div>
                                                <div className="promotion-item__text">
                                                    Tặng 200.000đ khi đặt hàng trước.
                                                </div>
                                            </div>
                                            <div className="promotion-item">
                                                <div className="promotion-item__icon">
                                                    <i className="ph-fill ph-check-circle"></i>
                                                </div>
                                                <div className="promotion-item__text">
                                                    Thu cũ đổi mới 95% giá bán tại Web.
                                                </div>
                                            </div>
                                            <div className="promotion-item">
                                                <div className="promotion-item__icon">
                                                    <i className="ph-fill ph-check-circle"></i>
                                                </div>
                                                <div className="promotion-item__text">
                                                    Tặng sạc cáp chính hãng , tai nghe.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-80">
                    <div className="product-dContent border rounded-24">
                        <div className="product-dContent__header border-bottom border-gray-100 flex-between flex-wrap gap-16">
                            <ul
                                className="nav common-tab nav-pills mb-3"
                                id="pills-tab"
                                role="tablist"
                            >
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link active"
                                        id="pills-description-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#pills-description"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-description"
                                        aria-selected="true"
                                    >
                                        Mô tả
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="product-dContent__box">
                            <div className="tab-content" id="pills-tabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="pills-description"
                                    role="tabpanel"
                                    aria-labelledby="pills-description-tab"
                                    tabIndex={0}
                                >
                                    {
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: productData.productDetail,
                                            }}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ) : (
        <Preloader />
    );
};

export default ProductDetails;
