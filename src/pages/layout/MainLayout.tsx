// src/layouts/MainLayout.jsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import bannerApi from "../../apis/banner/banner.api";
import { IBanner } from "../../apis/banner/banner.interface";
import { IApiResponseTable } from "../../apis/interface";
import EnhancedBottomFooter from "../../components/footer/EnhancedBottomFooter";
import EnhancedFooter from "../../components/footer/EnhancedFooter";
import Header from "../../components/header/Header";
import ColorInit from "../../helper/ColorInit";
import Preloader from "../../helper/Preloader";
import { useApi, useAsyncEffect } from "../../hooks";
import { changeFavicon } from "../../utils/faviconUtils";
import { EBannerOrder } from "../../constants/enum";
const MainLayout = () => {
    const [logoUrl, setLogoUrl] = useState<string>("/assets/images/logo/logo.png");
    const [logoMiniUrl, setLogoMiniUrl] = useState<string>();

    const { request: getBannerList } = useApi(bannerApi.getBannerList);

    const getBannerData = async () => {
        await getBannerList(undefined, (response) => {
            const { data } = response as IApiResponseTable<IBanner>;
            const logo = data.data.find((i) => i.bannerTypeCode === EBannerOrder.LOGO_SHOP);
            if (logo) {
                setLogoUrl(logo.bannerImage);
            }
            const logoMini = data.data.find((i) => i.bannerTypeCode === EBannerOrder.LOGO_MINI);
            if (logoMini) {
                setLogoMiniUrl(logoMini.bannerImage);
            }
        });
    };
    useAsyncEffect(async () => {
        await getBannerData();
    }, []);

    // Effect to change favicon when logoUrl changes
    useEffect(() => {
        logoMiniUrl && changeFavicon(logoMiniUrl);
    }, [logoMiniUrl]);

    return (
        <div className="main-layout">
            <header>
                <ColorInit color={true} />

                <ScrollToTop smooth color="#FA6400" />

                <Preloader />

                {/* HeaderTwo */}
                <Header logoUrl={logoUrl} />
            </header>
            <main>
                <Outlet /> {/* This is where child routes will be rendered */}
            </main>
            <footer>
                <EnhancedFooter logoUrl={logoUrl} />
                {/* BottomFooter */}
                <EnhancedBottomFooter />
            </footer>
        </div>
    );
};

export default MainLayout;
