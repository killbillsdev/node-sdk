import { validateTransactionPayload } from "../../src/services/validatorService";

const invalidPayload = {
    bank_id: '1234',
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
	"bank_id": process.env.TEST_BANK_ID,
	"callback_url": process.env.TEST_CALLBACK_URL,
	"partner_name": process.env.TEST_PARTNER_NAME,
	"receipt_format": process.env.TEST_RECEIPT_FORMAT,
	"transaction": {
		"reference_id": process.env.TEST_REFERENCE_ID,
		"customer_id": process.env.TEST_CUSTOMER_ID,
		"amount": 1000,
		"currency": "EUR",
		"transaction_date": Date.now(),
		"merchant_name": process.env.TEST_MERCHANT_NAME,
		"pos_name": process.env.TEST_POS_NAME,
		"billing_descriptor": process.env.TEST_BILLING_DESCRIPTOR,
		"siret": process.env.TEST_SIRET,
		"payment": {
			"bin": 487179,
			"lastFour": "1234",
			"auth_code": "a27s92",
			"scheme": "VISA",
			"transaction_id": process.env.TEST_TRANSACTION_ID
		}
	}
};

describe('sanity check', () => {
    it('should be true', () => {
        expect(true).toBeTruthy();
    })
})

describe('validatePayload', () => {
    it('should validate valid payload without error', () => {
        expect(validateTransactionPayload(testPayload)).toBeTruthy();
    });
    it('should validate invalid payload and return validation error', () => {
        expect(validateTransactionPayload(invalidPayload)).toStrictEqual(new Error('"bank_id" length must be at least 36 characters long'));
    });
    it('should return an error if the payload is empty', () => {
        expect(validateTransactionPayload(null)).toStrictEqual(new Error('No payload to validate'));
    });
});
