import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Shipping from "../../components/footer/Shipping";
import ShopSection from "../../components/products/ShopSection";

const ShopPage = () => {
    return (
        <>
            {/* Breadcrumb */}
            <Breadcrumb title={"Shop"} />
            {/* ShopSection */}
            <ShopSection />

            {/* ShippingTwo */}
            <Shipping />
        </>
    );
};

export default ShopPage;
