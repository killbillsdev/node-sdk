import axios from 'axios';
import { cipherHmacPayload } from "./cryptoService";

export const  sendDataWithHmac = async (env: string, endpoint: string ,data: object, hmacSignature: string, validator: (data: object) => any) => { 
    try {     
        if (!data || !hmacSignature || hmacSignature === '') {
            throw new Error(`You have not provided Data or Hmac Signature : \n Data: ${data}, \n hmacSignature: ${hmacSignature}`);
        }
        const payloadValidationResult = validator(data);

        if (payloadValidationResult !== true) {
            throw new Error(`${payloadValidationResult}`);
        }

        const hashedPayload = cipherHmacPayload(JSON.stringify(data), hmacSignature);
        const headers = {
            'Authorization': `hmac ${hashedPayload}`,
            'Content-Type': 'application/json'
        }
        return await axios.post(`https://in.${env !== 'prod' ? env + '.' : '.' }killbills.${env !== 'prod' ? 'dev' : 'co'}/${endpoint}`, JSON.stringify(data), { headers })
    } 
    catch (error: Error | any) {
        return error?.message;
    }
};