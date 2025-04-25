import { Link } from "react-router-dom";
import { formatVND, getRandomFloat, getRandomInteger } from "../../../utils/numberUtils";
import { IProduct } from "../../../apis/product/product.interface";
import { EProductStatus } from "../../../constants/enum";
import { extractSalePercentage } from "../../../utils/productUtils";
import "./PremiumProductStyles.css";

// Badge class helper function
const getBadgeClass = (status: EProductStatus | string) => {
    switch (status) {
        case EProductStatus.NEW:
            return "badge-new";
        case EProductStatus.BEST_SELL:
            return "badge-best";
        case EProductStatus.OUT_STOCK:
            return "badge-out";
        default:
            return "badge-sale";
    }
};

interface ProductItemProps {
    product: IProduct;
}

const PremiumProductItem: React.FC<ProductItemProps> = ({ product }) => {
    // Generate random rating data
    const rating = getRandomFloat(3.5, 5);
    const reviewCount = getRandomInteger(1, 5);
    
    // Check if product is on sale
    const isOnSale = product.productPrice !== product.productPriceSale && 
                    product.productPrice && 
                    product.productPriceSale;
    
    // Check if product has a status badge
    const hasBadge = product.productStatusName && product.productStatusName.trim() !== '';
    
    // Check if product has a sale discount
    const hasSaleDiscount = isOnSale && 
                          String(product.productStatusCode).startsWith(EProductStatus.SALE);

    return (
        <div className="premium-product">
            {/* Product Image Section */}
            <div className="premium-product__image-container">
                <img 
                    src={product.listImage[0]} 
                    alt={product.productName || "Product image"} 
                    className="premium-product__image"
                    loading="lazy"
                />
                <div className="premium-product__image-overlay"></div>
                
                {/* Product Badge */}
                {hasBadge && (
                    <span 
                        className={`premium-product__badge ${getBadgeClass(product.productStatusCode)}`}
                    >
                        {product.productStatusName}
                    </span>
                )}
            </div>
            
            {/* Product Content Section */}
            <div className="premium-product__content">
                {/* Product Title */}
                <h3 className="premium-product__title">
                    <Link 
                        to={`/product-details/${product.productId}`} 
                        className="premium-product__title-link"
                    >
                        {product.productName}
                    </Link>
                </h3>
                
                {/* Product Rating */}
                <div className="premium-product__rating">
                    <span className="premium-product__rating-score">{rating.toFixed(1)}</span>
                    <span className="premium-product__rating-star">
                        <i className="ph-fill ph-star" />
                    </span>
                    <span className="premium-product__rating-count">({reviewCount}k)</span>
                </div>
                
                {/* Product Price */}
                <div className="premium-product__price-container">
                    {isOnSale ? (
                        <>
                            <span className="premium-product__sale-price">
                                {formatVND(product.productPriceSale)}
                            </span>
                            <div className="premium-product__price-info">
                                <span className="premium-product__original-price">
                                    {formatVND(product.productPrice)}
                                </span>
                                {hasSaleDiscount && (
                                    <span className="premium-product__discount">
                                        {extractSalePercentage(
                                            String(product.productStatusCode),
                                            product.productStatusName
                                        )}
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <span className="premium-product__regular-price">
                            {formatVND(product.productPrice)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PremiumProductItem;
