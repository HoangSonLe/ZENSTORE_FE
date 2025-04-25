import { useEffect, useState } from "react";
import { getCountdown } from "../../helper/Countdown";
import "./InlineCountDownStyles.css";

const InlineCountDown = () => {
    const [timeLeft, setTimeLeft] = useState(getCountdown());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getCountdown());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="inline-countdown-container">
            <span className="inline-special-offer">Khuyến mãi đặc biệt:</span>
            <div className="inline-countdown">
                <span className="inline-time-unit">{timeLeft.days}<small>ngày</small></span>
                <span className="inline-separator">:</span>
                <span className="inline-time-unit">{timeLeft.hours}<small>giờ</small></span>
                <span className="inline-separator">:</span>
                <span className="inline-time-unit">{timeLeft.minutes}<small>phút</small></span>
                <span className="inline-separator">:</span>
                <span className="inline-time-unit">{timeLeft.seconds}<small>giây</small></span>
            </div>
            <span className="inline-end-text">đến khi kết thúc chương trình</span>
        </div>
    );
};

export default InlineCountDown;
