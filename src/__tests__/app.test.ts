import request from "supertest"
import app from "../app"


beforeEach(()=>{
    jest.useFakeTimers()
})


describe('general app / get test',()=>{
    xit('returns a 200 response with json data',async()=>{
        const response = await request(app).get("/")
        expect(response.status).toBe(200)
        //expect(response.body.success).toContain(/true/i)
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))

    })
})