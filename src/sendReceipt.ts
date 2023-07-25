import { validateReceiptPayload } from "./services";
import { sendDataWithHmac } from "./services/sendDataWithHmac";


export const sendReceipt = async (env: string, receiptData: object, hmacKey: string) => {
    return await sendDataWithHmac(env, 'receipt', receiptData, hmacKey,validateReceiptPayload);
};
