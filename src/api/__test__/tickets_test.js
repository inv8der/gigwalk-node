import sinon from 'sinon';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Tickets from '../Tickets';
import Resource from '../resource';

describe('Tickets', () => {
    const sandbox = sinon.sandbox.create();
    const groupId = 1;
    const ticketId = 2;
    const organizationId = 3;
    const subscriptionId = 4;
    const ticketEventId = 5;
    const customerId = 6;
    const dataTypeId = 7;
    const observationTargetId = 8;
    const templateId = 9;
    const dataItemId = 'deadbeef';
    let tickets;
    let getSpy;
    let putSpy;
    let postSpy;
    let deleteSpy;
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);

        getSpy = sandbox.spy(axios, 'get');
        putSpy = sandbox.spy(axios, 'put');
        postSpy = sandbox.spy(axios, 'post');
        deleteSpy = sandbox.spy(axios, 'delete');

        tickets = new Tickets(axios);
    });

    afterEach(() => {
        mock.restore();
        sandbox.restore();
    });

    it('should be a subclass of Resource', () => {
        expect(tickets).to.be.an.instanceOf(Resource);
    });

    describe('searchByGroup', () => {
        it('should make a POST request to /v1/groups/:group_id/tickets/search', () => {
            const params = {
                dashboardVisible: true,
                limit: 10,
                offset: 0,
                groupId,
                boundingBox: {
                    topLeft: {
                        lat: 36.141887,
                        lon: -115.262195
                    },
                    bottomRight: {
                        lat: 36.023970,
                        lon: -115.032169,
                    }
                },
                timezone: 'America/Los_Angeles',
                query: [{
                    field: 'status',
                    operator: 'not_in',
                    value: ['EXPIRED', 'SUBMITTED', 'CANCELED', 'AUTO_CANCELED'],
                }],
                order: {
                    field: 'subscription_title',
                    direction: 'desc'
                }
            };
            mock.onPost(/\/v1\/groups\/\d+\/tickets\/search/).reply(200);

            const promise = tickets.searchByGroup(params);
            expect(postSpy).to.have.been.calledWithExactly(
                `/v1/groups/${groupId}/tickets/search?v2=1&dashboard_visible=${params.dashboardVisible}&limit=${params.limit}&offset=${params.offset}`,
                {
                    boundingBox: {
                        topLeft: {
                            lat: 36.141887,
                            lon: -115.262195
                        },
                        bottomRight: {
                            lat: 36.023970,
                            lon: -115.032169,
                        }
                    },
                    timezone: 'America/Los_Angeles',
                    query: [{
                        field: 'status',
                        operator: 'not_in',
                        value: ['EXPIRED', 'SUBMITTED', 'CANCELED', 'AUTO_CANCELED'],
                    }],
                    order: {
                        field: 'subscription_title',
                        direction: 'desc'
                    }
                }
            );
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('get', () => {
        it('should make a GET request to /v1/tickets/my_list', () => {
            const params = {
                showCustomerMetadata: true,
            };
            mock.onGet(/\/v1\/tickets\/my_list/).reply(200);

            const promise = tickets.get(params);
            expect(getSpy).to.have.been.calledWithExactly(`/v1/tickets/my_list?show_customer_metadata=${params.showCustomerMetadata}`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('getForCustomer', () => {
        it('should make a GET request to /v1/customers/:customer_id/tickets', () => {
            const params = {
                customerId,
                showCustomerMetadata: true,
            };
            mock.onGet(/\/v1\/customers\/\d+\/tickets/).reply(200);

            const promise = tickets.getForCustomer(params);
            expect(getSpy).to.have.been.calledWithExactly(`/v1/customers/${customerId}/tickets?show_customer_metadata=${params.showCustomerMetadata}`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('search', () => {
        it('should make a POST request to /v2/organizations/:organization_id/search/tickets', () => {
            const params = {
                limit: 10,
                offset: 0,
                organizationId,
                queryString: 'Blackbriar',
                sort: [{
                    sortKey: 'title',
                    sortOrder: 'asc'
                }],
                filters: [{
                    filterKey: 'status',
                    filterValue: 'ACTIVE'
                }],
            };
            mock.onPost(/\/v2\/organizations\/\d+\/search\/tickets/).reply(200);

            const promise = tickets.search(params);
            expect(postSpy).to.have.been.calledWithExactly(
                `/v2/organizations/${organizationId}/search/tickets?limit=${params.limit}&offset=${params.offset}`,
                {
                    queryString: 'Blackbriar',
                    sort: [{
                        sortKey: 'title',
                        sortOrder: 'asc'
                    }],
                    filters: [{
                        filterKey: 'status',
                        filterValue: 'ACTIVE'
                    }],
                }
            );
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('searchFilters', () => {
        it('should make a POST request to /v2/organizations/:organization_id/search/tickets/filters', () => {
            const params = {
                limit: 10,
                offset: 0,
                organizationId,
                searchField: 'status',
                queryString: 'AC',
            };
            mock.onPost(/\/v2\/organizations\/\d+\/search\/tickets\/filters/).reply(200);

            const promise = tickets.searchFilters(params);
            expect(postSpy).to.have.been.calledWithExactly(
                `/v2/organizations/${organizationId}/search/tickets/filters?limit=${params.limit}&offset=${params.offset}`,
                {
                    searchField: 'status',
                    queryString: 'AC'
                },
            );
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('createDataItem', () => {
        it('should make a POST request to /v1/tickets/:ticket_id/data_items', () => {
            const params = {
                ticketId,
                dataTypeId,
                observationTargetId,
                dataItemValue: ['blue'],
                timestamp: 1489178421397,
                latitude: 36.141887,
                longitude: -115.262195,
                templateId,
                userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
            };
            mock.onPost(/\/v1\/tickets\/\d+\/data_items/).reply(200);

            const promise = tickets.createDataItem(params);
            expect(postSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}/data_items`, {
                dataTypeId,
                observationTargetId,
                dataItemValue: ['blue'],
                timestamp: 1489178421397,
                latitude: 36.141887,
                longitude: -115.262195,
                templateId,
                userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
            });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('deleteDataItem', () => {
        it('should make a DELETE request to /v1/tickets/:ticket_id/data_items/:data_item_id', () => {
            const params = {
                ticketId,
                dataItemId,
            };
            mock.onDelete(/\/v1\/tickets\/\d+\/data_items\/\w+/).reply(200);

            const promise = tickets.deleteDataItem(params);
            expect(deleteSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}/data_items/${dataItemId}`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('clone', () => {
        it('should make a POST request to /v1/tickets/:ticket_id/clone', () => {
            const params = {
                ticketId,
            };
            mock.onPost(/\/v1\/tickets\/\d+\/clone/).reply(200);

            const promise = tickets.clone(params);
            expect(postSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}/clone`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('submit', () => {
        it('should make a POST request to /v1/tickets/:ticket_id/submit', () => {
            const params = {
                ticketId,
            };
            mock.onPost(/\/v1\/tickets\/\d+\/submit/).reply(200);

            const promise = tickets.submit(params);
            expect(postSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}/submit`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('getById', () => {
        it('should make a GET request to /v1/tickets/:ticket_id', () => {
            const params = {
                ticketId,
                showCustomerMetadata: true,
            };
            mock.onGet(/\/v1\/tickets\/\d+/).reply(200);

            const promise = tickets.getById(params);
            expect(getSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}?show_customer_metadata=${params.showCustomerMetadata}`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('extend', () => {
        it('should make a PUT request to /v1/tickets/:ticket_id with `{ action: "extend" }`', () => {
            const params = {
                ticketId,
                dueDate: '2017-03-11T12:00:00',
                timeZone: 'America/Los_Angeles',
            };
            mock.onPut(/\/v1\/tickets\/\d+/).reply(200);

            const promise = tickets.extend(params);
            expect(putSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}`, {
                action: 'extend',
                dueDate: '2017-03-11T12:00:00',
                timeZone: 'America/Los_Angeles',
            });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('schedule', () => {
        it('should make a PUT request to /v1/tickets/:ticket_id with `{ action: "schedule" }`', () => {
            const params = {
                ticketId,
                force: true,
                timeZone: 'America/Los_Angeles',
                dateScheduled: '2017-03-11T12:00:00',
            };
            mock.onPut(/\/v1\/tickets\/\d+/).reply(200);

            const promise = tickets.schedule(params);
            expect(putSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}`, {
                action: 'schedule',
                force: true,
                timeZone: 'America/Los_Angeles',
                dateScheduled: '2017-03-11T12:00:00',
            });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('assign', () => {
        it('should make a PUT request to /v1/tickets/:ticket_id with `{ action: "assign" }`', () => {
            const params = {
                ticketId,
                customerId,
                force: true,
                scheduleHardDateTickets: true,
            };
            mock.onPut(/\/v1\/tickets\/\d+/).reply(200);

            const promise = tickets.assign(params);
            expect(putSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}`, {
                action: 'assign',
                customerId,
                force: true,
                scheduleHardDateTickets: true,
            });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('optin', () => {
        it('should make a PUT request to /v1/tickets/:ticket_id with `{ action: "optin" }`', () => {
            const params = {
                ticketId,
            };
            mock.onPut(/\/v1\/tickets\/\d+/).reply(200);

            const promise = tickets.optin(params);
            expect(putSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}`, { action: 'optin' });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('cancel', () => {
        it('should make a PUT request to /v1/tickets/:ticket_id with `{ action: "cancel" }`', () => {
            const params = {
                ticketId,
            };
            mock.onPut(/\/v1\/tickets\/\d+/).reply(200);

            const promise = tickets.cancel(params);
            expect(putSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}`, { action: 'cancel' });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('update', () => {
        it('should make a PUT request to /v1/tickets/:ticket_id with `{ action: "edit" }`', () => {
            const params = {
                ticketId,
                dueDate: '2017-03-11T12:00:00',
                timeZone: 'America/Los_Angeles',
                timeEstimate: 180,
                startDate: '2017-03-11T09:00:00',
            };
            mock.onPut(/\/v1\/tickets\/\d+/).reply(200);

            const promise = tickets.update(params);
            expect(putSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}`, {
                action: 'edit',
                dueDate: '2017-03-11T12:00:00',
                timeZone: 'America/Los_Angeles',
                timeEstimate: 180,
                startDate: '2017-03-11T09:00:00',
            });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('extendAll', () => {
        it('should make a PUT request to /v1/tickets with `{ action: "extend" }`', () => {
            const params = {
                ticketIds: [ticketId],
                dueDate: '2017-03-11T12:00:00',
                timeZone: 'America/Los_Angeles',
            };
            mock.onPut(/\/v1\/tickets/).reply(200);

            const promise = tickets.extendAll(params);
            expect(putSpy).to.have.been.calledWithExactly(`/v1/tickets`, {
                action: 'extend',
                ticketIds: [ticketId],
                dueDate: '2017-03-11T12:00:00',
                timeZone: 'America/Los_Angeles',
            });
            return expect(promise).to.be.fulfilled;
        });
    });


    describe('scheduleAll', () => {
        it('should make a PUT request to /v1/tickets with `{ action: "schedule" }`', () => {
            const params = {
                ticketIds: [ticketId],
                force: true,
                timeZone: 'America/Los_Angeles',
                dateScheduled: '2017-03-11T12:00:00',
            };
            mock.onPut(/\/v1\/tickets/).reply(200);

            const promise = tickets.scheduleAll(params);
            expect(putSpy).to.have.been.calledWithExactly(`/v1/tickets`, {
                action: 'schedule',
                ticketIds: [ticketId],
                force: true,
                timeZone: 'America/Los_Angeles',
                dateScheduled: '2017-03-11T12:00:00',
            });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('assignAll', () => {
        it('should make a PUT request to /v1/tickets with `{ action: "assign" }`', () => {
            const params = {
                ticketIds: [ticketId],
                customerId,
                force: true,
                scheduleHardDateTickets: true,
            };
            mock.onPut(/\/v1\/tickets/).reply(200);

            const promise = tickets.assignAll(params);
            expect(putSpy).to.have.been.calledWithExactly(`/v1/tickets`, {
                action: 'assign',
                ticketIds: [ticketId],
                customerId,
                force: true,
                scheduleHardDateTickets: true,
            });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('optinAll', () => {
        it('should make a PUT request to /v1/tickets with `{ action: "optin" }`', () => {
            const params = {
                ticketIds: [ticketId],
            };
            mock.onPut(/\/v1\/tickets/).reply(200);

            const promise = tickets.optinAll(params);
            expect(putSpy).to.have.been.calledWithExactly(`/v1/tickets`, {
                action: 'optin',
                ticketIds: [ticketId],
            });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('cancelAll', () => {
        it('should make a PUT request to /v1/tickets with `{ action: "cancel" }`', () => {
            const params = {
                ticketIds: [ticketId],
            };
            mock.onPut(/\/v1\/tickets/).reply(200);

            const promise = tickets.cancelAll(params);
            expect(putSpy).to.have.been.calledWithExactly(`/v1/tickets`, {
                action: 'cancel',
                ticketIds: [ticketId],
            });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('updateAll', () => {
        it('should make a PUT request to /v1/tickets with `{ action: "edit" }`', () => {
            const params = {
                ticketIds: [ticketId],
                dueDate: '2017-03-11T12:00:00',
                timeZone: 'America/Los_Angeles',
                timeEstimate: 180,
                startDate: '2017-03-11T09:00:00',
            };
            mock.onPut(/\/v1\/tickets/).reply(200);

            const promise = tickets.updateAll(params);
            expect(putSpy).to.have.been.calledWithExactly(`/v1/tickets`, {
                action: 'edit',
                ticketIds: [ticketId],
                dueDate: '2017-03-11T12:00:00',
                timeZone: 'America/Los_Angeles',
                timeEstimate: 180,
                startDate: '2017-03-11T09:00:00',
            });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('getAll', () => {
        it('should make a GET request to /v1/tickets', () => {
            const params = {
                limit: 10,
                offset: 0
            };
            mock.onGet(/\/v1\/tickets/).reply(200);

            const promise = tickets.getAll(params);
            expect(getSpy).to.have.been.calledWithExactly(`/v1/tickets?limit=${params.limit}&offset=${params.offset}`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('getByOrganization', () => {
        it('should make a GET request to /v1/organizations/:organization_id/tickets', () => {
            const params = {
                showCustomerMetadata: true,
                organizationId,
            };
            mock.onGet(/\/v1\/organizations\/\d+\/tickets/).reply(200);

            const promise = tickets.getByOrganization(params);
            expect(getSpy).to.have.been.calledWithExactly(`/v1/organizations/${organizationId}/tickets?show_customer_metadata=${params.showCustomerMetadata}`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('searchByOrganization', () => {
        it('should make a POST request to /v1/organizations/:organization_id/tickets/search', () => {
            const params = {
                showCustomerMetadata: true,
                limit: 10,
                offset: 0,
                organizationId,
                searchType: 'geo',
                latitude: 36.141887,
                uom: 'km',
                longitude: -115.262195,
                radius: 50,
            };
            mock.onPost(/\/v1\/organizations\/\d+\/tickets\/search/).reply(200);

            const promise = tickets.searchByOrganization(params);
            expect(postSpy).to.have.been.calledWithExactly(
                `/v1/organizations/${organizationId}/tickets/search?show_customer_metadata=${params.showCustomerMetadata}&limit=${params.limit}&offset=${params.offset}`,
                {
                    searchType: 'geo',
                    latitude: 36.141887,
                    uom: 'km',
                    longitude: -115.262195,
                    radius: 50,
                }
            );
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('getBySubscription', () => {
        it('should make a GET request to /v1/subscriptions/:subscription_id/tickets', () => {
            const params = {
                showCustomerMetadata: true,
                subscriptionId,
            };
            mock.onGet(/\/v1\/subscriptions\/\d+\/tickets/).reply(200);

            const promise = tickets.getBySubscription(params);
            expect(getSpy).to.have.been.calledWithExactly(`/v1/subscriptions/${subscriptionId}/tickets?show_customer_metadata=${params.showCustomerMetadata}`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('searchBySubscription', () => {
        it('should make a POST request to /v1/subscriptions/:subscription_id/tickets/search', () => {
            const params = {
                showCustomerMetadata: true,
                limit: 10,
                offset: 0,
                subscriptionId,
                searchType: 'geo',
                latitude: 36.141887,
                uom: 'km',
                longitude: -115.262195,
                radius: 50,
            };
            mock.onPost(/\/v1\/subscriptions\/\d+\/tickets/).reply(200);

            const promise = tickets.searchBySubscription(params);
            expect(postSpy).to.have.been.calledWithExactly(
                `/v1/subscriptions/${subscriptionId}/tickets/search?show_customer_metadata=${params.showCustomerMetadata}&limit=${params.limit}&offset=${params.offset}`,
                {
                    searchType: 'geo',
                    latitude: 36.141887,
                    uom: 'km',
                    longitude: -115.262195,
                    radius: 50,
                }
            );
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('getTicketMap', () => {
        it('should make a GET request to /v1/ticket_map', () => {
            const params = {
                mapLat: 36.141887,
                mapLon: -115.262195,
                radius: 50000,
            };
            mock.onGet(/\/v1\/ticket_map/).reply(200);

            const promise = tickets.getTicketMap(params);
            expect(getSpy).to.have.been.calledWithExactly(`/v1/ticket_map?map_lat=${params.mapLat}&map_lon=${params.mapLon}&radius=${params.radius}`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('getMetadata', () => {
        it('should make a GET request to /v1/tickets/:ticket_id/metadata', () => {
            const params = {
                ticketId,
            };
            mock.onGet(/\/v1\/tickets\/\d+\/metadata/).reply(200);

            const promise = tickets.getMetadata(params);
            expect(getSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}/metadata`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('createMetadata', () => {
        it('should make a POST request to /v1/tickets/:ticket_id/metadata', () => {
            const params = {
                ticketId,
                fyi: 'You can store anything in metadata!!',
                condition: 'As long as it can be serialized',
            };
            mock.onPost(/\/v1\/tickets\/\d+\/metadata/).reply(200);

            const promise = tickets.createMetadata(params);
            expect(postSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}/metadata`, {
                fyi: 'You can store anything in metadata!!',
                condition: 'As long as it can be serialized',
            });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('updateMetadata', () => {
        it('should make a PUT request to /v1/tickets/:ticket_id/metadata', () => {
            const params = {
                ticketId,
                fyi: 'You can store anything in metadata!!',
                condition: 'As long as it can be serialized',
            };
            mock.onPut(/\/v1\/tickets\/\d+\/metadata/).reply(200);

            const promise = tickets.updateMetadata(params);
            expect(putSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}/metadata`, {
                fyi: 'You can store anything in metadata!!',
                condition: 'As long as it can be serialized',
            });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('getEvents', () => {
        it('should make a GET request to /v1/tickets/:ticket_id/events', () => {
            const params = {
                ticketId,
                limit: 10,
                offset: 0,
            };
            mock.onGet(/\/v1\/tickets\/\d+\/events/).reply(200);

            const promise = tickets.getEvents(params);
            expect(getSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}/events?limit=${params.limit}&offset=${params.offset}`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('createEvent', () => {
        it('should make a POST request to /v1/tickets/:ticket_id/events', () => {
            const params = {
                ticketId,
                ticketEventType: 'COMMENT',
                ticketEventData: {
                    comment: 'Hello World'
                }
            };
            mock.onPost(/\/v1\/tickets\/\d+\/events/).reply(200);

            const promise = tickets.createEvent(params);
            expect(postSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}/events`, {
                ticketEventType: 'COMMENT',
                ticketEventData: {
                    comment: 'Hello World'
                }
            });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('deleteEvent', () => {
        it('should make a DELETE request to /v1/ticket_events/:ticket_event_id', () => {
            const params = {
                ticketEventId,
            };
            mock.onDelete(/\/v1\/ticket_events\/\d+/).reply(200);

            const promise = tickets.deleteEvent(params);
            expect(deleteSpy).to.have.been.calledWithExactly(`/v1/ticket_events/${ticketEventId}`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('getApplications', () => {
        it('should make a GET request to /v1/ticket_applications', () => {
            const params = {
                applFilter: 'PENDING',
            };

            mock.onGet(/\/v1\/ticket_applications/).reply(200);

            const promise = tickets.getApplications(params);
            expect(getSpy).to.have.been.calledWithExactly(`/v1/ticket_applications?appl_filter=${params.applFilter}`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('getApplicationsForCustomer', () => {
        it('should make a GET request to /v1/customers/:customer_id/applications', () => {
            const params = {
                customerId,
                applFilter: 'PENDING',
            };
            mock.onGet(/\/v1\/customers\/\d+\/applications/).reply(200);

            const promise = tickets.getApplicationsForCustomer(params);
            expect(getSpy).to.have.been.calledWithExactly(`/v1/customers/${customerId}/applications?appl_filter=${params.applFilter}`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('getApplication', () => {
        it('should make a GET request to /v1/customers/:customer_id/applications/:ticket_id', () => {
            const params = {
                customerId,
                ticketId,
            };
            mock.onGet(/\/v1\/customers\/\d+\/applications\/\d+/).reply(200);

            const promise = tickets.getApplication(params);
            expect(getSpy).to.have.been.calledWithExactly(`/v1/customers/${customerId}/applications/${ticketId}`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('getApplicants', () => {
        it('should make a GET request to /v1/tickets/:ticket_id/applicants', () => {
            const params = {
                ticketId,
            };
            mock.onGet(/\/v1\/tickets\/\d+\/applicants/).reply(200);

            const promise = tickets.getApplicants(params);
            expect(getSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}/applicants`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('apply', () => {
        it('should make a POST request to /v1/tickets/:ticket_id/applicants', () => {
            const params = {
                ticketId,
                reservationMinutes: 20,
            };
            mock.onPost(/\/v1\/tickets\/\d+\/applicants/).reply(200);

            const promise = tickets.apply(params);
            expect(postSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}/applicants?reservation_minutes=${params.reservationMinutes}`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('withdraw', () => {
        it('should make a DELETE request to /v1/tickets/:ticket_id/applicants', () => {
            const params = {
                ticketId,
            };
            mock.onDelete(/\/v1\/tickets\/\d+\/applicants/).reply(200);

            const promise = tickets.withdraw(params);
            expect(deleteSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}/applicants`);
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('withdrawAll', () => {
        it('should make a PUT request to /v1/tickets/:ticket_id/applicants with `{ action: "remove" }`', () => {
            const params = {
                ticketId,
                customerIds: [customerId],
            };
            mock.onPut(/\/v1\/tickets\/\d+\/applicants/).reply(200);

            const promise = tickets.withdrawAll(params);
            expect(putSpy).to.have.been.calledWithExactly(`/v1/tickets/${ticketId}/applicants`, {
                action: 'remove',
                customerIds: [customerId],
            });
            return expect(promise).to.be.fulfilled;
        });
    });
});

