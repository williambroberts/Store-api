import { Response } from "express";
import pool from "../db/db";
import ash from "express-async-handler"
import { InternalServerError } from "../utils/Errors";

export const subscribeController = ash(async(req:any,res:Response)=>{
    //query db add email to the store_emails table
    let {email} = req.matchedData
    console.log("email controller",email)
    const result = await pool.query(`
    insert ignore into store_emails (email)
    VALUES (?);
    `,[email])
    if (result){
        res.status(200)
        res.json({
            success:true,
            email:email
        })
    }else {
        throw new InternalServerError("Subscription failed")
    }

})