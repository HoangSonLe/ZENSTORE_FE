import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Shipping from "../../components/footer/Shipping";
import ProductDetailsTwo from "../../components/productDetail/ProductDetailsTwo";

const ProductDetailsPage = () => {

    return (
        <>
            {/* Breadcrumb */}
            <Breadcrumb title={"Product Details"} />

            {/* ProductDetailsTwo */}
            <ProductDetailsTwo />

            {/* ShippingOne */}
            <Shipping />

         
        </>
    );
};

export default ProductDetailsPage;
