// @flow
import { PaginatedQuery } from './';

export type TicketEvent = {
    id: string,
    ticketId: number,
    ticketEventType: string,
    ticketEventDate: string,
    ticketEventData: Object,
    createdCustomer: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        photoUrl: string
    }
}

export type Ticket = {
    title: string,
    description: string,
    id: number,
    organizationId: number,
    startDate: string,
    dueDate: string,
    timeEstimate: number,
    dateCreated: string,
    dateUpdated: string,
    omniDateUpdated: string,
    dateScheduled: string,
    canReschedule: boolean,
    dateSubmitted: string,
    executionState: string,
    waveId: string,
    status: string,
    assignedCustomerName: string,
    assignedCustomerId: number,
    assignedCustomerEmail: string,
    templateMap: Object,
    dataItems: Object,
    dataTypes: Array<Object>,
    dataTypeMap: Object,
    observationTargetMap: Object,
    observationTargetMetadataMap: Object,
    location: Object,
    calendarEvent: Object,
    subscriptionId: number,
    organizationSubscriptionVersionIdRef: number,
    subscription: Object,
    subscriptionMetadata: Object,
    ticketMetadata: Object
}

// V2Search?
export type ESTicketSearch = {
    total_records: number,
    search_results: Array<{
        score: number,
        data: {
            title: string,
            ticket_id: number,
            date_created: string,
            date_updated: string,
            start_date: string,
            due_date: string,
            time_estimate: number,
            dashboard_visible: boolean,
            optin_type: string,
            is_double_optin: boolean,
            ticket_status: string,
            assigned_customer_id: number,
            assigned_customer_name: string,
            assigned_customer_email: string,
            organization_id: number,
            organization_subscription_id: number,
            organization_subscription_description: string,
            organization_subscription_can_reschedule: boolean,
            organization_subscription_groups: Array<number>,
            location_title: string,
            location_id: number,
            location_organization_id: number,
            location_date_created: string,
            location_date_updated: string,
            location_country: string,
            location_locality: string,
            location_postal_code: number,
            location_geopoint: string,
            location_administrative_area_level_1: string,
            location_administrative_area_level_2: string,
            location_formatted_address: string,
            location_specificity: string,
            location_status: string,
            group_id: Array<number>,
            targets: Array<number>,
        }
    }>
}

type ESTicketSearchFields = {
    search_type: string,
    latitude?: number,
    uom?: number,
    longitude?: number,
    radius?: number,
    status?: string,
    date_type?: string,
    start_date?: string,
    end_date?: string,
    timezone?: string
}

export type SearchTicketsByGroupParams = PaginatedQuery & {
    groupId: number,
    dashboardVisible?: boolean,
    boundingBox?: {
        topLeft: {
            lat: number,
            lon: number
        },
        bottomRight: {
            lat: number,
            lon: number
        }
    },
    timezone?: string,
    query?: Array<{
        field: string,
        operator: string,
        value: string | boolean
    }>
    order?: {
        direction: 'asc' | 'desc',
        field: string,
    }
}

export type GetTicketsParams = {
    showCustomerMetadata?: boolean
}

export type GetTicketsForCustomerParams = {
    customerId: number,
    showCustomerMetadata?: boolean
}

export type SearchTicketsParams = PaginatedQuery & {
    organizationId: number,
    queryString: string,
    sort: Array<{
        sortKey: string,
        sortOrder: string
    }>,
    filters: Array<{
        filterKey: string,
        filterValue: string
    }>
}

export type SearchTicketFiltersParams = PaginatedQuery & {
    organizationId: number,
    searchField: string,
    queryString: string,
}

export type CreateTicketDataItemParams = {
    ticketId: number,
    dataTypeId: number,
    observationTargetId: number,
    dataItemValue: Array<number> | Array<string>,
    timestamp?: number,
    latitude?: number,
    longitude?: number,
    templateId?: number,
    deviceId?: number,
    appVersion?: number,
    userAgent?: string
}

export type DeleteTicketDataItemParams = {
    ticketId: number,
    dataItemId: string
}

export type CloneTicketParams = {
    ticketId: number
}

export type SubmitTicketParams = {
    ticketId: number
}

export type GetTicketByIdParams = {
    ticketId: number,
    showCustomerMetadata?: boolean
}

export type AssignTicketParams = {
    ticketId: number,
    customerId?: string,
    force?: boolean,
    scheduleHardDateTickets?: string,
}

export type ExtendTicketParams = {
    ticketId: number,
    dueDate?: string,
    timeZone?: string,
}

export type ScheduleTicketParams = {
    ticketId: number,
    force?: boolean,
    timeZone?: string,
    dateScheduled?: string,
}

export type OptinTicketParams = {
    ticketId: number,
}

export type CancelTicketParams = {
    ticketId: number,
}

export type UpdateTicketParams = {
    ticketId: number,
    dueDate?: string,
    timeZone?: string,
    timeEstimate?: number,
    startDate?: string,
}

export type AssignTicketsParams = {
    ticketIds: Array<number>,
    customerId?: string,
    force?: boolean,
    scheduleHardDateTickets?: boolean,
}

export type ExtendTicketsParams = {
    ticketIds: Array<number>,
    dueDate?: string,
    timeZone?: string,
}

export type ScheduleTicketsParams = {
    ticketIds: Array<number>,
    force?: boolean,
    timeZone?: string,
    dateScheduled?: string,
}

export type OptinTicketsParams = {
    ticketIds: Array<number>,
}

export type CancelTicketsParams = {
    ticketIds: Array<number>,
}

export type UpdateTicketsParams = {
    ticketIds: Array<number>,
    dueDate?: string,
    timeZone?: string,
    timeEstimate?: number,
    startDate?: string,
}

export type GetTicketsParams = PaginatedQuery;

type GeoSearch = {
    searchType: 'geo',
    latitude?: number,
    uom?: number,
    longitude?: number,
    radius?: number,
}

type StatusSearch = {
    searchType: 'status',
    status?: string,
}

type DataRangeSearch = {
    searchType?: 'data_range',
    dateType?: string,
    startDate?: string,
    endDate?: string,
    timezone?: string,
}

type StatusDateRangeSearch = {
    searchType: 'status_data_range',
    status?: string,
    dateType?: string,
    startDate?: string,
    endDate?: string,
    timezone?: string,
}

export type GetTicketsByOrganizationParams = PaginatedQuery & {
    organizationId: number,
    showCustomerMetadata?: boolean
}

export type SearchTicketsByOrganizationParams = PaginatedQuery & {
    organizationId: number,
    searchType: string,
    latitude?: number,
    uom?: number,
    longitude?: number,
    radius?: number,
    status?: string,
    dateType?: string,
    startDate?: string,
    endDate?: string,
    timezone?: string,
    showCustomerMetadata?: boolean
}

export type GetTicketsBySubscriptionParams = PaginatedQuery & {
    subscriptionId: number,
}

export type SearchTicketsBySubscriptionParams = PaginatedQuery & {
    subscriptionId: number,
    searchType: 'geo' | 'status' | 'date_range' | 'status_date_range' | 'status_n_days' | 'execution_state' | 'execution_state_date_range',
    latitude?: number,
    uom?: 'km' | 'mi',
    longitude?: number,
    radius?: number,
    status?: string,
    dateType?: string,
    startDate?: string,
    endDate?: string,
    timezone?: string,
    showCustomerMetadata?: boolean
}

export type GetTicketEventsParams = PaginatedQuery & {
    ticketId: number,
}

export type GetTicketMapParams = {
    mapLat: number,
    mapLon: number,
    radius: number
}

export type GetMetadataParams = {
    ticketId: number,
}

export type CreateMetadataParams = {
    ticketId: number,
    [key: string]: any,
}

export type UpdateMetadataParams = {
    ticketId: number,
    [key: string]: any,
}

export type CreateTicketEventParams = {
    ticketId: number,
    ticketEventType: string,
    ticketEventData: Object
}

export type DeleteTicketEventParams = {
    ticketEventId: number
}

// export type GetStatisticsByTicketParams = PaginatedQuery & {
//    ticket_id: number,
//    query?: GetStatisticsByTicketQuery
// }

export type ApplicationStatus = 'WITHDRAWN' | 'ACCEPTED' | 'PENDING' | 'REJECTED' | 'CANCELED';

export type GetTicketApplicationsParams = {
    applFilter?: ApplicationStatus,
}

export type GetTicketApplicationsForCustomerParams = {
    customerId: number,
    applFilter?: ApplicationStatus,
}

export type GetTicketApplicationParams = {
    customerId: number,
    ticketId: number,
}

export type GetTicketApplicantsParams = {
    ticketId: number,
}

export type ApplyToTicketParams = {
    ticketId: number,
    reservationMinutes?: number,
}

export type WithdrawFromTicketParams = {
    ticketId: number,
}

export type WithdrawAllFromTicketParams = {
    ticketId: number,
    customerIds: Array<number>
}
