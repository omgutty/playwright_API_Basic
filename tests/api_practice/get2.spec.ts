import {test,request,expect} from '@playwright/test'
import Ajv from 'ajv'
import productSchema from '../schemas/productsSchema.json'

//validate the complete schema of the response body not only the first product 

