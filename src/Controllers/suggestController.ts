import { Response } from "express"
import { BadRequestError, InternalServerError } from "../utils/Errors"
import ash from "express-async-handler"
import pool from "../db/db"
const suggestProductController =ash(async(req:any,res:Response)=>{
    const {name,email,suggestion}=req.matchedData
    if (!name || ! email || !suggestion){
        throw new BadRequestError("Invalid Request")
    }
    
    const result = await pool.query(`
    insert into store_suggestion (name,email,suggestion)
    values (?,?,?)
    `,[name,email,suggestion])
    if (result){
        
        res.status(200)
        res.json({
            success:true,
            result:result
        })
    }else {
        throw new InternalServerError("error inserting product suggesstion")
    }
    

})

export {suggestProductController}