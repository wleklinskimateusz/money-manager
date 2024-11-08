export class InternalServerError extends Error {
    statusCode: number;
    constructor(message: string, cause?: unknown) {
        super(message);
        this.name = "InternalServerError";
        this.statusCode = 500;
        this.cause = cause;
    }
}
