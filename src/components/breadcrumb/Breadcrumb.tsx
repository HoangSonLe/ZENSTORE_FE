import React from "react";
import { Link } from "react-router-dom";
import "./BreadcrumbStyles.css";

const Breadcrumb = ({ title }: { title: string }) => {
    return (
        <div className="breadcrumb">
            <div className="container container-lg">
                <div className="breadcrumb-wrapper">
                    <h6>{title}</h6>
                    <ul>
                        <li>
                            <Link to="/">
                                <i className="ph ph-house" />
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <i className="ph ph-caret-right" />
                        </li>
                        <li>{title}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
