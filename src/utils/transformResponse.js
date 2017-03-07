// @flow
import { camelizeKeys } from 'humps';

export default function transformResponse(data: any) {
    if (typeof data === 'string') {
        try {
            const json = JSON.parse(data);
            return camelizeKeys(json, { split: /(?=[A-Z0-9])/ });
        } catch (e) {
            // eslint-disable-line no-empty
        }
    }

    return data;
}
