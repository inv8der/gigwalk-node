// @flow
import type { Axios } from 'axios';

export default class Resource {
    client: Axios;

    constructor(client: Axios) {
        this.client = client;
    }
}
