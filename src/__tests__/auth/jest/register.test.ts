
import { registerController } from "../../../Controllers/authController"
import { hashPassword } from "../../../Helpers/passwords"
import pool from "../../../db/db"

jest.mock("../../../db/db")

jest.mock("../../../Helpers/passwords",()=>({
    hashPassword:jest.fn(()=>"274759")
}))

beforeEach(()=>{
    jest.clearAllMocks()
})
const gooduser = {
    email:"bill@email.com",
    password:"274759"
}
const request:any = {
    body: gooduser
  };
  
const response:any = {
    status:jest.fn((x)=>x),
    json:jest.fn((x)=>x)
}
const badRequest:any ={
    body:{email:"bill@email.com"}
}
const next = jest.fn((x)=>x)
describe('register route /auth/register POST',()=>{
    describe('user inputs correct email and password',()=>{
        xit('should return a 200 status',async()=>{
            pool.query.mockImplementationOnce(()=>([])).mockImplementationOnce(()=>{})

            await registerController(request,response,next)
            expect(response.status).toHaveBeenCalledWith(200)

        })
    })
    describe('user inputs incorrect data',()=>{
        xit('should return 400 for missing email and or password',async()=>{
            pool.query.mockImplementationOnce(()=>([])).mockImplementationOnce(()=>{})

            await registerController(request,response,next)
            console.log(response)
            expect(response.status).not.toHaveBeenCalled()
        })
    })
    
})