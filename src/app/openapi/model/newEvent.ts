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
 * (tsType: Omit<Event, \'id\'>, schemaOptions: { title: \'NewEvent\', exclude: [ \'id\' ] })
 */
export interface NewEvent { 
    dates: Array<object>;
    active?: boolean;
    name: string;
    description: string;
    password: string;
    auth: string;
    usereventId?: string;
    creationDate?: string;
}

