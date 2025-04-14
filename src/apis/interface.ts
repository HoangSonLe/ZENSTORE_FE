import type { AxiosRequestConfig } from 'axios';
import type { ReactNode } from 'react';

export interface IApiService extends Omit<AxiosRequestConfig, 'data' | 'url'> {
  url: string;
  pathVars?: object;
  body?: object;
  notifyConfig?:
    | {
        success: ReactNode;
      }
    | {
        error: boolean | ReactNode;
      }
    | {
        success: ReactNode;
        error: boolean | ReactNode;
      };
}

type IApiRequestParamsWithoutPathVariables<Q, B> = {
  pathVars?: never;
  params: Q;
  body: B;
};
type IApiRequestParamsWithoutQuery<P, B> = {
  pathVars: P;
  params?: never;
  body: B;
};
type IApiRequestParamsWithoutBody<P, Q> = {
  pathVars: P;
  params: Q;
  body?: never;
};
type IApiRequestParamsWithoutPathVariablesAndQuery<B> = {
  pathVars?: never;
  params?: never;
  body: B;
};
type IApiRequestParamsWithoutPathVariablesAndBody<Q> = {
  pathVars?: never;
  params: Q;
  body?: never;
};
type IApiRequestParamsWithoutQueryAndBody<P> = {
  pathVars: P;
  params?: never;
  body?: never;
};
type IApiRequestParamsWithoutPathVariablesAndQueryAndBody = {
  params?: never;
  body?: never;
  pathVars?: never;
};
type IApiRequestParamsRequiredPathVariablesAndQueryAndBody<P, Q, B> = {
  params: P;
  body: Q;
  pathVars: B;
};

interface IDefaultTableQueryParams {
  current?: number;
  pageSize?: number;
  sorter?: string;
  timeRange?: [string, string];
}

// Utility type to exclude specific keys
type ExcludeKeys<T, K> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type IExtraTableQueryParams = ExcludeKeys<
  IDefaultTableQueryParams,
  'current' | 'pageSize' | 'sorter' | 'timeRange'
> | null;

// The combined type
export type ITableQueryParams<T extends IExtraTableQueryParams> = T extends null
  ? IDefaultTableQueryParams
  : T & IDefaultTableQueryParams;

type IApiTableRequestParamsWithoutHeader<
  P extends object | null,
  Q extends IExtraTableQueryParams,
  B extends object | null,
> = P extends null
  ? B extends null
    ? IApiRequestParamsWithoutBody<P, ITableQueryParams<Q>>
    : IApiRequestParamsRequiredPathVariablesAndQueryAndBody<P, ITableQueryParams<Q>, B>
  : B extends null
    ? IApiRequestParamsWithoutBody<P, ITableQueryParams<Q>>
    : IApiRequestParamsRequiredPathVariablesAndQueryAndBody<ITableQueryParams<Q>, B, P>;

export type IApiTableRequestParams<
  P extends object | null,
  Q extends IExtraTableQueryParams,
  B extends object | null,
  H = undefined,
> = H extends undefined
  ? IApiTableRequestParamsWithoutHeader<P, Q, B>
  : IApiTableRequestParamsWithoutHeader<P, Q, B> & { headers: H };

export type IApiRequestParams<
  P extends object | null,
  Q extends object | null,
  B extends object | null,
> = (P extends null
  ? Q extends null
    ? B extends null
      ? IApiRequestParamsWithoutPathVariablesAndQueryAndBody
      : IApiRequestParamsWithoutPathVariablesAndQuery<B>
    : B extends null
      ? IApiRequestParamsWithoutPathVariablesAndBody<Q>
      : IApiRequestParamsWithoutPathVariables<B, Q>
  : Q extends null
    ? B extends null
      ? IApiRequestParamsWithoutQueryAndBody<P>
      : IApiRequestParamsWithoutQuery<P, B>
    : B extends null
      ? IApiRequestParamsWithoutBody<P, Q>
      : IApiRequestParamsRequiredPathVariablesAndQueryAndBody<Q, B, P>) &
  Omit<IApiService, 'url'>;

export interface IApiResponseError {
  code: string;
  message?: string;
}

export type IApiResponseAuth<T> = T;

export interface IApiResponseValue<T> {
  value: T;
}

export interface IApiResponseList<T> {
  data: T[];
}

export interface IApiResponseValue<T> {
  value: T;
}
export interface IApiResponseTable<T> {
  current: number;
  data: T[];
  pageSize: number;
  success: boolean;
  total: number;
  meta?: number;
}
