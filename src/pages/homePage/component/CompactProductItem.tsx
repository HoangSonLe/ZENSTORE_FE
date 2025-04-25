import { Link } from "react-router-dom";
import { formatVND, getRandomFloat, getRandomInteger } from "../../../utils/numberUtils";
import { IProduct } from "../../../apis/product/product.interface";
import { EProductStatus } from "../../../constants/enum";
import { extractSalePercentage } from "../../../utils/productUtils";
import "./CompactProductStyles.css";

// Badge class helper function
const getTagCssClass = (status: EProductStatus | string) => {
    switch (status) {
        case EProductStatus.NEW:
            return "bg-primary-600";
        case EProductStatus.BEST_SELL:
            return "bg-warning-600";
        case EProductStatus.OUT_STOCK:
            return "bg-gray-600";
        default:
            return "bg-danger-600";
    }
};

interface CompactProductItemProps {
    product: IProduct;
}

const CompactProductItem: React.FC<CompactProductItemProps> = ({ product }) => {
    // Generate random rating data
    const rating = getRandomFloat(3.5, 5);
    const reviewCount = getRandomInteger(1, 5);

    return (
        <div className="compact-product">
            {/* Product Image Section */}
            <div className="compact-product__thumb">
                <Link to={`/product-details/${product.productId}`}>
                    <img
                        src={product.listImage[0]}
                        alt={product.productName || "Product image"}
                        className="compact-image"
                        loading="lazy"
                    />
                </Link>
                {product.productStatusName && (
                    <span
                        className={`compact-product__badge ${getTagCssClass(
                            product.productStatusCode
                        )}`}
                    >
                        {product.productStatusName}
                    </span>
                )}
            </div>

            {/* Product Content Section */}
            <div className="compact-product__content">
                {/* Rating */}
                <div className="compact-rating">
                    <span className="compact-rating-score">{rating.toFixed(1)}</span>
                    <span className="compact-star-icon">
                        <i className="ph-fill ph-star" />
                    </span>
                    <span className="compact-rating-count">({reviewCount}k)</span>
                </div>

                {/* Product Title */}
                <h6 className="compact-title">
                    <Link to={`/product-details/${product.productId}`} className="compact-link">
                        {product.productName}
                    </Link>
                </h6>

                {/* Product Price */}
                <div className="compact-product__price">
                    {product.productPrice == 0 ? (
                        <span className="compact-contact-price">Giá liên hệ</span>
                    ) : product.productPrice !== product.productPriceSale &&
                      product.productPrice &&
                      product.productPriceSale ? (
                        <>
                            <span className="compact-sale-price">
                                {formatVND(product.productPriceSale)}
                            </span>
                            <div className="compact-price-info">
                                <span className="compact-original-price">
                                    {formatVND(product.productPrice)}
                                </span>
                                {String(product.productStatusCode).startsWith(
                                    EProductStatus.SALE
                                ) && (
                                    <span className="compact-discount-tag">
                                        {extractSalePercentage(
                                            String(product.productStatusCode),
                                            product.productStatusName
                                        )}
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <span className="compact-regular-price">
                            {formatVND(product.productPrice)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompactProductItem;
