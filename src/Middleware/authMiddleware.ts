import { NextFunction, Request, Response } from "express"
import { ForbiddenError, UnauthorizedError } from "../utils/Errors"

export const enableAuthenticate = (req:Request,res:Response,next:NextFunction)=>{
 // console.log(req.isAuthenticated(),"here will")
    if (req.isAuthenticated()){
      return next()
    }
    throw new UnauthorizedError("Route requires authenticated user")
  }


export const enableAuthenticateAdmin = (req:any,res:Response,next:NextFunction)=>{
  if (!req.isAuthenticated){
    throw new UnauthorizedError("Route requires authenticated user")
}
  let admin = req.user[0].admin
  console.log(admin,"admin status")
  if (admin===0){
    throw new ForbiddenError("Access forbidden")
  }
  return next()
}