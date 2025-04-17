import { useState } from "react";
import BrandTwo from "../../components/brand/BrandTwo";
import ShippingTwo from "../../components/footer/Shipping";
import BannerTwo from "../../components/header/BannerTwo";
import PromotionalTwo from "../../components/promotional/PromotionalTwo";
import DaySaleOne from "../../components/sales/DaySaleOne";
import DealsOne from "../../components/sales/DealsOne";
import TopSellingOne from "../../components/topSelling/TopSellingOne";
import { IApiResponseTable, IApiTable } from "../../apis/interface";
import { IBanner } from "../../apis/banner/banner.interface";
import bannerApi from "../../apis/banner/banner.api";
import { useApi, useAsyncEffect } from "../../hooks";
import { EBannerOrder } from "../../constants/enum";
import Preloader from "../../helper/Preloader";

const HomePage = () => {
    const [bannerList, setBannerList] = useState<IApiTable<IBanner>>();
    const { request: getBannerList } = useApi(bannerApi.getBannerList);

    const getBannerData = async () => {
        await getBannerList(undefined, (response) => {
            const { data } = response as IApiResponseTable<IBanner>;

            setBannerList(data);
        });
    };
    useAsyncEffect(async () => {
        await getBannerData();
    });
    return bannerList ? (
        <>
            {/* BannerTwo */}
            <BannerTwo
                bannerList={bannerList?.data.filter((i) => i.bannerTypeCode === EBannerOrder.ROW_1)}
            />

            {/* PromotionalTwo */}
            <PromotionalTwo
                bannerList={bannerList?.data.filter((i) => i.bannerTypeCode === EBannerOrder.ROW_1)}
            />

            {/* DealsOne */}
            <DealsOne
                bannerList={bannerList?.data.filter((i) => i.bannerTypeCode === EBannerOrder.ROW_3)}
            />

            {/* TopSellingOne */}
            <TopSellingOne />

            {/* DaySaleOne */}
            <DaySaleOne
                bannerList={bannerList?.data.filter((i) => i.bannerTypeCode === EBannerOrder.ROW_4)}
            />

            {/* BrandTwo */}
            <BrandTwo />

            {/* ShippingTwo */}
            <ShippingTwo />
        </>
    ) : (
        <Preloader />
    );
};

export default HomePage;
