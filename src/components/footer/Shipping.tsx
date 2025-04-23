const Shipping = () => {
    return (
        <section className="shipping mb-80" id="shipping">
            <div className="container container-lg">
                <div className="row gy-4">
                    <div className="col-xxl-3 col-sm-6">
                        <div className="shipping-item flex-align gap-16 rounded-16 bg-main-two-50 hover-bg-main-100 transition-2">
                            <span className="w-56 h-56 flex-center rounded-circle bg-main-two-600 text-white text-32 flex-shrink-0">
                                <i className="ph-fill ph-car-profile" />
                            </span>
                            <div className="">
                                <h6 className="mb-0">Vận chuyển</h6>
                                <span className="text-sm text-heading">Ship nội thành trong 2h</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-sm-6">
                        <div className="shipping-item flex-align gap-16 rounded-16 bg-main-two-50 hover-bg-main-100 transition-2">
                            <span className="w-56 h-56 flex-center rounded-circle bg-main-two-600 text-white text-32 flex-shrink-0">
                                <i className="ph-fill ph-hand-heart" />
                            </span>
                            <div className="">
                                <h6 className="mb-0">Uy tín</h6>
                                <span className="text-sm text-heading">
                                    Luôn đặt chất lượng hàng đầu
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-sm-6">
                        <div className="shipping-item flex-align gap-16 rounded-16 bg-main-two-50 hover-bg-main-100 transition-2">
                            <span className="w-56 h-56 flex-center rounded-circle bg-main-two-600 text-white text-32 flex-shrink-0">
                                <i className="ph-fill ph-credit-card" />
                            </span>
                            <div className="">
                                <h6 className="mb-0"> Thanh toán </h6>
                                <span className="text-sm text-heading">
                                    Mọi hình thức thanh toán
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-sm-6">
                        <div className="shipping-item flex-align gap-16 rounded-16 bg-main-two-50 hover-bg-main-100 transition-2">
                            <span className="w-56 h-56 flex-center rounded-circle bg-main-two-600 text-white text-32 flex-shrink-0">
                                <i className="ph-fill ph-chats" />
                            </span>
                            <div className="">
                                <h6 className="mb-0">24/7 Hỗ trợ</h6>
                                <span className="text-sm text-heading">Mọi lúc, mọi nơi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Shipping;
