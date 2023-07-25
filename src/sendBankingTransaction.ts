import { validateTransactionPayload } from "./services";
import { sendDataWithHmac } from "./services/sendDataWithHmac";

export const sendBankingTransaction = async (env: string, transactionData: object, hmacKey: string) => {
    return await sendDataWithHmac(env, 'transaction', transactionData, hmacKey,validateTransactionPayload);
};
