import type { Request, Response, NextFunction } from "express";

// Handles 404 (Not Found)
// If someone hits a route that doesn’t exist:
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // “Skip everything else and go to the error handler.” - Now Express looks for: (err, req, res, next)
};

// Global Error Handler
// If a function has 4 parameters, Express knows: “This function handles errors.”
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // condition ? valueIfTrue : valueIfFalse
  // If res.statusCode === 200 - then use 500 - otherwise use res.statusCode

  // If nobody changed the status (it's still 200), then this must be an internal server error → use 500.
  // Otherwise: If someone already set a proper status (like 404 or 401), keep that status.
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = "Server Error"; // default message

  // Handle known Error objects
  // If this is a real Error object, use its message. Otherwise, keep the default message.
  if (err instanceof Error) {
    message = err.message;
  }

  // Handle Mongoose CastError (Invalid ObjectId)
  if ((err as any)?.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  res.status(statusCode).json({
    message,
    stack:
      process.env.NODE_ENV === "production"
        ? null // If we are in production → don’t show stack.
        : err instanceof Error // If we are in development and it's a real Error
          ? err.stack // show stack.
          : null, // Otherwise → don’t show stack.
  });
};

// stack shows: Where the error happened
// Which file - Which line
// Very useful for developers.
// Very dangerous to expose publicly.
