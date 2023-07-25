import crypto from 'crypto';

export const cipherHmacPayload = (payload:string,hmac:string) => {
    return crypto.createHmac('sha256', hmac).update(payload).digest('hex');
}