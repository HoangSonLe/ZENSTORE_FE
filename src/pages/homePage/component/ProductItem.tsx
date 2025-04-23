import { Link } from "react-router-dom";
import { formatVND, getRandomFloat, getRandomInteger } from "../../../utils/numberUtils";
import { IProduct } from "../../../apis/product/product.interface";
import { getTagCssClass } from "../../../components/products/ShopSection";
import { EProductStatus } from "../../../constants/enum";

const ProductItem = ({ product }: { product: IProduct }) => {
    return (
        <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
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
                    style={{ width: "232px", height: "180px" }}
                    src={product.listImage[0]}
                    alt={product.listImage[0]}
                    className="w-auto max-w-unset"
                />
            </Link>
            <div className="product-card__content mt-16">
                <div className="flex-align gap-6">
                    <span className="text-xs fw-medium text-gray-500">
                        {getRandomFloat(3.5, 5)}
                    </span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                        <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">
                        ({getRandomInteger(1, 5)}k)
                    </span>
                </div>
                <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                        to={`/product-details/${product.productId}`}
                        className="link text-line-2"
                        tabIndex={0}
                    >
                        {product.productName}
                    </Link>
                </h6>
                <div className="product-card__price my-20">
                    {product.productPrice !== product.productPriceSale &&
                    product.productPrice &&
                    product.productPriceSale ? (
                        <>
                            <span className="text-danger-600 text-md fw-semibold d-block">
                                {formatVND(product.productPriceSale)}
                            </span>
                            <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start gap-2">
                                <span className="text-gray-900 text-md fw-semibold text-decoration-line-through">
                                    {formatVND(product.productPrice)}
                                </span>
                                {String(product.productStatusCode).startsWith(
                                    EProductStatus.SALE
                                ) && (
                                    <span className="text-danger-600 text-md fw-semibold ps-sm-3">
                                        {product.productStatusName}
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <span className="text-gray-900 text-md fw-semibold">
                            {formatVND(product.productPrice)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
