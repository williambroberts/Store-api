import express from "express"
import authRouter from "./Routers/authRouter"
import { errorHandler } from "./Middleware/errorMiddleware"
import session from "express-session"
import compression from "compression"
import helmet from "helmet"
import passport from "passport"
import cors from "cors"
import pool from "./db/db"
import cookieParser from "cookie-parser"
const app = express()

const SESSION:any = session



import bodyParser from "body-parser"




import MySQLSessionStore  from "express-mysql-session" 
import suggestRouter from "./Routers/suggestRouter"
import subscribeRouter from "./Routers/EmailSubRouter"
const MySQLStore = MySQLSessionStore(SESSION)
let options = {}
if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PORT && process.env.DB_PASSWORD && process.env.DB_DATABASE){
	options = {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		port:process.env.DB_PORT,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE
	};	
}


const sessionStore = new MySQLStore(options,pool);

app.use(cookieParser());
app.use(SESSION({
    name:"fh485-dadwa",
    saveUninitialized:false,
    resave:false,
    secret:"3824398",
    store:sessionStore,
	cookie:{secure:'auto',sameSite:'none'}
	// cookie:{maxAge:3600000}
		
}))
sessionStore.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('MySQLStore ready');
}).catch(error => {
	// Something went wrong.
	console?.error(error);
});
sessionStore.close().then(() => {
	// Successfuly closed the MySQL session store.
	console.log('MySQLStore closed');
}).catch(error => {
	// Something went wrong.
	console.error(error);
});
app.use(passport.initialize());
app.use(passport.session());
app.use(compression())
app.use(helmet())
app.use(bodyParser.json())
app.use(cors(
	{
		origin:['http://localhost:3000','https://store-five-xi.vercel.app'],
		credentials:true
	}
))
app.use(bodyParser.urlencoded({extended:false}))


app.get("/" ,(req,res)=>{
    res.status(200)
	res.json({success:"true 🕊️"})
})

app.use("/auth",authRouter)
app.use("/suggest",suggestRouter)
app.all("*", (req, res) => {
    res.status(404).json({ message: "This route does not exist" });
});
app.use(errorHandler)

export default app