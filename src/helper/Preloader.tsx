import React, { useEffect, useState } from "react";

const Preloader = () => {
    let [active, setActive] = useState(true);
    useEffect(() => {
        setTimeout(function () {
            setActive(false);
        }, 500);
    }, []);

    return (
        <>
            {active ? (
                <div className="preloader">
                    <img
                        width={100}
                        height={100}
                        src="/assets/images/logo/logo-admin.jpg"
                        alt=""
                        className="rounded-circle shadow-sm"
                        style={{ objectFit: "cover" }}
                    />
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default Preloader;
