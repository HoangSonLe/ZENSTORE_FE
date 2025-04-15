import React from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import ShippingTwo from "../../components/footer/ShippingTwo";
import ShopSection from "../../components/products/ShopSection";
import NewsletterTwo from "../../components/footer/NewsletterTwo";

const ShopPage = () => {
    return (
        <>
            {/* Breadcrumb */}
            <Breadcrumb title={"Shop"} />
            {/* ShopSection */}
            <ShopSection />

            {/* ShippingTwo */}
            <ShippingTwo />
        </>
    );
};

export default ShopPage;
