import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import productApi from "../../apis/product/product.api";
import { IProduct } from "../../apis/product/product.interface";
import { IApiResponseTable } from "../../apis/interface";
import { useApi } from "../../hooks";

const SearchBox = () => {
    const [input, setInput] = useState<string>("");
    const [results, setResults] = useState<IProduct[]>([]);
    const [showResults, setShowResults] = useState(false);
    const { request: getProductList } = useApi(productApi.getProductList);

    const searchBoxRef = useRef<HTMLDivElement | null>(null); // Ref for the search box container
    const navigate = useNavigate();
    const getProductData = async () => {
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

    return (
        <form onSubmit={handleSearch} className="flex-align flex-wrap form-location-wrapper">
            <div className="position-relative" ref={searchBoxRef}>
                <div className="search-category style-two d-flex h-48 search-form d-sm-flex d-none">
                    <div className="search-form__wrapper position-relative">
                        <input
                            type="text"
                            className="search-form__input common-input py-13 ps-16 pe-18 rounded-0 border-0"
                            placeholder="Tìm kiếm ..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            id="searchInput"
                            aria-label="Search Input"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-main-two-600 flex-center text-xl text-white flex-shrink-0 w-48 hover-bg-main-two-700 d-lg-flex d-none"
                        aria-label="Submit Search"
                    >
                        <i className="ph ph-magnifying-glass" />
                    </button>
                </div>
                {/* Search Result List */}
                {showResults && (
                    <div
                        className="position-absolute bg-white border rounded shadow mt-2 z-3"
                        style={{
                            top: "110%",
                            left: 0,
                            width: "100%", // Make the result container width match the input
                            maxHeight: "300px", // Limit height to allow scrolling
                            overflowY: "auto", // Enable vertical scrolling
                            borderRadius: "12px", // Rounded corners
                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)", // Soft shadow
                            padding: "8px 0", // Space around the result items
                        }}
                    >
                        <div className="d-flex flex-wrap justify-content-between">
                            {results.length > 0 ? (
                                results.map((item) => (
                                    <div
                                        key={item.productId}
                                        className="search-result-item d-flex align-items-center px-6 py-4 mb-4 w-100 w-md-48 w-lg-23 rounded bg-light hover-bg-light-100 cursor-pointer transition-all duration-200"
                                        onClick={() => {
                                            setShowResults(false);
                                            setInput("");
                                            navigate(`/product-details/${item.productId}`);
                                        }}
                                        style={{
                                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                            borderRadius: "8px",
                                            transition: "transform 0.2s ease-in-out",
                                        }}
                                    >
                                        <img
                                            src={item.listImage[0]}
                                            alt={item.productName}
                                            width="50"
                                            height="50"
                                            className="me-2 rounded"
                                        />
                                        <div className="d-flex flex-column">
                                            <div
                                                className="fw-semibold text-truncate"
                                                style={{ maxWidth: "180px" }}
                                            >
                                                {item.productName}
                                            </div>
                                            <div className="text-muted">
                                                {item.productPriceSale.toLocaleString()}₫
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="d-flex flex-column p-4">
                                    <div
                                        className="fw-semibold text-truncate"
                                        style={{ maxWidth: "200px" }}
                                    >
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
