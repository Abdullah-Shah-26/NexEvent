/* 
 * Central export point for all database models
 * Import models from this file throughout the application
*/

export { default as Event } from './event.model';
export { default as Booking } from './booking.model';

export type { IEvent } from './event.model';
export type { IBooking } from './booking.model';
