import { Link } from "react-router-dom";
import Slider from "react-slick";
import { IBanner } from "../../apis/banner/banner.interface";

interface IProps {
    bannerList: IBanner[];
}
const BannerTwo = ({ bannerList }: IProps) => {
    const settings = {
        dots: true,
        // infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true, // Enable auto-slide
        autoplaySpeed: 3000,
    };
    return bannerList ? (
        <div className="banner-two">
            <div className="container container-lg">
                <div className="banner-two-wrapper d-flex align-items-start">
                    <div className="banner-item-two-wrapper rounded-24 overflow-hidden position-relative arrow-center flex-grow-1 mb-0">
                        <div className="banner-item-two__slider">
                            <Slider {...settings}>
                                {bannerList.map((item, index) => {
                                    return (
                                        <img
                                            src={item.bannerImage}
                                            className="banner-img inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1 object-fit-cover rounded-24"
                                        />
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default BannerTwo;
