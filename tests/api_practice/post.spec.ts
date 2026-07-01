import {test,expect,request, APIRequestContext} from '@playwright/test'
import { bookerTokenGeneration } from './booker_token';

const baseURL='https://restful-booker.herokuapp.com';



test('post auth', async ({request}:{request:APIRequestContext})=>{
    const response= await request.post(`${baseURL}/auth`, {
        headers:{
            'Content-Type':'application/json'
        },
        data:{
            'username':'admin',
            'password':'password123'
        }
    });
    const responsebody= await response.json();
        
     
     expect( response.status()).toBe(200);
     await expect(response).toBeOK();
    console.log(responsebody);
    const token = responsebody.token;
    expect(token).toBeDefined();
    expect(token).toEqual(expect.any(String));
    console.log(token);

    
})


test(`Creates a new booking in the API`, async({request})=>{
    const response= await request.post(`${baseURL}/booking`,{
        headers:{
            'Content-Type':'application/json'
        },
        data:{
            'firstname':'Om',
            'lastname':'Gutty',
            "totalprice" : 111,
             "depositpaid" : true,
            "bookingdates" : {
                    "checkin" : "2026-01-01",
                    "checkout" : "2027-01-01"
            },
            "additionalneeds" : "Breakfast"
        }
    });
    const responsebody= await response.json();
    expect(response.status()).toBe(200);
    const bookingid= responsebody.bookingid;
    expect(responsebody.bookingid).toBeDefined();
    console.log(bookingid);
    expect(bookingid).toEqual(expect.any(Number));
   

})

test(`updatebooking`,async ({request})=>{
    const token=bookerTokenGeneration(request);

    const response= await request.put(`${baseURL}/booking/1`,{
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Cookie': `${token}`
        },
        data:{
             "firstname" : "James",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2026-01-01",
                "checkout" : "2027-01-01"
            },
            "additionalneeds" : "Breakfast"
        }
    });

    const responsebody=response.json();
    expect(response.status()).toBe(200);
})