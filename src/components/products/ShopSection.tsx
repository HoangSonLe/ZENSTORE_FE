import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IApiResponseTable, IApiTable } from "../../apis/interface";
import productApi from "../../apis/product/product.api";
import { IProduct, IProductQuery } from "../../apis/product/product.interface";
import { EProductStatus } from "../../constants/enum";
import { useApi } from "../../hooks";
import ProductItem from "../../pages/homePage/component/ProductItem";
import Pagination from "../pagination/Pagination";
import "./EnhancedShopStyles.css";
import Filter from "./Filter";
export interface IProductCustomQuery extends IProductQuery {
    statusCodeSingle: string;
}
export const getTagCssClass = (status: EProductStatus | string) => {
    switch (status) {
        case EProductStatus.LIKE_NEW:
            return "badge-like-new";
        case EProductStatus.NEW:
            return "badge-new";
        case EProductStatus.BEST_SELL:
            return "badge-best";
        case EProductStatus.OUT_STOCK:
            return "badge-out";
        default:
            return "badge-sale";
    }
};
const ShopSection = () => {
    const { register, handleSubmit, watch, setValue, getValues, control, reset } =
        useForm<IProductCustomQuery>({
            defaultValues: {
                colorCode: EProductStatus.ALL,
                seriCode: EProductStatus.ALL,
                spaceCode: EProductStatus.ALL,
                statusCodeSingle: EProductStatus.ALL,
                pageNumber: 1,
                pageSize: 20,
            },
        });
    const pageNumber = watch("pageNumber");

    const [productTableData, setProductTableData] = useState<IApiTable<IProduct>>();
    const { request: getProductList } = useApi(productApi.getProductList);

    const pageSize = productTableData?.pageSize ?? 0;
    const total = productTableData?.total ?? 0;

    const start = total > 0 && pageNumber ? (pageNumber - 1) * pageSize + 1 : 0;
    const end = Math.min((pageNumber ?? 0) * pageSize, total);

    let [grid, setGrid] = useState(false);
    let [active, setActive] = useState(false);
    let sidebarController = () => {
        // Use functional update to ensure we're working with the latest state
        setActive((prevActive) => {
            const newActiveState = !prevActive;

            // Toggle body class to prevent background scrolling
            if (newActiveState) {
                document.body.classList.add("sidebar-open");
            } else {
                document.body.classList.remove("sidebar-open");
            }

            return newActiveState;
        });
    };

    // Close sidebar when clicking on overlay
    const handleOverlayClick = () => {
        setActive((prevActive) => {
            if (prevActive) {
                document.body.classList.remove("sidebar-open");
                return false;
            }
            return prevActive;
        });
    };

    const getProductData = async () => {
        const formValues = getValues();
        await getProductList(
            {
                params: {
                    ...formValues,
                    statusCodes: [formValues.statusCodeSingle],
                },
            },
            (response) => {
                const { data } = response as IApiResponseTable<IProduct>;

                setProductTableData(data);
            }
        );
    };
    useEffect(() => {
        getProductData();

        // Cleanup function to remove body class when component unmounts
        return () => {
            document.body.classList.remove("sidebar-open");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeFilter = () => {
        setValue("pageNumber", 1);
        getProductData();
    };
    const onPageChange = (page: number) => {
        setValue("pageNumber", page);
        getProductData();
    };

    return (
        <section className="shop-section">
            <div className={`side-overlay ${active && "show"}`} onClick={handleOverlayClick}></div>
            <div className="container container-lg">
                <div className="row">
                    {/* Sidebar Start */}
                    <Filter
                        activeClass={active}
                        sidebarController={sidebarController}
                        register={register}
                        control={control}
                        watch={watch}
                        onChangeFilter={onChangeFilter}
                        reset={reset}
                        setValue={setValue}
                    />
                    {/* Sidebar End */}
                    {/* Content Start */}
                    <div className="col-lg-9">
                        {/* Top Start */}
                        <div className="shop-top">
                            <span className="product-count">
                                {start}-{end} của {total} sản phẩm
                            </span>
                            <div className="view-options">
                                <div className="view-toggle">
                                    <button
                                        onClick={() => setGrid(true)}
                                        type="button"
                                        className={`view-btn ${grid === true ? "active" : ""}`}
                                        aria-label="List view"
                                    >
                                        <i className="ph-bold ph-list-dashes" />
                                    </button>
                                    <button
                                        onClick={() => setGrid(false)}
                                        type="button"
                                        className={`view-btn ${grid === false ? "active" : ""}`}
                                        aria-label="Grid view"
                                    >
                                        <i className="ph ph-squares-four" />
                                    </button>
                                </div>
                                <button
                                    onClick={sidebarController}
                                    type="button"
                                    className="filter-btn d-lg-none d-flex"
                                    aria-label="Show filters"
                                >
                                    <i className="ph-bold ph-funnel" />
                                </button>
                            </div>
                        </div>
                        {/* Top End */}
                        <div className={`product-container ${grid ? "list-view" : ""}`}>
                            {productTableData && productTableData.data?.length > 0 ? (
                                productTableData.data.map((product) => (
                                    <ProductItem key={product.productId} product={product} />
                                ))
                            ) : (
                                <div className="empty-state">
                                    <p className="empty-state-text">
                                        <i className="ph ph-magnifying-glass me-2"></i>
                                        Không tìm thấy sản phẩm nào
                                    </p>
                                </div>
                            )}
                        </div>
                        {productTableData && productTableData.data?.length > 0 ? (
                            <div className="pagination-container">
                                {/* Pagination Start */}
                                <Pagination
                                    total={productTableData?.total ?? 0}
                                    currentPage={productTableData?.pageNumber ?? 0}
                                    onPageChange={onPageChange}
                                    pageSize={productTableData?.pageSize ?? 0}
                                />
                                {/* Pagination End */}
                            </div>
                        ) : null}
                    </div>
                    {/* Content End */}
                </div>
            </div>
        </section>
    );
};

export default ShopSection;
