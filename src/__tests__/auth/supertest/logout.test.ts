import app from "../../../app"
import request from "supertest"

const requestBody:any = {}
requestBody.isAuthenticated=true
describe('logout controller test /auth/logout POST',()=>{
    describe('when called due to auth middleware',()=>{
        xit('should call req.logout and send a 401 response with json',async()=>{
            const response = await request(app).post("/auth/logout").send(requestBody)
            expect(response.status).toEqual(401)
        })
    })
})