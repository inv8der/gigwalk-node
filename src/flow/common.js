// @flow
import type { $AxiosXHR } from 'axios';

export type PaginatedQuery = {
    limit?: number,
    offset?: number,
    sortField?: string,
    sortOrder?: string
}

export type SearchQuery = {
    q?: string,
    size?: number,
    from?: number
}

export type APIResponse<T> = {
    _meta: Object,
    _metadata: Object,
    warnings: mixed,
    errors: mixed,
    gw_api_response: Array<Object>,
    code: number,
    data: T,
}

export type APIPromise<T> = Promise<$AxiosXHR<APIResponse<T>>>
