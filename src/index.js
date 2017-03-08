// @flow
import cloneDeep from 'lodash.clonedeep';
import GigwalkAxios from './client';
import Authorization from './api/authorization';
// import Calendar from './api/calendar';
// import Certifications from './api/certifications';
// import Customers from './api/customers';
// import DataItems from './api/dataItems';
// import DataTypes from './api/dataTypes';
// import FileJob from './api/fileJob';
// import Groups from './api/groups';
// import LocationLists from './api/locationLists';
// import Locations from './api/locations';
// import Organizations from './api/organizations';
// import PushNotifications from './api/pushNotifications';
// import SelfService from './api/selfService';
// import Search from './api/search';
// import Signup from './api/signup';
// import Subscriptions from './api/subscriptions';
// import TargetLists from './api/targetLists';
// import Targets from './api/targets';
// import Templates from './api/templates';
// import Tickets from './api/tickets';
// import Versions from './api/versions';
// import Waves from './api/waves';

export type GigwalkAPIConfig = {
    hostname?: string,
};

export type AuthToken = {
    token: string
}

export type BasicAuth = {
    username: string,
    password: string
}

export default class GigwalkAPI {
    // The http client
    client: GigwalkAxios;

    // API resources
    authorization: Authorization;
    calendar: Calendar;
    certifications: Certifications;
    customers: Customers;
    dataItems: DataItems;
    dataTypes: DataTypes;
    fileJob: FileJob;
    groups: Groups;
    locationLists: LocationLists;
    locations: Locations;
    organizations: Organizations;
    pushNotifications: PushNotifications;
    selfService: SelfService;
    search: Search;
    signup: Signup;
    subscriptions: Subscriptions;
    targetLists: TargetLists;
    targets: Targets;
    templates: Templates;
    tickets: Tickets;
    versions: Versions;
    waves: Waves;

    constructor(config?: GigwalkAPIConfig = {}) {
        const client = new GigwalkAxios({ baseURL: `https://${config.hostname || 'api.app.gigwalk.com'}` });
        this.client = client;

        // AxiosIssue - global.defaults and client.defaults reference the same object. Changing the instance
        // defaults will affect the global namespace (and therefore any other axios instances)
        // See https://github.com/mzabriskie/axios/issues/391
        client.defaults = cloneDeep(client.defaults);

        this.authorization = new Authorization(client);
        // this.calendar = new Calendar(client);
        // this.certifications = new Certifications(client);
        // this.customers = new Customers(client);
        // this.dataItems = new DataItems(client);
        // this.dataTypes = new DataTypes(client);
        // this.fileJob = new FileJob(client);
        // this.groups = new Groups(client);
        // this.locationLists = new LocationLists(client);
        // this.locations = new Locations(client);
        // this.organizations = new Organizations(client);
        // this.pushNotifications = new PushNotifications(client);
        // this.selfService = new SelfService(client);
        // this.search = new Search(client);
        // this.signup = new Signup(client);
        // this.subscriptions = new Subscriptions(client);
        // this.targetLists = new TargetLists(client);
        // this.targets = new Targets(client);
        // this.templates = new Templates(client);
        // this.tickets = new Tickets(client);
        // this.versions = new Versions(client);
        // this.waves = new Waves(client);
    }

    authenticate(auth: AuthToken | BasicAuth) {
        let header: string = '';
        if (typeof auth.email === 'string' && typeof auth.password === 'string') {
            header = `Basic ${auth.email}:${auth.password}`;
        } else if (typeof auth.token === 'string') {
            header = `Token ${auth.token}`;
        }

        Object.assign(this.client.defaults, {
            headers: {
                common: {
                    ...(
                        this.client.defaults.hasOwnProperty('headers') && this.client.defaults.headers.hasOwnProperty('common') ?
                            this.client.defaults.headers.common : {}
                    ),
                    Authorization: header,
                },
            },
        });
    }
}
