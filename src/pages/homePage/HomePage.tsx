import { useMemo, useState } from "react";
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
import { EBannerOrder, EProductStatus } from "../../constants/enum";
import Preloader from "../../helper/Preloader";
import productApi from "../../apis/product/product.api";
import { IProduct } from "../../apis/product/product.interface";

const HomePage = () => {
    const [bannerList, setBannerList] = useState<IApiTable<IBanner>>();
    const [productList, setProductList] = useState<IApiTable<IProduct>>();
    const { request: getBannerList } = useApi(bannerApi.getBannerList);
    const { request: getProductList } = useApi(productApi.getProductList);

    const getBannerData = async () => {
        await getBannerList(undefined, (response) => {
            const { data } = response as IApiResponseTable<IBanner>;

            setBannerList(data);
        });
    };
    const getProductData = async () => {
        await getProductList(
            {
                params: {
                    pageNumber: 1,
                    pageSize: 10,
                    statusCodes: [
                        EProductStatus.NEW,
                        EProductStatus.SALE,
                        EProductStatus.SALE10,
                        EProductStatus.SALE20,
                        EProductStatus.SALE30,
                        EProductStatus.BEST_SELL,
                    ],
                },
            },
            (response) => {
                const { data } = response as IApiResponseTable<IProduct>;

                setProductList(data);
            }
        );
    };
    useAsyncEffect(async () => {
        await getBannerData();
        await getProductData();
    }, []);
    const dealProductList = useMemo(
        () =>
            productList?.data?.filter(
                (i) => i.productStatusCode !== (EProductStatus.BEST_SELL as string)
            ),
        [productList]
    );
    const topProductList = useMemo(
        () =>
            productList?.data?.filter(
                (i) => i.productStatusCode === (EProductStatus.BEST_SELL as string)
            ),
        [productList]
    );
    return bannerList ? (
        <>
            {/* BannerTwo */}
            <BannerTwo
                bannerList={bannerList?.data.filter((i) => i.bannerTypeCode === EBannerOrder.ROW_1)}
            />

            {/* PromotionalTwo */}
            <PromotionalTwo
                bannerList={bannerList?.data.filter((i) => i.bannerTypeCode === EBannerOrder.ROW_2)}
            />

            {/* DealsOne */}
            {dealProductList && dealProductList.length > 0 && (
                <DealsOne
                    bannerList={bannerList?.data.filter(
                        (i) => i.bannerTypeCode === EBannerOrder.ROW_3
                    )}
                    productList={dealProductList}
                />
            )}

            {/* TopSellingOne */}
            {topProductList && topProductList.length > 0 && (
                <TopSellingOne
                    productList={topProductList}
                    bannerList={bannerList?.data.filter(
                        (i) => i.bannerTypeCode === EBannerOrder.ROW_4
                    )}
                />
            )}

            {/* DaySaleOne */}
            <DaySaleOne
                bannerList={bannerList?.data.filter((i) => i.bannerTypeCode === EBannerOrder.ROW_5)}
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
