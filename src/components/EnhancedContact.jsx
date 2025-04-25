import React from "react";
import { Link } from "react-router-dom";
import "./ContactStyles.css";

const EnhancedContact = () => {
    return (
        <section className="contact">
            <div className="container container-lg">
                <div className="row gy-5">
                    <div className="col-lg-8">
                        <div className="contact-box">
                            <form action="#">
                                <h6>Make Custom Request</h6>
                                <div className="row gy-4">
                                    <div className="col-sm-6 col-xs-6">
                                        <label htmlFor="name">
                                            Full Name <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="common-input"
                                            id="name"
                                            placeholder="Full name"
                                        />
                                    </div>
                                    <div className="col-sm-6 col-xs-6">
                                        <label htmlFor="email">
                                            Email <span>*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="common-input"
                                            id="email"
                                            placeholder="Email address"
                                        />
                                    </div>
                                    <div className="col-sm-6 col-xs-6">
                                        <label htmlFor="phone">
                                            Phone Number <span>*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            className="common-input"
                                            id="phone"
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                    <div className="col-sm-6 col-xs-6">
                                        <label htmlFor="subject">
                                            Subject <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="common-input"
                                            id="subject"
                                            placeholder="Subject"
                                        />
                                    </div>
                                    <div className="col-sm-12">
                                        <label htmlFor="message">
                                            Message <span>*</span>
                                        </label>
                                        <textarea
                                            className="common-input"
                                            id="message"
                                            placeholder="Type your message"
                                            defaultValue={""}
                                        />
                                    </div>
                                    <div className="col-sm-12 mt-4">
                                        <button type="submit" className="btn-main">
                                            Get a Quote
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="contact-box">
                            <h6>Get In Touch</h6>
                            <div className="contact-info">
                                <span className="contact-icon">
                                    <i className="ph-fill ph-phone-call" />
                                </span>
                                <a href="tel:+00123456789" className="contact-text">
                                    +00 123 456 789
                                </a>
                            </div>
                            <div className="contact-info">
                                <span className="contact-icon">
                                    <i className="ph-fill ph-envelope" />
                                </span>
                                <a href="mailto:support24@marketpro.com" className="contact-text">
                                    support24@marketpro.com
                                </a>
                            </div>
                            <div className="contact-info">
                                <span className="contact-icon">
                                    <i className="ph-fill ph-map-pin" />
                                </span>
                                <span className="contact-text">
                                    789 Inner Lane, California, USA
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 d-flex flex-wrap gap-3">
                            <Link to="#" className="support-button">
                                <span>Get Support On Call</span>
                                <span className="support-button-icon">
                                    <i className="ph ph-headset" />
                                </span>
                            </Link>
                            <Link to="#" className="support-button">
                                <span>Get Direction</span>
                                <span className="support-button-icon">
                                    <i className="ph ph-map-pin" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnhancedContact;
