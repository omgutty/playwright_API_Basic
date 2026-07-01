import { APIRequestContext, request,expect } from "@playwright/test";


const baseURL='https://restful-booker.herokuapp.com';

export async function bookerTokenGeneration(request:APIRequestContext){
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
        //console.log(responsebody);
        const token = responsebody.token;
        expect(token).toBeDefined();
        expect(token).toEqual(expect.any(String));
        console.log(`Token generated`,token);
        return token;
}



