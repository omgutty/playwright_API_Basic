import {test,expect,request, APIRequestContext} from '@playwright/test'
import { bookerTokenGeneration } from './booker_token';

const baseURL='https://fakerestapi.azurewebsites.net/';

interface ResponseHeaders  {
        'content-type': string;
        server: string;
        date: string;
        'transfer-encoding': string;
        'api-supported-versions': string;
    }

test(`faker post `, async({request})=>{
    const response= await request.post(`${baseURL}/api/v1/Activities`,{
        headers:{
            'accept':'text/plain; v=1.0',
            'Content-Type':'application/json; v=1.0'
        },
        data:{
            "id":0,
            "title":"string",
            "dueDate":"2026-07-01T08:55:57.398Z",
            "completed":true
        }
    });
    const responsebody= await response.json();
    expect(response.status()).toBe(200);
    const bookingid= responsebody.id;
    expect(responsebody.id).toBeDefined();
    console.log(bookingid);
    expect(bookingid).toEqual(expect.any(Number));
    
    const responseheader= response.headers();
    console.log(responseheader)

    //approch 1
    expect(responseheader['content-type']).toContain('application/json; charset=utf-8; v=1.0');
    expect(responseheader['server']).toBe('Kestrel');

    //not recommended. as header data may differ, such as date 
    // expect(responsebody).toMatchObject({
    //     'content-type': 'application/json; charset=utf-8; v=1.0',
    //     date: 'Wed, 01 Jul 2026 09:45:13 GMT',
    //     server: 'Kestrel',
    //     'transfer-encoding': 'chunked',
    //     'api-supported-versions': '1.0'
    // })

    //approch 2
    expect(responseheader).toEqual(
        expect.objectContaining({
            'content-type': 'application/json; charset=utf-8; v=1.0',
            'transfer-encoding': 'chunked',
            'api-supported-versions': '1.0'
        })
    );
    expect(responseheader['date']).toBeDefined();

    //apprch 3: interface validater 
    

    //const responseheadres :ResponseHeaders=  await response.headers();
     /**
      * But here's the important distinction:
        Interfaces provide:
        Compile-time validation
        They do not perform:
        Runtime validation
            Example:
                interface HeaderSchema {
                server: string;
                }
        This compiles:
                const headers: HeaderSchema = {
                server: undefined as any
                }
        No runtime check occurs.    
        Therefore interfaces are not substitutes for assertions.
      */

        
})