import React from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import ShippingOne from "../../components/footer/ShippingOne";
import NewsletterTwo from "../../components/footer/NewsletterTwo";
import ProductDetailsTwo from "../../components/productDetail/ProductDetailsTwo";

const ProductDetailsPage = () => {

    return (
        <>
            {/* Breadcrumb */}
            <Breadcrumb title={"Product Details"} />

            {/* ProductDetailsTwo */}
            <ProductDetailsTwo />

            {/* ShippingOne */}
            <ShippingOne />

         
        </>
    );
};

export default ProductDetailsPage;
