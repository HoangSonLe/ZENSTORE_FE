import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Shipping from "../../components/footer/Shipping";
import ProductDetails from "../../components/productDetail/ProductDetails";

const ProductDetailsPage = ({ productId }: { productId: number }) => {
    const { productParamId } = useParams<{ productParamId: string }>();
    return (
        <>
            {/* Breadcrumb */}
            <Breadcrumb title={"Chi tiết sản phẩm"} />

            {/* ProductDetailsTwo */}
            <ProductDetails productId={productId ?? productParamId} />

            {/* ShippingOne */}
            <Shipping />
        </>
    );
};

export default ProductDetailsPage;
