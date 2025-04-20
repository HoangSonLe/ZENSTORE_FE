import _ from "lodash";
import { useEffect, useState } from "react";
import { Control, UseFormRegister, UseFormWatch } from "react-hook-form";
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
}
const Filter = ({ activeClass, sidebarController, register, watch, onChangeFilter }: IProps) => {
    const [seriesCodeDataOptions, setSeriesCodeDataOptions] = useState<ISelectOption[]>();
    const { request: getSeriesCodeDataOptions } = useApi(categoryApi.getCategoryDataOptions);
    const selectedSeriCode = watch("seriCode");
    const selectedStatus = watch("statusCodeSingle");
    const selectedColor = watch("colorCode");
    const selectedSpace = watch("spaceCode");

    useEffect(() => {
        onChangeFilter();
    }, [selectedSeriCode, selectedStatus, selectedColor, selectedSpace]);

    useAsyncEffect(async () => {
        await getSeriesCodeDataOptions(undefined, (response) => {
            const { data } = response as IApiResponseTable<ICategory>;
            const selectOptionsResponse: ISelectOption[] = data.data.map((item: ICategory) => ({
                label: _.get(item, "categoryName"),
                value: _.get(item, "categoryCode"),
                type: _.get(item, "categoryType"),
            }));
            setSeriesCodeDataOptions(selectOptionsResponse);
        });
    });

    return (
        <div className="col-lg-3">
            <div
                className={`shop-sidebar ${activeClass && "active"}`}
                style={{ overflow: "auto", maxHeight: "80vh" }}
            >
                <button
                    onClick={sidebarController}
                    type="button"
                    className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
                >
                    <i className="ph ph-x" />
                </button>
                <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                    <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                        Lọc theo trạng thái
                    </h6>
                    <ul className="max-h-540 overflow-y-auto scroll-sm">
                        {seriesCodeDataOptions
                            ?.filter((i) => i.type === ECategoryType.STATUS)
                            .map((i) => (
                                <li key={i.value} className="mb-24">
                                    <div className="form-check common-check common-radio">
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
                            .map((i) => (
                                <li key={i.value} className="mb-24">
                                    <div className="form-check common-check common-radio">
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
                            .map((i) => (
                                <li key={i.value} className="mb-24">
                                    <div className="form-check common-check common-radio">
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
                            .map((i) => (
                                <li key={i.value} className="mb-24">
                                    <div className="form-check common-check common-radio">
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
        </div>
    );
};

export default Filter;
