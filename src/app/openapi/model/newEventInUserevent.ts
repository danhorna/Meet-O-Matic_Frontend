/**
 * backend
 * backend
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: dan_franco_15@hotmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * (tsType: @loopback/repository-json-schema#Optional<Omit<Event, \'id\'>, \'usereventId\'>, schemaOptions: { title: \'NewEventInUserevent\', exclude: [ \'id\' ], optional: [ \'usereventId\' ] })
 */
export interface NewEventInUserevent { 
    dates: Array<object>;
    active?: boolean;
    name: string;
    description: string;
    password: string;
    auth: string;
    usereventId?: string;
    creationDate?: string;
}

