import { useEffect, useState } from "react";
import { getCountdown } from "../../helper/Countdown";

const CountDown = () => {
    const [timeLeft, setTimeLeft] = useState(getCountdown());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getCountdown());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex-center mb-24 flex-wrap gap-16 bg-color-one rounded-8 py-16 px-24 position-relative z-1">
            <img
                src="/assets/images/bg/details-offer-bg.png"
                alt=""
                className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1"
            />
            <div className="flex-align gap-16">
                <span className="text-white text-sm">Khuyến mãi đặc biệt:</span>
            </div>
            <div className="countdown" id="countdown11">
                <ul className="countdown-list flex-align flex-wrap">
                    <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium  h-28 rounded-4 border border-main-600 p-3 flex-center">
                        {timeLeft.days}
                        <span className="days">ngày</span>
                    </li>
                    <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium  h-28 rounded-4 border border-main-600 p-3 flex-center">
                        {timeLeft.hours}
                        <span className="hours">giờ</span>
                    </li>
                    <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium h-28 rounded-4 border border-main-600 p-3 flex-center">
                        {timeLeft.minutes}
                        <span className="minutes" />
                        <span className="minutes">phút</span>
                    </li>
                    <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium  h-28 rounded-4 border border-main-600 p-3 flex-center">
                        {timeLeft.seconds}
                        <span className="seconds" />
                        <span className="seconds">giây</span>
                    </li>
                </ul>
            </div>
            <span className="text-white text-xs">đến khi kết thúc chương trình</span>
        </div>
    );
};

export default CountDown;
