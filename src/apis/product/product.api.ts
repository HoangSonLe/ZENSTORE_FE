import { apiService } from "../axios";
import { IApiRequestParams, IApiResponseTable } from "../interface";
import { IProduct, IProductQuery } from "./product.interface";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getProductList(
        params: IApiRequestParams<null, IProductQuery, null>
    ): Promise<IApiResponseTable<IProduct[]>> {
        return apiService({ url: "/Product/GetProductList", ...params });
    },
};
