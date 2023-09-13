import express from "express"
import { subsribeVS, valitatorVS } from "../utils/Validators"
import { subscribeController } from "../Controllers/EmailSubscriptionController"
const subscribeRouter = express.Router()



// post public 
subscribeRouter.post("/",subsribeVS,valitatorVS,subscribeController)



export default subscribeRouter