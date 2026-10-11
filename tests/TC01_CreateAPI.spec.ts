import{test,expect} from '@playwright/test'

test('create post request using static body',async({request})=>{

     const requestBody ={
    "firstname": "Jim",
    "lastname": "Brown",
    "totalprice": 1000,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2025-07-01",
        "checkout": "2025-07-05"
    },
    "additionalneeds": "super bowls"
}

const response = await request.post("/booking",{data:requestBody})

const responseBody = await response.json()

console.log(responseBody)

expect(response.ok()).toBeTruthy()
expect(response.status()).toBe(200)
const booking = responseBody.booking;
console.log("Revathy code---->",responseBody)
console.log("AK Changes---->",responseBody)
expect(booking).toMatchObject({
    "firstname": "Jim",
    "lastname": "Brown",
    "totalprice": 1000,
    "depositpaid": true,
    "additionalneeds": "super bowls"
})

expect(booking.bookingdates).toMatchObject({
     "checkin": "2025-07-01",
        "checkout": "2025-07-05"
})


})
