import _ from "lodash";
import { useEffect, useState, useRef } from "react";
import {
    Control,
    UseFormRegister,
    UseFormWatch,
    UseFormReset,
    UseFormSetValue,
} from "react-hook-form";
import "./ButtonStyles.css";
import { ISelectOption } from "../../apis/base/base.interface";
import categoryApi from "../../apis/category/category.api";
import { ICategory } from "../../apis/category/category.interface";
import { IApiResponseTable } from "../../apis/interface";
import { ECategoryType } from "../../constants/enum";
import { useApi, useAsyncEffect } from "../../hooks";
import { IProductCustomQuery } from "./ShopSection";

interface IProps {
    activeClass: boolean;
    sidebarController: () => void;
    register: UseFormRegister<IProductCustomQuery>;
    control: Control<IProductCustomQuery>;
    watch: UseFormWatch<IProductCustomQuery>;
    onChangeFilter: () => void;
    reset: UseFormReset<IProductCustomQuery>;
    setValue: UseFormSetValue<IProductCustomQuery>;
}
const Filter = ({
    activeClass,
    sidebarController,
    register,
    watch,
    onChangeFilter,
    reset,
    setValue,
}: IProps) => {
    const [seriesCodeDataOptions, setSeriesCodeDataOptions] = useState<ISelectOption[]>();
    const { request: getSeriesCodeDataOptions } = useApi(categoryApi.getCategoryDataOptions);
    const selectedSeriCode = watch("seriCode");
    const selectedStatus = watch("statusCodeSingle");
    const selectedColor = watch("colorCode");
    const selectedSpace = watch("spaceCode");

    // Track if this is the first render
    const isFirstRender = useRef(true);
    // Track previous filter values to prevent unnecessary API calls
    const prevFilters = useRef({
        seriCode: selectedSeriCode,
        status: selectedStatus,
        color: selectedColor,
        space: selectedSpace,
    });

    // Call API when filters change
    useEffect(() => {
        // On first render, just load the data without toggling sidebar
        if (isFirstRender.current) {
            isFirstRender.current = false;
            onChangeFilter();
            return;
        }

        // Check if filters actually changed
        const filtersChanged =
            prevFilters.current.seriCode !== selectedSeriCode ||
            prevFilters.current.status !== selectedStatus ||
            prevFilters.current.color !== selectedColor ||
            prevFilters.current.space !== selectedSpace;

        // Update previous filter values
        prevFilters.current = {
            seriCode: selectedSeriCode,
            status: selectedStatus,
            color: selectedColor,
            space: selectedSpace,
        };

        if (filtersChanged) {
            // Call API immediately when filters change
            onChangeFilter();

            // We no longer automatically close the sidebar when a filter is selected
            // This allows users to select multiple filters before closing the menu
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        selectedSeriCode,
        selectedStatus,
        selectedColor,
        selectedSpace,
        activeClass,
        // Intentionally omitting onChangeFilter and sidebarController from dependencies
        // to prevent infinite loops. These functions don't change between renders,
        // but including them in the dependency array causes continuous API calls.
    ]);

    useAsyncEffect(async () => {
        await getSeriesCodeDataOptions(undefined, (response) => {
            const { data } = response as IApiResponseTable<ICategory>;

            // Map API response
            const apiOptions: ISelectOption[] = data.data.map((item: ICategory) => ({
                label: _.get(item, "categoryName"),
                value: _.get(item, "categoryCode"),
                type: _.get(item, "categoryType"),
            }));

            setSeriesCodeDataOptions(apiOptions);
        });
    });

    return (
        <div className="col-lg-3">
            <div className={`shop-sidebar ${activeClass && "active"}`}>
                <button
                    onClick={sidebarController}
                    type="button"
                    className="shop-sidebar__close d-lg-none d-flex w-40 h-40 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600 bg-white text-danger"
                    style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.1)", fontSize: "18px" }}
                >
                    <i className="ph ph-x-circle" />
                </button>

                {/* Scrollable filter content */}
                <div className="shop-sidebar__content">
                    <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                        <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                            Lọc theo trạng thái
                        </h6>
                        <ul className="max-h-540 overflow-y-auto scroll-sm">
                            {seriesCodeDataOptions
                                ?.filter((i) => i.type === ECategoryType.STATUS)
                                // Sort to ensure "ALL" option appears first
                                .sort((a, b) =>
                                    a.value === "ALL" ? -1 : b.value === "ALL" ? 1 : 0
                                )
                                .map((i) => (
                                    <li key={i.value} className="mb-24">
                                        <div
                                            className="form-check common-check common-radio"
                                            onClick={() => {
                                                // Explicitly set the value when container is clicked
                                                setValue("statusCodeSingle", i.value);
                                            }}
                                        >
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                value={i.value}
                                                id={i.value}
                                                {...register("statusCodeSingle")}
                                            />
                                            <label className="form-check-label" htmlFor={i.value}>
                                                {i.label}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                        <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                            Lọc theo mẫu mã
                        </h6>
                        <ul className="max-h-540 overflow-y-auto scroll-sm">
                            {seriesCodeDataOptions
                                ?.filter((i) => i.type === ECategoryType.SERIES)
                                // Sort to ensure "ALL" option appears first
                                .sort((a, b) =>
                                    a.value === "ALL" ? -1 : b.value === "ALL" ? 1 : 0
                                )
                                .map((i) => (
                                    <li key={i.value} className="mb-24">
                                        <div
                                            className="form-check common-check common-radio"
                                            onClick={() => {
                                                // Explicitly set the value when container is clicked
                                                setValue("seriCode", i.value);
                                            }}
                                        >
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                value={i.value}
                                                id={i.value}
                                                {...register("seriCode")}
                                            />
                                            <label className="form-check-label" htmlFor={i.value}>
                                                {i.label}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                        <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                            Lọc theo màu
                        </h6>
                        <ul className="max-h-540 overflow-y-auto scroll-sm">
                            {seriesCodeDataOptions
                                ?.filter((i) => i.type === ECategoryType.COLOR)
                                // Sort to ensure "ALL" option appears first
                                .sort((a, b) =>
                                    a.value === "ALL" ? -1 : b.value === "ALL" ? 1 : 0
                                )
                                .map((i) => (
                                    <li key={i.value} className="mb-24">
                                        <div
                                            className="form-check common-check common-radio"
                                            onClick={() => {
                                                // Explicitly set the value when container is clicked
                                                setValue("colorCode", i.value);
                                            }}
                                        >
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                value={i.value}
                                                id={i.value}
                                                {...register("colorCode")}
                                            />
                                            <label className="form-check-label" htmlFor={i.value}>
                                                {i.label}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                        <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                            Lọc theo dung lượng
                        </h6>
                        <ul className="max-h-540 overflow-y-auto scroll-sm">
                            {seriesCodeDataOptions
                                ?.filter((i) => i.type === ECategoryType.SPACE)
                                // Sort to ensure "ALL" option appears first
                                .sort((a, b) =>
                                    a.value === "ALL" ? -1 : b.value === "ALL" ? 1 : 0
                                )
                                .map((i) => (
                                    <li key={i.value} className="mb-24">
                                        <div
                                            className="form-check common-check common-radio"
                                            onClick={() => {
                                                // Explicitly set the value when container is clicked
                                                setValue("spaceCode", i.value);
                                            }}
                                        >
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                value={i.value}
                                                id={i.value}
                                                {...register("spaceCode")}
                                            />
                                            <label className="form-check-label" htmlFor={i.value}>
                                                {i.label}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>

                {/* Reset Filter Button - Always at Bottom */}
                <div className="reset-filter-container">
                    <button
                        type="button"
                        className="btn btn-danger w-100 reset-filter-btn"
                        onClick={() => {
                            // Reset form to default values
                            reset({
                                colorCode: "ALL",
                                seriCode: "ALL",
                                spaceCode: "ALL",
                                statusCodeSingle: "ALL",
                                pageNumber: 1,
                                pageSize: 20,
                            });

                            // Update prevFilters to prevent unnecessary API calls
                            prevFilters.current = {
                                seriCode: "ALL",
                                status: "ALL",
                                color: "ALL",
                                space: "ALL",
                            };

                            // Call API directly for reset action
                            onChangeFilter();

                            // Close sidebar on mobile after reset
                            if (window.innerWidth <= 991 && activeClass) {
                                sidebarController();
                                document.body.classList.remove("sidebar-open");
                            }
                        }}
                    >
                        <i className="ph ph-trash"></i>
                        <span>Xóa bộ lọc</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
