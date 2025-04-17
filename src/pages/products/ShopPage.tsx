import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Shipping from "../../components/footer/Shipping";
import ShopSection from "../../components/products/ShopSection";

const ShopPage = () => {
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

export default ShopPage;
