import { Link } from "react-router-dom";
import { IBanner } from "../../apis/banner/banner.interface";

interface IProps {
    bannerList: IBanner[];
}

const DaySaleOne = ({ bannerList }: IProps) => {
    return (
        <section className="day-sale">
            <div className="container container-lg">
                <div className="day-sale-box rounded-16 overflow-hidden flex-between position-relative mb-24 z-1">
                    <img
                        src="/assets/images/bg/day-sale-bg.png"
                        alt=""
                        className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 cover-img"
                    />
                    <div className="d-xl-block d-none">
                        <img
                            style={{ width: "431px", height: "372px" }}
                            src={bannerList[0]?.bannerImage}
                            alt={bannerList[0]?.bannerImage}
                        />
                    </div>
                    <div className="day-sale-box__content d-block w-100 text-start py-32 ps-lg-0 ps-24">
                        <h3 className="text-white fw-medium mb-24">
                             {bannerList[0].bannerTitle}
                        </h3>
                        <Link
                            to="/shop"
                            className="btn btn-outline-white flex-align d-inline-flex rounded-pill gap-8 mt-28"
                            tabIndex={0}
                        >
                            Mua ngay <i className="ph ph-plus text-xl d-flex" />
                        </Link>
                    </div>
                    <div className="d-md-block d-none pe-xxl-5 pe-md-4">
                        <img
                            style={{ width: "607px", height: "303px" }}
                            src={bannerList[1]?.bannerImage}
                            alt={bannerList[1]?.bannerImage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DaySaleOne;
