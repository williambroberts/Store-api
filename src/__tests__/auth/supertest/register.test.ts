import app from "../../../app"
import request from "supertest"
import { hashPassword } from "../../../Helpers/passwords"
import pool from "../../../db/db"
jest.mock("../../../Helpers/passwords",()=>({
    hashPassword:jest.fn((x)=>x)
}))

jest.mock("../../../db/db")
beforeEach(()=>{
    jest.clearAllMocks()
})
describe('register controller POST /auth/register',()=>{
    describe('when the user inputs correct username and password',()=>{
        xit('should return with 200',async()=>{
            await pool.query.mockImplementationOnce(()=>[]).mockImplementationOnce(()=>[])
            
            const response  = await request(app).post("/auth/register").send({
                email:"bill@email.com",password:"274759"
            })
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toBe(expect.stringContaining('json'))
        })
    })


    describe('when the user inputs a wrong request',()=>{
        it('should send a 400 Bad request error for no email',async()=>{
            await pool.query.mockImplementationOnce(()=>[]).mockImplementationOnce(()=>[])
            
            const response  = await request(app).post("/auth/register").send({
                password:"274759"
            })
            expect(response.status).toBe(400)
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        })
        it('should send a 400 Bad request for no password',async()=>{
            await pool.query.mockImplementationOnce(()=>[]).mockImplementationOnce(()=>[])
            
            const response  = await request(app).post("/auth/register").send({
                password:"274759"
            })
            expect(response.status).toBe(400)
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        })
    })
})