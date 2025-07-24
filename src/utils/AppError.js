class AppError extends Error {
    constructor(message, statusCode = 500, data = null) {
        super(message);
        this.statusCode = statusCode;
        this.data = data; // מידע נוסף אם יש
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
