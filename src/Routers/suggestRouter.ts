import express from "express"
import { suggestProductController } from "../Controllers/suggestController"
import { suggestProductVS, valitatorVS } from "../utils/Validators"

const suggestRouter = express.Router()

suggestRouter.post("/",suggestProductVS,valitatorVS,suggestProductController)


export default suggestRouter