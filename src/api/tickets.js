// @flow
import Resource from './resource';
import stringifyQuery from '../utils/stringifyQuery';
import type {
    APIPromise,
    ESTicket,
    TicketEvent,
    Ticket,
    ESTicketSearch,
    SearchTicketsByGroupParams,
    GetTicketsParams,
    GetTicketsForCustomerParams,
    SearchTicketsParams,
    SearchTicketFiltersParams,
    CreateTicketDataItemParams,
    DeleteTicketDataItemParams,
    CloneTicketParams,
    SubmitTicketParams,
    GetTicketByIdParams,
    AssignTicketParams,
    ExtendTicketParams,
    ScheduleTicketParams,
    OptinTicketParams,
    CancelTicketParams,
    UpdateTicketParams,
    AssignTicketsParams,
    ExtendTicketsParams,
    ScheduleTicketsParams,
    OptinTicketsParams,
    CancelTicketsParams,
    UpdateTicketsParams,
    GetTicketsByOrganizationParams,
    SearchTicketsByOrganizationParams,
    GetTicketsBySubscriptionParams,
    SearchTicketsBySubscriptionParams,
    GetTicketEventsParams,
    GetTicketMapParams,
    GetTicketApplicationsParams,
    GetTicketApplicationsForCustomerParams,
    GetTicketApplicationParams,
    GetTicketApplicantsParams,
    ApplyToTicketParams,
    WithdrawFromTicketParams,
    WithdrawAllFromTicketParams
} from '../flow';

export default class Tickets extends Resource {
    /**
     * @api {post} /v1/groups/:group_id/tickets/search searchForGroup
     * @apiGroup Tickets
     * @apiName searchForGroup
     * @apiDescription Get all tickets from the specified group that satisfy the search criteria, now we support field bundleAutoassign with
     operator = and values true or false. Capable of returning paginated results.
     * @apiParam {Number} group_id
     * @apiParam {Object[]} query_params
     * @apiParam {Object} bounding_box
     * @apiParam {String} timezone
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.tickets.searchByGroup({...})
     */
    searchByGroup(params: SearchTicketsByGroupParams): APIPromise<Array<Ticket>> {
        const { groupId, dashboardVisible, limit, offset, sortField, sortOrder, ...data } = params;
        const query = { dashboardVisible, limit, offset, sortField, sortOrder };
        const queryString = stringifyQuery(query);
        
        return this.client.post(`/v1/groups/${groupId}/tickets/search?v2=1${(queryString.length > 0) ? `&${queryString.slice(1)}` : ''}`, data);
    }

    /**
     * @api {get} /v1/tickets/my_list getAllForCurrentCustomer
     * @apiGroup Tickets
     * @apiName getAllForCurrentCustomer
     * @apiDescription Get all tickets that belong to current user's id.
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.tickets.getAllForCurrentCustomer({...})
     */
    get(params: GetTicketsParams): APIPromise<Array<Ticket>> {
        return this.client.get(`/v1/tickets/my_list${stringifyQuery(params)}`);
    }

    /**
     * @api {get} /v1/customers/:customer_id/tickets getAllForCustomer
     * @apiGroup Tickets
     * @apiName getAllForCustomer
     * @apiDescription Get all tickets that belong to the given customer.
     * @apiParam {Number} customer_id
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.tickets.getAllForCustomer({...})
     */
    getForCustomer(params: GetTicketsForCustomerParams): APIPromise<Array<Ticket>> {
        const { customerId, ...query } = params;
        return this.client.get(`/v1/customers/${customerId}/tickets${stringifyQuery(query)}`);
    }

    /**
     * @api {post} /v2/organizations/:organization_id/search/tickets searchForOrganization
     * @apiGroup Tickets
     * @apiName searchForOrganization
     * @apiDescription Search all tickets of an organization. Capable of returning paginated results.
     * @apiParam {Number} organization_id
     * @apiParam {String} query_string
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.tickets.searchForOrganization({...})
     */
    search(params: SearchTicketsParams): APIPromise<ESTicketSearch> {
        const { organizationId, limit, offset, sortField, sortOrder, ...data } = params;
        const query = { limit, offset, sortField, sortOrder };

        return this.client.post(`/v2/organizations/${organizationId}/search/tickets${stringifyQuery(query)}`, data);
    }

    /**
     * @api {post} /v2/organizations/:organization_id/search/tickets/filters searchWithFieldForOrganization
     * @apiGroup Tickets
     * @apiName searchWithFieldForOrganization
     * @apiDescription Search all tickets of an organization in the specified searchField. Capable of returning paginated results.
     * @apiParam {Number} organization_id
     * @apiParam {String} search_field
     * @apiParam {String} query_string
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.tickets.searchWithFieldForOrganization({...})
     */
    searchFilters(params: SearchTicketFiltersParams): APIPromise<ESTicketSearch> {
        const { organizationId,limit, offset, sortField, sortOrder, ...data } = params;
        const query = { limit, offset, sortField, sortOrder };

        return this.client.post(`/v2/organizations/${organizationId}/search/tickets/filters${stringifyQuery(query)}`, data);
    }

    /**
     * @api {post} /v1/tickets/:ticket_id/data_items createDataItem
     * @apiGroup Tickets
     * @apiName createDataItem
     * @apiDescription Create a new data_item for the ticket.
     * @apiParam {Number} ticket_id
     * @apiParam {Object} data_item
     * @apiExample {js} Example:
     *             gigwalk.tickets.createDataItem({...})
     */
    createDataItem(params: CreateTicketDataItemParams): APIPromise<[Ticket]> {
        const { ticketId, ...data } = params;
        return this.client.post(`/v1/tickets/${ticketId}/data_items`, { ...data });
    }

    /**
     * @api {delete} /v1/tickets/:ticket_id/data_items/:data_item_id deleteDataItem
     * @apiGroup Tickets
     * @apiName deleteDataItem
     * @apiDescription Delete the specified data_item from the specified ticket. This is a hard delete.
     * @apiParam {Number} ticket_id
     * @apiParam {Number} data_item_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.deleteDataItem({...})
     */
    deleteDataItem(params: DeleteTicketDataItemParams): APIPromise<[Ticket]> {
        return this.client.delete(`/v1/tickets/${params.ticketId}/data_items/${params.dataItemId}`);
    }

    /**
     * @api {post} /v1/tickets/:ticket_id/clone clone
     * @apiGroup Tickets
     * @apiName clone
     * @apiDescription Create a new ticket by cloning the given ticket. This is a deep copy: metadata is copied as well. Ticket status will be UNASSIGNED.
     * @apiParam {Number} ticket_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.clone({...})
     */
    clone(params: CloneTicketParams): APIPromise<[Ticket]> {
        return this.client.post(`/v1/tickets/${params.ticketId}/clone`);
    }

    /**
     * @api {post} /v1/tickets/:ticket_id/submit submit
     * @apiGroup Tickets
     * @apiName submit
     * @apiDescription Submit the given ticket. This is a terminal state for the ticket.
     * @apiParam {Number} ticket_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.submit({...})
     */
    submit(params: SubmitTicketParams): APIPromise<[Ticket]> {
        return this.client.post(`/v1/tickets/${params.ticketId}/submit`);
    }

    /**
     * @api {get} /v1/tickets/:ticket_id get
     * @apiGroup Tickets
     * @apiName get
     * @apiDescription Get ticket information. it returns information about the specified ticket.
     * @apiParam {Number} ticket_id
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.tickets.get({...})
     */
    getById(params: GetTicketByIdParams): APIPromise<[Ticket]> {
        const { ticketId, ...query } = params;
        return this.client.get(`/v1/tickets/${ticketId}${stringifyQuery(query)}`);
    }

    /**
     * @api {put} /v1/tickets/:ticket_id update
     * @apiGroup Tickets
     * @apiName update
     * @apiDescription Perform action on the corresponding ticket.
     * @apiParam {Number} ticket_id
     * @apiParam {String} [action='schedule']
     * @apiParam {String} customer_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.update({...})
     */
    extend(params: ExtendTicketParams): APIPromise<Array<Ticket>> {
        const { ticketId, ...data } = params;
        return this.client.put(`/v1/tickets/${ticketId}`, { ...data, action: 'extend' });
    }

    /**
     * @api {put} /v1/tickets/:ticket_id update
     * @apiGroup Tickets
     * @apiName update
     * @apiDescription Perform action on the corresponding ticket.
     * @apiParam {Number} ticket_id
     * @apiParam {String} [action='schedule']
     * @apiParam {String} customer_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.update({...})
     */
    schedule(params: ScheduleTicketParams): APIPromise<Array<Ticket>> {
        const { ticketId, ...data } = params;
        return this.client.put(`/v1/tickets/${ticketId}`, { ...data, action: 'schedule' });
    }

    /**
     * @api {put} /v1/tickets/:ticket_id update
     * @apiGroup Tickets
     * @apiName update
     * @apiDescription Perform action on the corresponding ticket.
     * @apiParam {Number} ticket_id
     * @apiParam {String} [action='schedule']
     * @apiParam {String} customer_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.update({...})
     */
    assign(params: AssignTicketParams): APIPromise<Array<Ticket>> {
        const { ticketId, ...data } = params;
        return this.client.put(`/v1/tickets/${ticketId}`, { ...data, action: 'assign' });
    }

    /**
     * @api {put} /v1/tickets/:ticket_id update
     * @apiGroup Tickets
     * @apiName update
     * @apiDescription Perform action on the corresponding ticket.
     * @apiParam {Number} ticket_id
     * @apiParam {String} [action='schedule']
     * @apiParam {String} customer_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.update({...})
     */
    optin(params: OptinTicketParams): APIPromise<Array<Ticket>> {
        const { ticketId, ...data } = params;
        return this.client.put(`/v1/tickets/${ticketId}`, { ...data, action: 'optin' });
    }

    /**
     * @api {put} /v1/tickets/:ticket_id update
     * @apiGroup Tickets
     * @apiName update
     * @apiDescription Perform action on the corresponding ticket.
     * @apiParam {Number} ticket_id
     * @apiParam {String} [action='schedule']
     * @apiParam {String} customer_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.update({...})
     */
    cancel(params: CancelTicketParams): APIPromise<Array<Ticket>> {
        const { ticketId, ...data } = params;
        return this.client.put(`/v1/tickets/${ticketId}`, { ...data, action: 'cancel' });
    }

    /**
     * @api {put} /v1/tickets/:ticket_id update
     * @apiGroup Tickets
     * @apiName update
     * @apiDescription Perform action on the corresponding ticket.
     * @apiParam {Number} ticket_id
     * @apiParam {String} [action='schedule']
     * @apiParam {String} customer_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.update({...})
     */
    update(params: UpdateTicketParams): APIPromise<Array<Ticket>> {
        const { ticketId, ...data } = params;
        return this.client.put(`/v1/tickets/${ticketId}`, { ...data, action: 'edit' });
    }

    /**
     * @api {put} /v1/tickets/:ticket_id update
     * @apiGroup Tickets
     * @apiName update
     * @apiDescription Perform action on the corresponding ticket.
     * @apiParam {Number} ticket_id
     * @apiParam {String} [action='schedule']
     * @apiParam {String} customer_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.update({...})
     */
    extendAll(params: ExtendTicketsParams): APIPromise<Array<Ticket>> {
        return this.client.put('/v1/tickets', { ...params, action: 'extend' });
    }

    /**
     * @api {put} /v1/tickets/:ticket_id update
     * @apiGroup Tickets
     * @apiName update
     * @apiDescription Perform action on the corresponding ticket.
     * @apiParam {Number} ticket_id
     * @apiParam {String} [action='schedule']
     * @apiParam {String} customer_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.update({...})
     */
    scheduleAll(params: ScheduleTicketsParams): APIPromise<Array<Ticket>> {
        return this.client.put('/v1/tickets', { ...params, action: 'schedule' });
    }

    /**
     * @api {put} /v1/tickets/:ticket_id update
     * @apiGroup Tickets
     * @apiName update
     * @apiDescription Perform action on the corresponding ticket.
     * @apiParam {Number} ticket_id
     * @apiParam {String} [action='schedule']
     * @apiParam {String} customer_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.update({...})
     */
    assignAll(params: AssignTicketsParams): APIPromise<Array<Ticket>> {
        return this.client.put('/v1/tickets', { ...params, action: 'assign' });
    }

    /**
     * @api {put} /v1/tickets/:ticket_id update
     * @apiGroup Tickets
     * @apiName update
     * @apiDescription Perform action on the corresponding ticket.
     * @apiParam {Number} ticket_id
     * @apiParam {String} [action='schedule']
     * @apiParam {String} customer_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.update({...})
     */
    optinAll(params: OptinTicketsParams): APIPromise<Array<Ticket>> {
        return this.client.put('/v1/tickets', { ...params, action: 'optin' });
    }

    /**
     * @api {put} /v1/tickets/:ticket_id update
     * @apiGroup Tickets
     * @apiName update
     * @apiDescription Perform action on the corresponding ticket.
     * @apiParam {Number} ticket_id
     * @apiParam {String} [action='schedule']
     * @apiParam {String} customer_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.update({...})
     */
    cancelAll(params: CancelTicketsParams): APIPromise<Array<Ticket>> {
        return this.client.put('/v1/tickets', { ...params, action: 'cancel' });
    }

    /**
     * @api {put} /v1/tickets update
     * @apiGroup Tickets
     * @apiName bulkUpdate
     * @apiDescription Edit tickets. Perform action on tickets with ticket_ids.
     * @apiParam {String} [action='schedule']
     * @apiParam {Number[]} ticket_ids
     * @apiParam {String} customer_id
     * @apiExample {js} Example:
     *             gigwalk.tickets.bulkUpdate({...})
     */
    updateAll(params: UpdateTicketsParams): APIPromise<Array<Ticket>> {
        return this.client.put('/v1/tickets', { ...params, action: 'edit' });
    }

    /**
     * @api {get} /v1/tickets getAll
     * @apiGroup Tickets
     * @apiName getAll
     * @apiDescription Gets all tickets of the current user's organization.
     * @apiExample {js} Example:
     *             gigwalk.tickets.getAll({...})
     */
    getAll(params: GetTicketsParams): APIPromise<Array<Ticket>> {
        return this.client.get(`/v1/tickets${stringifyQuery(params)}`);
    }

    /**
     * @api {get} /v1/organizations/:organization_id/tickets getAllForOrganization
     * @apiGroup Tickets
     * @apiName getAllForOrganization
     * @apiDescription Get information about all tickets of the organization. Capable of returning paginated results.
     * @apiParam {Number} organization_id
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.tickets.getAllForOrganization({...})
     */
    getByOrganization(params: GetTicketsByOrganizationParams): APIPromise<Array<Ticket>> {
        const { organizationId, ...query } = params;
        return this.client.get(`/v1/organizations/${organizationId}/tickets${stringifyQuery(query)}`);
    }

    /**
     * @api {post} /v1/organizations/:organization_id/tickets/search searchWithCriteriaForOrganization
     * @apiGroup Tickets
     * @apiName searchWithCriteriaForOrganization
     * @apiDescription Search tickets filtered by organization. Capable of returning paginated results.
     * @apiParam {Number} organization_id
     * @apiParam {Object} search
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.tickets.searchWithCriteriaForOrganization({...})
     */
    searchByOrganization(params: SearchTicketsByOrganizationParams): APIPromise<Array<Ticket>> {
        const { organizationId, showCustomerMetadata, limit, offset, sortField, sortOrder, ...data } = params;
        const query = { showCustomerMetadata, limit, offset, sortField, sortOrder };

        return this.client.post(`/v1/organizations/${organizationId}/tickets/search${stringifyQuery(query)}`, data);
    }

    /**
     * @api {get} /v1/subscriptions/:subscription_id/tickets getAllForSubscription
     * @apiGroup Tickets
     * @apiName getAllForSubscription
     * @apiDescription Get information of all tickets in organizationSubscription (project). Capable of returning paginated results.
     * @apiParam {Number} subscription_id
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.tickets.getAllForSubscription({...})
     */
    getBySubscription(params: GetTicketsBySubscriptionParams): APIPromise<Array<Ticket>> {
        const { subscriptionId, ...query } = params;
        return this.client.get(`/v1/subscriptions/${subscriptionId}/tickets${stringifyQuery(query)}`);
    }

    /**
     * @api {post} /v1/subscriptions/:subscription_id/tickets/search searchForSubscription
     * @apiGroup Tickets
     * @apiName searchForSubscription
     * @apiDescription Search tickets filtered by the organizationSubscription (project). Capable of returning paginated results.
     * @apiParam {Number} subscription_id
     * @apiParam {Object} search
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.tickets.searchForSubscription({...})
     */
    searchBySubscription(params: SearchTicketsBySubscriptionParams): APIPromise<Array<Ticket>> {
        const { subscriptionId, showCustomerMetadata, limit, offset, sortField, sortOrder, ...data } = params;
        const query = { showCustomerMetadata, limit, offset, sortField, sortOrder };

        return this.client.post(`/v1/subscriptions/${subscriptionId}/tickets/search${stringifyQuery(query)}`, data);
    }

    /**
     * @api {get} /v1/ticket_map getAllInArea
     * @apiGroup Tickets
     * @apiName getAllInArea
     * @apiDescription Return all applicable tickets within a radius of the specified location for a map display. Only nassigned tickets that fit the
     certification criteria and are not yet due are returned.
     * @apiParam {Number} map_lat
     * @apiParam {Number} map_lon
     * @apiParam {Number} radius
     * @apiExample {js} Example:
     *             gigwalk.tickets.getAllInArea({...})
     */
    getTicketMap(params: GetTicketMapParams): APIPromise<Array<ESTicket>> {
        return this.client.get(`/v1/ticket_map${stringifyQuery(params)}`);
    }

    /**
     * @api {get} /v1/tickets/:ticket_id/metadata get
     * @apiGroup TicketMetadata
     * @apiName get
     * @apiDescription Given a ticket_id, fetch its metadata.
     * @apiParam {Number} ticket_id
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.ticketMetadata.get({...})
     */
    getMetadata(params: GetMetadataParams): APIPromise<Object> {
        return this.client.get(`/v1/tickets/${params.ticketId}/metadata`);
    }

    /**
     * @api {post} /v1/tickets/:ticket_id/metadata create
     * @apiGroup TicketMetadata
     * @apiName create
     * @apiDescription Create metadata for the given ticket. Use an array of key-value pairs to add ticket metadata.
     * @apiParam {Number} ticket_id
     * @apiParam {Object} metadata
     * @apiExample {js} Example:
     *             gigwalk.ticketMetadata.create({...})
     */
    createMetadata(params: CreateMetadataParams): APIPromise<Object> {
        const { ticketId, ...data } = params;
        return this.client.post(`/v1/tickets/${ticketId}/metadata`, data);
    }

    /**
     * @api {put} /v1/tickets/:ticket_id/metadata update
     * @apiGroup TicketMetadata
     * @apiName update
     * @apiDescription Update metadata for the given ticket. Use an array of key-value pairs to update ticket metadata.
     * @apiParam {Number} ticket_id
     * @apiParam {Object} metadata
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.ticketMetadata.update({...})
     */
    updateMetadata(params: UpdateMetadataParams): APIPromise<Object> {
        const { ticketId, ...data } = params;
        return this.client.put(`/v1/tickets/${ticketId}/metadata`, data);
    }

    /**
     * @api {get} /v1/tickets/:ticket_id/events getEvents
     * @apiGroup Tickets
     * @apiName getEvents
     * @apiDescription Return events of ticket. Capable of returning paginated results.
     * @apiParam {Number} ticket_id
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.tickets.getEvents({...})
     */
    getEvents(params: GetTicketEventsParams): APIPromise<Array<TicketEvent>> {
        const { ticketId, ...query } = params;
        return this.client.get(`/v1/tickets/${ticketId}/events${stringifyQuery(query)}`);
    }

    /**
     * @api {post} /v1/tickets/:ticket_id/events create
     * @apiGroup TicketEvents
     * @apiName create
     * @apiDescription Create a new ticket event for ticket.
     * @apiParam {Number} ticket_id
     * @apiParam {Object} ticket_event
     * @apiExample {js} Example:
     *             gigwalk.ticketEvents.create({...})
     */
    createEvent(params: CreateTicketEventParams): APIPromise<[TicketEvent]> {
        const { ticketId, ...data } = params;
        return this.client.post(`/v1/tickets/${ticketId}/events`, data);
    }

    /**
     * @api {delete} /v1/ticket_events/:ticket_event_id delete
     * @apiGroup TicketEvents
     * @apiName delete
     * @apiDescription Delete the specified ticket event.
     * @apiParam {Number} ticket_event_id
     * @apiExample {js} Example:
     *             gigwalk.ticketEvents.delete({...})
     */
    deleteEvent(params: DeleteTicketEventParams): APIPromise<[number]> {
        return this.client.delete(`/v1/ticket_events/${params.ticketEventId}`);
    }

    // /**
    // * @api {get} /v1/tickets/:ticket_id/customers/location_search getByTicket
    // * @apiGroup CustomerStatistics
    // * @apiName getByTicket
    // * @apiDescription Get information about tickets' owners.
    // * @apiParam {Number} ticket_id
    // * @apiParam {Object} [query]
    // * @apiExample {js} Example:
    // *             gigwalk.customerStatistics.getByTicket({...})
    // */
    // getByTicket(params: GetStatisticsByTicketParams): APIPromise<any> {
    //    const query = this.stringForQueryObject(params.query);
    //
    //    return this.client.get(`/v1/tickets/${params.ticket_id}/customers/location_search${query}`);
    // }


    /**
     * @api {get} /v1/ticket_applications getForCurrentCustomer
     * @apiGroup DoubleOptin
     * @apiName getForCurrentCustomer
     * @apiDescription Get all ticket applications that belong to current user.
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.doubleOptin.getForCurrentCustomer({...})
     */
    getApplications(params: GetTicketApplicationsParams): APIPromise<any> {
        return this.client.get(`/v1/ticket_applications${stringifyQuery(params)}`);
    }

    /**
     * @api {get} /v1/customers/:customer_id/applications getForCustomer
     * @apiGroup DoubleOptin
     * @apiName getForCustomer
     * @apiDescription Get all ticket applications that belong to the querying customerID. Requires platform admin permssions.
     * @apiParam {Number} customer_id
     * @apiParam {Object} [query]
     * @apiExample {js} Example:
     *             gigwalk.doubleOptin.getForCustomer({...})
     */
    getApplicationsForCustomer(params: GetTicketApplicationsForCustomerParams): APIPromise<any> {
        const { customerId, ...query } = params;
        return this.client.get(`/v1/customers/${customerId}/applications${stringifyQuery(query)}`);
    }

    /**
     * @api {get} /v1/customers/:customer_id/applications/:ticket_id get
     * @apiGroup DoubleOptin
     * @apiName get
     * @apiDescription Get all candidates applying for this ticket.
     * @apiParam {Number} customer_id
     * @apiParam {Number} ticket_id
     * @apiExample {js} Example:
     *             gigwalk.doubleOptin.get({...})
     */
    getApplication(params: GetTicketApplicationParams): APIPromise<any> {
        return this.client.get(`/v1/customers/${params.customerId}/applications/${params.ticketId}`);
    }

    /**
     * @api {get} /v1/tickets/:ticket_id/applicants getAll
     * @apiGroup DoubleOptin
     * @apiName getAll
     * @apiDescription Get all candidates applying for this ticket.
     * @apiParam {Number} ticket_id
     * @apiExample {js} Example:
     *             gigwalk.doubleOptin.getAll({...})
     */
    getApplicants(params: GetTicketApplicantsParams): APIPromise<any> {
        return this.client.get(`/v1/tickets/${params.ticketId}/applicants`);
    }

    /**
     * @api {post} /v1/tickets/:ticket_id/applicants apply
     * @apiGroup DoubleOptin
     * @apiName apply
     * @apiDescription Apply for a ticket with the current user.
     * @apiParam {Number} ticket_id
     * @apiExample {js} Example:
     *             gigwalk.doubleOptin.apply({...})
     */
    apply(params: ApplyToTicketParams): APIPromise<any> {
        const { ticketId, ...query } = params;
        return this.client.post(`/v1/tickets/${ticketId}/applicants${stringifyQuery(query)}`);
    }

    /**
     * @api {} DELETE /v1/tickets/:ticket_id/applicants remove
     * @apiGroup DoubleOptin
     * @apiName remove
     * @apiDescription Cancel the current users application for a ticket.
     * @apiParam {Number} ticket_id
     * @apiExample {js} Example:
     *             gigwalk.doubleOptin.remove({...})
     */
    withdraw(params: WithdrawFromTicketParams): APIPromise<any> {
        return this.client.delete(`/v1/tickets/${params.ticketId}/applicants`);
    }

    /**
     * @api {put} /v1/tickets/:ticket_id/applicants bulkRemove
     * @apiGroup DoubleOptin
     * @apiName bulkRemove
     * @apiDescription Bulk remove doubleOptin applications for a ticket. Admin and above can withdraw others applications.
     * @apiParam {Number} ticket_id
     * @apiParam {Number[]} customer_ids
     * @apiExample {js} Example:
     *             gigwalk.doubleOptin.bulkRemove({...})
     */
    withdrawAll(params: WithdrawAllFromTicketParams): APIPromise<any> {
        const { ticketId, ...data } = params;
        return this.client.put(`/v1/tickets/${params.ticketId}/applicants`, { ...data, action: 'remove' });
    }
}
