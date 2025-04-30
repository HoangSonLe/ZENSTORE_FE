import { Link } from "react-router-dom";
import { IBanner } from "../../apis/banner/banner.interface";

interface IProps {
    bannerList: IBanner[];
}

const PromotionalTwo = ({ bannerList }: IProps) => {
    return bannerList ? (
        <section className="promotional-banner mt-32">
            <div className="container container-lg">
                <div className="row gy-4">
                    <div className="col-lg-4 col-sm-6">
                        <div className="position-relative rounded-16 overflow-hidden z-1 p-32">
                            <img
                                src="/assets/images/bg/promo-bg-img1.png"
                                alt=""
                                className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1"
                            />
                            <div className="flex-between flex-wrap gap-16">
                                <div className="">
                                    <span className="text-heading text-sm mb-8">
                                        {bannerList[0]?.bannerSubTitle}
                                    </span>
                                    <h6 className="mb-0">{bannerList[0]?.bannerTitle}</h6>
                                    <Link
                                        to="/shop"
                                        className="d-inline-flex align-items-center gap-8 mt-16 text-heading text-md fw-medium border border-top-0 border-end-0 border-start-0 border-gray-900 hover-text-main-two-600 hover-border-main-two-600"
                                    >
                                        Mua ngay
                                        <span className="icon text-md d-flex">
                                            <i className="ph ph-plus" />
                                        </span>
                                    </Link>
                                </div>
                                <div className="pe-xxl-4">
                                    <img
                                        style={{ width: "98px", height: "115px" }}
                                        src={bannerList[0]?.bannerImage}
                                        alt={bannerList[0]?.bannerImage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="position-relative rounded-16 overflow-hidden z-1 p-32">
                            <img
                                src="/assets/images/bg/promo-bg-img2.png"
                                alt=""
                                className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1"
                            />
                            <div className="flex-between flex-wrap gap-16">
                                <div className="">
                                    <span className="text-heading text-sm mb-8">
                                        {bannerList[1]?.bannerSubTitle}
                                    </span>
                                    <h6 className="mb-0">{bannerList[1]?.bannerTitle}</h6>
                                    <Link
                                        to="/shop"
                                        className="d-inline-flex align-items-center gap-8 mt-16 text-heading text-md fw-medium border border-top-0 border-end-0 border-start-0 border-gray-900 hover-text-main-two-600 hover-border-main-two-600"
                                    >
                                        Mua ngay
                                        <span className="icon text-md d-flex">
                                            <i className="ph ph-plus" />
                                        </span>
                                    </Link>
                                </div>
                                <div className="pe-xxl-4">
                                    <img
                                        style={{ width: "98px", height: "115px" }}
                                        src={bannerList[1]?.bannerImage}
                                        alt={bannerList[1]?.bannerImage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="position-relative rounded-16 overflow-hidden z-1 p-32">
                            <img

                                src={bannerList[2]?.bannerImage}
                                alt=""
                                className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1"
                            />
                            <div className="flex-between flex-wrap gap-16">
                               
                                <div className="pe-xxl-4"  style={{ width: "98px", height: "115px" }}>
                                    {/* <img
                                        style={{ width: "98px", height: "115px" }}
                                        src={bannerList[2]?.bannerImage}
                                        alt={bannerList[2]?.bannerImage}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ) : null;
};

export default PromotionalTwo;
