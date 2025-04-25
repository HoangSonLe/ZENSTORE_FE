import { useEffect, useState } from "react";
import { getCountdown } from "../../helper/Countdown";
import "./CountDownStyles.css";

const CountDown = () => {
    const [timeLeft, setTimeLeft] = useState(getCountdown());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getCountdown());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="countdown-container">
            <span className="special-offer">Khuyến mãi đặc biệt:</span>
            <div className="countdown">
                <ul className="countdown-list">
                    <li className="countdown-list__item">
                        {timeLeft.days}
                        <span>ngày</span>
                    </li>
                    <li className="countdown-list__item">
                        {timeLeft.hours}
                        <span>giờ</span>
                    </li>
                    <li className="countdown-list__item">
                        {timeLeft.minutes}
                        <span>phút</span>
                    </li>
                    <li className="countdown-list__item">
                        {timeLeft.seconds}
                        <span>giây</span>
                    </li>
                </ul>
            </div>
            <span className="end-text">đến khi kết thúc chương trình</span>
        </div>
    );
};

export default CountDown;
