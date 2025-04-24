import { Link } from "react-router-dom";
import { IBanner } from "../../apis/banner/banner.interface";

interface IProps {
    bannerList: IBanner[];
}

const DaySaleOne = ({ bannerList }: IProps) => {
    return (
        <section className="day-sale">
            <div className="container container-lg">
                <div className="day-sale-box rounded-16 overflow-hidden flex-between position-relative mb-24 z-1" style={{ height: "400px" }}>
                    <img
                        src={bannerList[0]?.bannerImage}
                        alt={bannerList[0]?.bannerImage}
                        className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 cover-img"
                    />

                </div>
            </div>
        </section>
    );
};

export default DaySaleOne;
