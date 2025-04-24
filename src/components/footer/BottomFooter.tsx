import React from "react";

const BottomFooter = () => {
    return (
        <div className="bottom-footer bg-gray-100">
            <div className="container container-lg">
                <div className="bottom-footer__inner flex-between flex-wrap gap-16 py-1">
                    <p className="bottom-footer__text ">
                        Sản phẩm được thực hiện bởi team 3TS. Số hotline:{" "}
                        <a href="tel:0782065079">0782065079</a>
                        &nbsp;mr.Tuấn
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BottomFooter;
