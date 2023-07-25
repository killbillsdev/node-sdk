import { sendBankingTransaction } from '../../src/sendBankingTransaction';
import dotenv from 'dotenv';

dotenv.config();

describe('sendBankingTransaction Test', () => {
    beforeEach(() => {
        console.log('NEW TEST: ');
    });


    const invalidPayload = {
        bank_id: '123456789',
        callback_url: 'data:text/plain',
        receipt_format: 'INVALID_FORMAT',
        transaction: {
            reference_id: '12345678',
            amount: -10.50,
            customer_id: 'INVALID_GUID',
            transaction_date: 'INVALID_DATE',
            store_name: '',
            billing_descriptor: ''
        }
    };
    const testPayload = {
        bank_id: process.env.TEST_BANK_ID!,
        "callback_url": process.env.TEST_CALLBACK_URL,
        "receipt_format": process.env.TEST_RECEIPT_FORMAT,
        "transaction": {
            "store_name": "testStoreName",
            "reference_id": process.env.TEST_REFERENCE_ID,
            "customer_id": process.env.TEST_CUSTOMER_ID,
            "amount": 1000,
            "currency": "EUR",
            "transaction_date": Date.now(),
            "merchant_name": process.env.TEST_MERCHANT_NAME,
            "billing_descriptor": process.env.TEST_BILLING_DESCRIPTOR,
            "siret": process.env.TEST_SIRET,
            "payment": {
                "bin": "487179",
                "last_four": "1234",
                "auth_code": "a27s92",
                "scheme": "VISA",
                "transaction_id": process.env.TEST_TRANSACTION_ID
            }
        }
    };


    it('should send the banking transaction if the payload is valid',async () => {
        expect(await sendBankingTransaction('dev',testPayload,process.env.TEST_HMAC!)).toHaveProperty('status',200);
    });
    it('should throw an error if the payload is invalid',async () => {
        expect(await sendBankingTransaction('dev',invalidPayload,'hmac')).toStrictEqual('Error: \"bank_id\" length must be at least 36 characters long');
    });
    it('should throw an error if there is no hmac', async () => {
        expect(await sendBankingTransaction('dev',testPayload,'')).toEqual("You have not provided Data or Hmac Signature : \n Data: [object Object], \n hmacSignature: ");

    });
});