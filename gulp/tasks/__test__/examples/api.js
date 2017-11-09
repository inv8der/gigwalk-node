import urlTemplate from 'url-template';
import cloneDeep from 'lodash.clonedeep';
import GigwalkAxios from './client';
import validate from './utils/validate';
import stringifyQuery from './utils/stringifyQuery';

export default class Gigwalk {
    constructor(config = {}) {
        const host = typeof config.host === 'string' ? config.host : 'api.app.gigwalk.com';
        const protocol = typeof config.protocol === 'string' ? config.protocol : 'https';

        this._client = new GigwalkAxios({ baseURL: `${protocol}://${host}` });
        this._headers = {};

        // AxiosIssue - global.defaults and client.defaults reference the same object. Changing the instance
        // defaults will affect the global namespace (and therefore any other axios instances)
        // See https://github.com/mzabriskie/axios/issues/391
        this._client.defaults = cloneDeep(this._client.defaults);

        this.organizations = {
            update: (params = {}) => {
                const { data, ...urlParams } = params;
                const requestSchema = {
                    properties: {
                        core_customer_account: {
                            title: 'core_customer_account',
                            type: 'string',
                        },
                        core_private_workforce: {
                            title: 'core_private_workforce',
                            type: 'boolean',
                        },
                        email: {
                            title: 'email',
                            type: 'string',
                        },
                        first_name: {
                            title: 'first_name',
                            type: 'string',
                        },
                        last_name: {
                            title: 'last_name',
                            type: 'string',
                        },
                        needs_core: {
                            title: 'needs_core',
                            type: 'boolean',
                        },
                        organization_name: {
                            title: 'organization_name',
                            type: 'string',
                        },
                        status: {
                            enum: [
                                'ACTIVE',
                                'ARCHIVED',
                                'DELETED',
                                'INACTIVE',
                            ],
                            title: 'status',
                            type: 'string',
                        },
                        vertical_type: {
                            enum: [
                                'CONSULTING',
                                'CPG',
                                'MARKET_RESEARCH',
                                'RETAIL_MERCHANDISING',
                                'STAFFING',
                            ],
                            title: 'vertical_type',
                            type: 'string',
                        },
                    },
                    required: [],
                    type: 'object',
                };
                const urlSchema = {
                    type: 'object',
                    properties: {
                        organization_id: {
                            type: 'number',
                        },
                    },
                    required: [
                        'organization_id',
                    ],
                };

                const errors = [];
                const warnings = [];
                const validateArgs = [
                    [urlParams, urlSchema],
                    [data || {}, requestSchema],
                ];
                validateArgs.forEach(([json, schema]) => {
                    const result = validate(json, schema);
                    errors.push(...result.errors);
                    warnings.push(...result.warnings);
                });

                warnings.forEach((msg) => { console.warn(msg); }); // eslint-disable-line no-console
                if (errors.length > 0) {
                    return Promise.reject(new Error(errors.join('\n')));
                }

                const { organization_id, ...queryParams } = urlParams;
                const pathParams = { organization_id };
                const template = urlTemplate.parse('/v1/organizations/{organization_id}');
                const url = `${template.expand(pathParams)}${stringifyQuery(queryParams)}`;

                return this._client.request({
                    url,
                    method: 'put',
                    headers: this._headers,
                    data,
                });
            },

            customers: {
                list: (params = {}) => {
                    const { data, ...urlParams } = params;
                    const requestSchema = {};
                    const urlSchema = {
                        type: 'object',
                        properties: {
                            organization_id: {
                                type: 'number',
                            },
                            limit: {
                                type: 'number',
                            },
                            offset: {
                                type: 'number',
                            },
                            sort_field: {
                                type: 'string',
                                enum: [
                                    'title',
                                    'description',
                                    'date_created',
                                    'date_updated',
                                    'org_id',
                                    'type',
                                    'user_count',
                                    'self_cert',
                                ],
                            },
                            sort_order: {
                                type: 'number',
                                enum: [
                                    'asc',
                                    'desc',
                                ],
                            },
                        },
                        required: [
                            'organization_id',
                        ],
                    };

                    const errors = [];
                    const warnings = [];
                    const validateArgs = [
                        [urlParams, urlSchema],
                        [data || {}, requestSchema],
                    ];
                    validateArgs.forEach(([json, schema]) => {
                        const result = validate(json, schema);
                        errors.push(...result.errors);
                        warnings.push(...result.warnings);
                    });

                    warnings.forEach((msg) => { console.warn(msg); }); // eslint-disable-line no-console
                    if (errors.length > 0) {
                        return Promise.reject(new Error(errors.join('\n')));
                    }

                    const { organization_id, ...queryParams } = urlParams;
                    const pathParams = { organization_id };
                    const template = urlTemplate.parse('/v1/organizations/{organization_id}/customers');
                    const url = `${template.expand(pathParams)}${stringifyQuery(queryParams)}`;

                    return this._client.request({
                        url,
                        method: 'get',
                        headers: this._headers,
                        data,
                    });
                },

            },
        };
    }

    authenticate(auth) {
        let header = '';
        if (typeof auth.username === 'string' && typeof auth.password === 'string') {
            header = `Basic ${btoa(`${auth.username}:${auth.password}`)}`;
        } else if (typeof auth.token === 'string') {
            header = `Token ${auth.token}`;
        }

        this._headers.Authorization = header;
    }
}
