import Ajv from "ajv";
//import { error } from "node:console";
import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";

const ajy= new Ajv({
    allErrors:true
})

// export function validateSchema2(schema, data){
//     const validate= ajy.compile(schema);
//     const valid= validate(data);

//     if (!valid){
//         throw new error(
//             JSON.stringify(validate.error(), null, 2)
//         )
//     }
//     return true;
// }




const ajv = new Ajv2020({
  allErrors: true,
  strict: false
});

// Enables validation for formats like email, uri, date-time, uuid, etc.
addFormats(ajv);

export const validateSchema = (
  schema: object,
  responseBody: unknown
): void => {
  const validate = ajv.compile(schema);

  const valid = validate(responseBody);

  if (!valid) {
    const errors = JSON.stringify(validate.errors, null, 2);

    throw new Error(`Schema Validation Failed:\n${errors}`);
  }
};