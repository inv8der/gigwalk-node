// @flow
import isPlainObject from 'lodash.isplainobject';
import { decamelizeKeys } from 'humps';

export default function transformRequest(data: any) {
    return isPlainObject(data) ? decamelizeKeys(data, { split: /(?=[A-Z0-9])/ }) : data;
}
