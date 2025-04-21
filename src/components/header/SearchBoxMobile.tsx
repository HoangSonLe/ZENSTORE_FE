import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import productApi from "../../apis/product/product.api";
import { IProduct } from "../../apis/product/product.interface";
import { IApiResponseTable } from "../../apis/interface";
import { useApi } from "../../hooks";

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
    const { request: getProductList } = useApi(productApi.getProductList);

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

    return (
        <form
            onSubmit={handleSearch}
            className={`search-box ${activeSearch && "active"}`}
            ref={searchBoxRef}
        >
            <button
                onClick={handleSearchToggle}
                type="button"
                className="search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1"
            >
                <i className="ph ph-x" />
            </button>
            <div className="container">
                <div className="container position-relative">
                    <div className="position-relative">
                        <input
                            type="text"
                            className="form-control py-16 px-24 text-xl rounded-pill pe-64"
                            placeholder="Tìm kiếm ..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            id="searchInputMobile"
                            aria-label="Search input"
                        />
                        <button
                            type="submit"
                            className="w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-16"
                            aria-label="Search button"
                        >
                            <i className="ph ph-magnifying-glass" />
                        </button>
                    </div>

                    {/* Search Result List */}
                    {showResults && (
                        <div
                            className="bg-white border rounded shadow mt-2 z-3"
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
                            <div className="d-flex flex-wrap justify-content-between px-3 py-2">
                                {results?.length > 0 ? (
                                    results.map((item) => (
                                        <div
                                            key={item.productId}
                                            className="d-flex align-items-center p-4 mb-2 w-100 w-md-48 w-lg-23 rounded bg-light hover-bg-light cursor-pointer transition-all duration-200"
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
            </div>
        </form>
    );
};

export default SearchBoxMobile;
