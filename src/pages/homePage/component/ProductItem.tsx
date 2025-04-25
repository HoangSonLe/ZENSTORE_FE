import { Link } from "react-router-dom";
import { formatVND, getRandomFloat, getRandomInteger } from "../../../utils/numberUtils";
import { IProduct } from "../../../apis/product/product.interface";
import { getTagCssClass } from "../../../components/products/ShopSection";
import { EProductStatus } from "../../../constants/enum";
import { extractSalePercentage } from "../../../utils/productUtils";
import "./ProductItemStyles.css"; // Import custom styles

const ProductItem = ({ product }: { product: IProduct }) => {
    return (
        <div className="product-card">
            <Link
                to={`/product-details/${product.productId}`}
                className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
            >
                <span
                    className={`product-card__badge ${getTagCssClass(
                        product.productStatusCode
                    )} px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0`}
                >
                    {product.productStatusName}
                </span>
                <img
                    src={
                        product.listImage && product.listImage.length > 0
                            ? product.listImage[0]
                            : "/assets/images/placeholder/product-placeholder.svg"
                    }
                    alt={product.productName || "Product image"}
                    className="product-image"
                />
            </Link>
            <div className="product-card__content mt-16">
                <div className="rating-container">
                    <span className="rating-score">{getRandomFloat(3.5, 5)}</span>
                    <span className="star-icon">
                        <i className="ph-fill ph-star" />
                    </span>
                    <span className="rating-count">({getRandomInteger(1, 5)}k)</span>
                </div>
                <h6 className="product-title">
                    <Link
                        to={`/product-details/${product.productId}`}
                        className="product-link"
                        tabIndex={0}
                    >
                        {product.productName}
                    </Link>
                </h6>
                <div className="product-card__price">
                    {product.productPrice == 0 ? (
                        <span className="contact-price">Giá liên hệ</span>
                    ) : product.productPrice !== product.productPriceSale &&
                      product.productPrice &&
                      product.productPriceSale ? (
                        <>
                            <span className="sale-price">
                                {formatVND(product.productPriceSale)}
                            </span>
                            <div className="price-info">
                                <span className="original-price">
                                    {formatVND(product.productPrice)}
                                </span>
                                {String(product.productStatusCode).startsWith(
                                    EProductStatus.SALE
                                ) && (
                                    <span className="discount-tag">
                                        {extractSalePercentage(
                                            String(product.productStatusCode),
                                            product.productStatusName
                                        )}
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <span className="regular-price">{formatVND(product.productPrice)}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
