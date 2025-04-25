import { Link } from "react-router-dom";
import { IBanner } from "../../apis/banner/banner.interface";
import "./DaySaleStyles.css";

interface IProps {
    bannerList: IBanner[];
}

const DaySaleOne = ({ bannerList }: IProps) => {
    return (
        <section className="day-sale">
            <div className="container container-lg">
                <div className="day-sale-box rounded-16 overflow-hidden position-relative mb-24 z-1">
                    <img
                        src={bannerList[0]?.bannerImage}
                        alt={bannerList[0]?.bannerName || "Day Sale Banner"}
                        className="w-100 h-100 cover-img"
                    />
                    <Link
                        to="/shop"
                        className="position-absolute inset-0"
                        aria-label={bannerList[0]?.bannerName || "View promotion"}
                    />
                </div>
            </div>
        </section>
    );
};

export default DaySaleOne;
