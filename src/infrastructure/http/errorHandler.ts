import { Request, Response, NextFunction } from "express"; 
import { ApiError } from "../../shared/errors/ApiError";

export const errorHandler = (err:Error, _req:Request,  res: Response, _next: NextFunction) => {
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({message: err.message});
    }
    console.log(err);
    return res.status(500).json({message: err.message});
}