
import express from "express"
import { enableAuthenticate } from "../Middleware/authMiddleware"
import { failController, isAuthController, loginController, logoutController, registerController } from "../Controllers/authController"
import { loginVS, registerVS, subsribeVS, valitatorVS } from "../utils/Validators"
import passport from "passport"

const authRouter = express.Router()


import pool from "../db/db";
import { comparePassword } from "../Helpers/passwords"

import x from "passport-local"
import { subscribeController } from "../Controllers/EmailSubscriptionController"
//passport 
const LocalStrategy = x.Strategy
passport.serializeUser(function(user:any, done) {
  console.log("serializing user",user)
  done(null, user.email);
  
});

passport.deserializeUser(async function(id, done) {
  console.log(id,"desierialze")
  try {
    const [user] = await pool.query(`
    select * from store_users
    WHERE email = ?
    `,[id]);
    console.log(user,id,"deserializing user")
    done(null, user);
  } catch(err) {
    done(err);
  };
});

passport.use( 
  new LocalStrategy({usernameField: 'email'},localVerifyFunctionasync)
  );


async function localVerifyFunctionasync(email:string, password:string, done:any) {
  console.log(email,password,"❤️")
  //sanitize and validate first
  try {
      const [row]:any = await pool.query(
        `select * 
        from store_users
        WHERE email = ? 
        `
        ,[email])
        const user = row[0]
      //console.log(user)
      if (!user) {
      return done(null, false, { message: "Incorrect email" });
      };
      const passwords ={raw:password,hash:user.password}
     const match =  comparePassword(passwords)
    
      if (password && !match ){
      return done(null, false, { message: "Incorrect password" });
      };
      return done(null, user);
  } catch(err) {
      return done(err);
  };
  }




authRouter.get("/fail",failController)
authRouter.post("/register",registerVS,valitatorVS,registerController)
authRouter.post("/logout",enableAuthenticate,logoutController)
authRouter.get("/status",isAuthController)
authRouter.post("/login",loginVS,valitatorVS,
passport.authenticate('local', 
{ failureRedirect: '/auth/fail',
 failureMessage: true }),
 loginController)



 authRouter.post("/subscribe",subsribeVS,valitatorVS,subscribeController)

export default authRouter 