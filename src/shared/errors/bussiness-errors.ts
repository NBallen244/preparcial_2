/* eslint-disable prettier/prettier */
export class BussinessLogicException extends Error {
    error: BussinessError;
    constructor(message: string, error: BussinessError) {
        super(message);
        this.error = error;
    }
}
export enum BussinessError {
    NOT_FOUND = 'NOT_FOUND',
    PRECONDITION_FAILED = 'PRECONDITION_FAILED',
    BAD_REQUEST = 'BAD_REQUEST',
    CONFLICT = 'CONFLICT',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
    LOCKED = 'LOCKED',
    FORBIDDEN = 'FORBIDDEN',

}