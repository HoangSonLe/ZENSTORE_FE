import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IApiResponseTable, IApiTable } from "../../apis/interface";
import productApi from "../../apis/product/product.api";
import { IProduct, IProductQuery } from "../../apis/product/product.interface";
import { EProductStatus } from "../../constants/enum";
import { useApi } from "../../hooks";
import { formatVND, getRandomFloat, getRandomInteger } from "../../utils/numberUtils";
import Filter from "./Filter";
import Pagination from "../pagination/Pagination";
import { Link } from "react-router-dom";
export interface IProductCustomQuery extends IProductQuery {
    statusCode: string;
}
export const getTagCssClass = (status: EProductStatus | string) => {
    switch (status) {
        case EProductStatus.NEW:
            return "bg-primary-600";
        case EProductStatus.BEST_SELL:
            return "bg-warning-600";
        case EProductStatus.OUT_STOCK:
            return "bg-gray-600";
        default:
            return "bg-danger-600";
    }
};
const ShopSection = () => {
    const { register, handleSubmit, watch, setValue, getValues, control } =
        useForm<IProductCustomQuery>({
            defaultValues: {
                colorCode: EProductStatus.ALL,
                seriCode: EProductStatus.ALL,
                spaceCode: EProductStatus.ALL,
                statusCode: EProductStatus.ALL,
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
        setActive(!active);
    };

    const getProductData = async () => {
        const formValues = getValues();
        await getProductList(
            {
                params: {
                    ...formValues,
                    statusCodes: [...formValues.statusCode],
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
        <section className="shop py-80">
            <div className={`side-overlay ${active && "show"}`}></div>
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
                    />
                    {/* Sidebar End */}
                    {/* Content Start */}
                    <div className="col-lg-9">
                        {/* Top Start */}
                        <div className="flex-between gap-16 flex-wrap mb-40 ">
                            <span className="text-gray-900">
                                {start}-{end} of {total} sản phẩm
                            </span>
                            <div className="position-relative flex-align gap-16 flex-wrap">
                                <div className="list-grid-btns flex-align gap-16">
                                    <button
                                        onClick={() => setGrid(true)}
                                        type="button"
                                        className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${
                                            grid === true &&
                                            "border-main-600 text-white bg-main-600"
                                        }`}
                                    >
                                        <i className="ph-bold ph-list-dashes" />
                                    </button>
                                    <button
                                        onClick={() => setGrid(false)}
                                        type="button"
                                        className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${
                                            grid === false &&
                                            "border-main-600 text-white bg-main-600"
                                        }`}
                                    >
                                        <i className="ph ph-squares-four" />
                                    </button>
                                </div>
                                <button
                                    onClick={sidebarController}
                                    type="button"
                                    className="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                                >
                                    <i className="ph-bold ph-funnel" />
                                </button>
                            </div>
                        </div>
                        {/* Top End */}
                        <div className={`list-grid-wrapper ${grid && "list-view"}`}>
                            {productTableData && productTableData.data?.length > 0 ? (
                                productTableData.data.map((i) => (
                                    <Link
                                        to={`/product-details/${i.productId}`}
                                        key={i.productId}
                                        className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 cursor-pointer"
                                    >
                                        <div className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative">
                                            <Link
                                                to={`/product-details/${i.productId}`}
                                                className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                            >
                                                <img
                                                    style={{ width: "232px", height: "180px" }}
                                                    src={i.listImage[0]}
                                                    alt={i.listImage[0]}
                                                    className="w-auto max-w-unset"
                                                />
                                                <span
                                                    className={`product-card__badge ${getTagCssClass(
                                                        i.productStatusCode
                                                    )} px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0`}
                                                >
                                                    {i.productStatusName}
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="product-card__content flex-fill mt-16">
                                            <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                                <Link
                                                    to={`/product-details/${i.productId}`}
                                                    className="link text-line-2"
                                                    tabIndex={0}
                                                >
                                                    {i.productName}
                                                </Link>
                                            </h6>
                                            <div className="flex-align mb-20 mt-16 gap-6">
                                                <span className="text-xs fw-medium text-gray-500">
                                                    {getRandomFloat(3.5, 5)}
                                                </span>
                                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                                    <i className="ph-fill ph-star" />
                                                </span>
                                                <span className="text-xs fw-medium text-gray-500">
                                                    ({getRandomInteger(1, 5)}k)
                                                </span>
                                            </div>
                                            <div className="product-card__price my-20">
                                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                    {formatVND(i.productPrice)}
                                                </span>
                                                <span className="text-heading text-md fw-semibold px-3">
                                                    {formatVND(i.productPriceSale)}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <label className="form-check-label">Không có sản phẩm nào</label>
                            )}
                        </div>
                        {productTableData && productTableData.data?.length > 0 ? (
                            <div style={{ gridColumn: "span 4" }}>
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
