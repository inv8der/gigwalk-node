// @flow
import qs from 'qs';
import { decamelizeKeys } from 'humps';

export default function stringifyQuery(params: Object) {
    const queryString = qs.stringify(decamelizeKeys(params, { split: /(?=[A-Z0-9])/ }));
    return (queryString.length > 0) ? `?${queryString}` : queryString;
}
