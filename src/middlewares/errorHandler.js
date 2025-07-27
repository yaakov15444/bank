// middlewares/errorHandler.js
import AppError from "../utils/AppError.js";

function errorHandler(err, req, res, next) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            data: err.data ?? null,
        });
    }

    console.error("❌ Unhandled Error:", err);

    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
}

export default errorHandler;