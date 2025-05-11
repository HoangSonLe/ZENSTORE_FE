import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import productApi from "../../apis/product/product.api";
import { IProduct } from "../../apis/product/product.interface";
import { IApiResponseTable } from "../../apis/interface";
import { useApi } from "../../hooks";
import { formatVND } from "../../utils/numberUtils";
import "./SearchStyles.css";

const SearchBoxMobile = ({
    activeSearch,
    handleSearchToggle,
}: {
    activeSearch: boolean;
    handleSearchToggle: () => void;
}) => {
    const [input, setInput] = useState<string>("");
    const [results, setResults] = useState<IProduct[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const { request: getProductList, loading: productListLoading } = useApi(
        productApi.getProductList
    );

    // We'll use CSS classes instead of inline styles

    const searchBoxRef = useRef<HTMLFormElement | null>(null); // Ref for the search box
    const navigate = useNavigate();

    // Handle search form submission
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        getProductData();
    };

    // Handle clicking outside to close the search box
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                activeSearch &&
                searchBoxRef.current &&
                !searchBoxRef.current.contains(event.target as Node)
            ) {
                setShowResults(false); // Close the search box when clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
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
    // Debounced search to fetch results
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
        <form
            onSubmit={handleSearch}
            className={`search-box mobile-search-box ${activeSearch && "active"}`}
            ref={searchBoxRef}
            style={{ background: "rgba(0, 0, 0, 0.85)" }} // Semi-transparent background
        >
            <button
                onClick={handleSearchToggle}
                type="button"
                className="search-box__close mobile-close-button position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-36 h-36 border-2 border-zenStore-100 bg-white rounded-circle flex-center text-zenStore-100 hover-bg-zenStore-100 hover-text-white text-xl transition-1"
                style={{ boxShadow: "0 0 10px rgba(0,0,0,0.3)", top: "10px", right: "10px" }}
            >
                <i className="ph ph-x-circle" />
            </button>
            <div className="container">
                <div className="container position-relative flex-column">
                    <div className="position-relative">
                        <input
                            type="text"
                            className="form-control mobile-search-input py-16 px-24 text-xl rounded-pill pe-64"
                            placeholder="Bạn cần tìm sản phẩm gì?"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            id="searchInputMobile"
                            aria-label="Search input"
                        />
                        <button
                            type="submit"
                            className="mobile-search-button w-48 h-48 bg-zenStore-100 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-16"
                            aria-label="Search button"
                        >
                            <i className="ph ph-magnifying-glass" />
                        </button>
                    </div>

                    {/* Search Result List */}
                    {showResults && (
                        <div
                            className="search-result-container bg-white border rounded shadow mt-2 z-3"
                            style={{
                                top: "110%",
                                left: 0,
                                width: "100%", // Make the result container width match the input
                                maxHeight: "300px", // Limit height to allow scrolling
                                overflowY: "auto", // Enable vertical scrolling
                            }}
                        >
                            <div className="d-flex flex-wrap justify-content-between px-3 py-2">
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
                                            className="search-result-item d-flex align-items-center p-4 mb-2 w-100 rounded bg-light hover-bg-light cursor-pointer transition-all duration-200"
                                            onClick={() => {
                                                setShowResults(false);
                                                setInput("");
                                                handleSearchToggle(); // Close the mobile search box
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
                                                {item.productPrice == 0 ? (
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
                                                            {String(
                                                                item.productStatusCode
                                                            ).startsWith("SALE") && (
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
            </div>
        </form>
    );
};

export default SearchBoxMobile;
