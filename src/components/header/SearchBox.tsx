import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IApiResponseTable } from "../../apis/interface";
import productApi from "../../apis/product/product.api";
import { IProduct } from "../../apis/product/product.interface";
import { useApi } from "../../hooks";
import { formatVND } from "../../utils/numberUtils";
import "./SearchFixStyles.css";
import "./SearchStyles.css";

const SearchBox = () => {
    const [input, setInput] = useState<string>("");
    const [results, setResults] = useState<IProduct[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const { request: getProductList, loading: productListLoading } = useApi(
        productApi.getProductList
    );

    const searchBoxRef = useRef<HTMLDivElement | null>(null); // Ref for the search box container
    const navigate = useNavigate();
    const getProductData = async () => {
        setIsSearching(true);
        await getProductList(
            {
                params: {
                    searchString: input,
                    pageNumber: 1,
                    pageSize: 5,
                },
            },
            (response) => {
                const { data } = response as IApiResponseTable<IProduct>;
                setResults(data.data);
                setShowResults(true);
                setIsSearching(false);
            }
        );
    };
    // Handle search form submission
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        getProductData();
    };
    // Handle clicking outside to close the results
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
                setShowResults(false); // Close the search box when clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Debounced search API call
    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (input.trim().length > 0) {
                getProductData();
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300); // Debounce 300ms

        return () => clearTimeout(delayDebounce);
    }, [input]);

    // Update searching state when API is loading
    useEffect(() => {
        setIsSearching(productListLoading);
    }, [productListLoading]);

    return (
        <form onSubmit={handleSearch} className="flex-align flex-wrap form-location-wrapper">
            <div className="position-relative" ref={searchBoxRef}>
                <div className="search-category style-two d-flex h-48 search-form d-sm-flex d-none">
                    <div className="search-form__wrapper position-relative">
                        <input
                            type="text"
                            className="search-form__input desktop-search-input common-input py-13 ps-16 pe-18 rounded-0 border-0"
                            placeholder="Bạn cần tìm sản phẩm gì?"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            id="searchInput"
                            aria-label="Search Input"
                        />
                    </div>
                    <button
                        type="submit"
                        className="desktop-search-button bg-main-two-600 flex-center text-xl text-white flex-shrink-0 w-48 hover-bg-main-two-700 d-lg-flex d-none rounded-end"
                        aria-label="Submit Search"
                        style={{ borderRadius: "0 8px 8px 0", margin: 0, padding: 0 }}
                    >
                        <i className="ph ph-magnifying-glass" />
                    </button>
                </div>
                {/* Search Result List */}
                {showResults && (
                    <div
                        className="search-result-container position-absolute bg-white border rounded shadow mt-2 z-3"
                        style={{
                            top: "110%",
                            left: 0,
                            width: "100%", // Make the result container width match the input
                            maxHeight: "300px", // Limit height to allow scrolling
                            overflowY: "auto", // Enable vertical scrolling
                        }}
                    >
                        <div className="d-flex flex-wrap justify-content-between">
                            {isSearching ? (
                                <div className="searching-message d-flex flex-column p-6 w-100">
                                    <div className="fw-semibold text-center">
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        Đang tìm kiếm...
                                    </div>
                                </div>
                            ) : results?.length > 0 ? (
                                results.map((item) => (
                                    <div
                                        key={item.productId}
                                        className="search-result-item d-flex align-items-center px-6 py-4 mb-4 w-100 rounded bg-light hover-bg-light-100 cursor-pointer transition-all duration-200"
                                        onClick={() => {
                                            setShowResults(false);
                                            setInput("");
                                            navigate(`/product-details/${item.productId}`);
                                        }}
                                    >
                                        <img
                                            src={
                                                item.listImage && item.listImage.length > 0
                                                    ? item.listImage[0]
                                                    : "/assets/images/placeholder/product-placeholder.svg"
                                            }
                                            alt={item.productName}
                                            className="search-result-image me-3"
                                        />
                                        <div className="d-flex flex-column">
                                            <div
                                                className="product-name fw-semibold text-truncate"
                                                style={{ maxWidth: "180px" }}
                                            >
                                                {item.productName}
                                            </div>
                                            {item.productPrice === 0 ? (
                                                <div className="price-contact text-muted">
                                                    Giá liên hệ
                                                </div>
                                            ) : item.productPrice !== item.productPriceSale &&
                                              item.productPrice &&
                                              item.productPriceSale ? (
                                                <div className="d-flex flex-column">
                                                    <div className="price-sale text-danger">
                                                        {formatVND(item.productPriceSale)}
                                                    </div>
                                                    <div className="d-flex flex-column flex-sm-row align-items-sm-center">
                                                        <span className="price-original text-muted text-decoration-line-through">
                                                            {formatVND(item.productPrice)}
                                                        </span>
                                                        {String(item.productStatusCode).startsWith(
                                                            "SALE"
                                                        ) && (
                                                            <span className="price-status text-danger ms-0 ms-sm-2 mt-1 mt-sm-0">
                                                                {item.productStatusName}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="price-regular text-muted">
                                                    {formatVND(item.productPriceSale)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-results-message d-flex flex-column p-4">
                                    <div className="fw-semibold text-center">
                                        Không có sản phẩm nào
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
};

export default SearchBox;
