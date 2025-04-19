import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Shipping from "../../components/footer/Shipping";
import ShopSection from "../../components/products/ShopSection";

const ProductPage = () => {
    return (
        <>
            {/* Breadcrumb */}
            <Breadcrumb title={"Sản phẩm"} />
            {/* ShopSection */}
            <ShopSection />

            {/* ShippingTwo */}
            <Shipping />
        </>
    );
};

export default ProductPage;
