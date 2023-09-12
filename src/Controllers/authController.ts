import { BadRequestError, ConflictError, InternalServerError } from "../utils/Errors" 
import ash from "express-async-handler"
import pool from "../db/db"
import { hashPassword } from "../Helpers/passwords"
import { Response } from "express"


export const isAuthController = ash(async(req:any,res:Response)=>{
    res.status(200)
    res.json({
        success:true,
        status:200,
        isAuth:req.isAuthenticated()
    })
})

export const loginController = async(req:any,res:Response)=>{
    res.status(200)
    res.json({success:true,
    user_email:req.user.email,
    user_id:req.user.id,
    status:200,
    route:"loginController"
    })
}

export const registerController = ash(async(req:any,res:Response)=>{
    const {email,password}=req.matchedData
    console.log("register controller")
    if (!email ||!password){
        throw new BadRequestError("Invalid credentials")
        
    }
    const [row]:any=await pool.query(`
    select * from store_users
    where email = ?
    limit 1;
    `,[email])
    console.log(row,"row")
    if (row.length > 0){
        throw new ConflictError("Email already in use")
    }
    const hashed = hashPassword(password)
    if (hashed){
        //update to db
        const [row] = await pool.query(`
        insert into store_users (email,password)
        values (?, ?)
        `,[email,hashed])
        if (row){
            res.status(200)
            res.json({success:true,status:200})
        }else {
            throw new InternalServerError('Error registering user to DB')
        }
        
        
    }else {
        throw new InternalServerError("Error hashing password")
    }
    
})

export const logoutController = ash(async(req:any,res:Response)=>{
    console.log("loggin out")
    req.logout(function (err:Error) {
      if (err) {
         res.status(500)
        return res.json({success:false});
      }
      res.status(200)
      return res.json({success:true})
    });
   
  })
export const getOneController = ash(async(req:any,res:Response)=>{
    const id = req.params
    const [row] = await pool.query(`
    select * from store_users
    where id = ?
    limit 1
    `,[id])
    if (row){
        res.status(200)
        res.json({
            success:true,
            row:row
        })
    }else{
        res.status(404)
        res.json({success:false})
    }
})

export const getAllController = ash(async(req:any,res:Response)=>{
    const [row] = await pool.query(`
    select * from store_users
    `)
    if (row){
        res.status(200)
        res.json({
            success:true,
            row:row
        })
    }
})

export const failController = ash(async(req:any,res:Response)=>{
    const message = req.session.messages.at(-1)
    throw new BadRequestError(message)
})