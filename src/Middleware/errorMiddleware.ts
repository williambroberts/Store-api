import { NextFunction, Request, Response } from "express"
import { NotFoundError } from "../utils/Errors"

export const errorHandler  =(err:Error,req:Request,res:Response,next:NextFunction)=>{
    const statusCode = res.statusCode===200? 500: res.statusCode
    res.status(statusCode).json({
        message:err.message,
        stack:err.stack,
        status:statusCode
    })
}


export const notFound = (err:Error,req:Request,res:Response,next:NextFunction)=>{
    const error = new NotFoundError(`Not Found ${req.originalUrl}`)
    next(error)
}

