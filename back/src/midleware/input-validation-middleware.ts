import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        res.status(400).send({ errors: result.array() });
    } else {
        next()
    }
}