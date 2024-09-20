import { ErrorRequestHandler, Response } from "express";
import { z } from "zod";
import { BAD_REQUEST } from "../constants/http";

const handleZodError = (res:Response, error:z.ZodError)=>{
    const errors = error.issues.map((e)=>({
        path:e.path.join('.'),
        message:e.message,
    }));
    return res.status(BAD_REQUEST).json({
        message:error.message,
        errors,
    });
}

const errorHandler:ErrorRequestHandler = (error, req, res, next)=>{
    console.log(`PATH: ${req.path}`, error);

    if(error instanceof z.ZodError){
        return handleZodError(res, error);
    }
    
    return res.status(500).send("Something went wrong")
}

export default errorHandler;