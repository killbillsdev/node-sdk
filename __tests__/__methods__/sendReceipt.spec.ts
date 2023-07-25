import { sendReceipt } from "../../src/sendReceipt";
import dotenv from "dotenv";

dotenv.config();

describe("sendReceipt Test", () => {
  beforeEach(() => {
    console.log("NEW RECEIPT TEST: ");

  });

  const invalidPayload = {
    date: "2023-07-16T09:04:08.823",
    mode: 0,
    items: [
      {
        tax: {
          rate: 1000,
          amount: 85,
          description: "TVA",
        },
        name: "Salade ATCHOUM",
        price: 850,
        quantity: 1,
        sub_items: [
          {
            tax: {
              rate: 1000,
              amount: 30,
              description: "TVA",
            },
            name: "Atchoum V1",
            type: "dish",
            price: 1555,
            quantity: 1,
            description: "",
            reference_id: "5df1e0fa-3bdc-461a-9170-a74bb2f0792b",
            total_amount: 300,
          },
          {
            tax: {
              rate: 1000,
              amount: 40,
              description: "TVA",
            },
            name: "Saucisses v1",
            type: "dish",
            quantity: 1,
            description: "",
            reference_id: "d15e20c6-925c-491a-8381-153c9352aadd",
            total_amount: 400,
          },
          {
            tax: {
              rate: 1000,
              amount: 25,
              description: "TVA",
            },
            name: "Thé v1",
            type: "dish",
            quantity: 1,
            description: "",
            reference_id: "72b2479f-9210-44fc-8187-a4f40bc31ee6",
            total_amount: 250,
          },
        ],
        description: "",
        reference_id: "1c49ad5c-2610-4bd7-bbb5-e235639a0a42",
        total_amount: 850,
      },
    ],
    store: {
      store_name: "RESTAU TEST",
      siret: "6789",
      address: {
        city: "Paris",
        number: 0,
        country: "FRANCE",
        postal_code: 75014,
        street_address: "17 rue du Smart Receipt",
      },
      code_ape: "4410",
      tva_intra: "FR 000 000 00",
      reference_id: "1",
      business_name: "RESTAU TEST",
    },
    table: "31",
    taxes: [
      {
        rate: 1000,
        amount: 85,
        description: "TVA",
      },
      {
        rate: 2000,
        amount: 190,
        description: "TVA",
      },
    ],
    amount: 871741,
    covers: 2,
    invoice: 1,
    currency: "EUR",
    merchant: {
      name: "Restaurant test",
      reference_id: "1234",
    },
    payments: [
      {
        bin: 0,
        amount: 871741,
        scheme: "",
        auth_code: "",
        last_four: 0,
        payment_type: "CB",
        transaction_id: null,
        transaction_date: "2023-07-16T09:04:08.823",
      },
    ],
    partner_name: process.env.TEST_POS_PARTNER_NAME as string,
    reference_id: "1221554511",
  };

  const validPayload = {
    date: "2023-07-16T09:04:08",
    mode: "0",
    items: [
      {
        tax: {
          rate: 1000,
          amount: 85,
          description: "TVA",
        },
        name: "Salade ATCHOUM",
        price: 850,
        quantity: 1,
        subitems: [
          {
            tax: {
              rate: 1000,
              amount: 30,
              description: "TVA",
            },
            name: "Atchoum V1",
            price: 1555,
            quantity: 1,
            description: "",
            reference_id: "5df1e0fa-3bdc-461a-9170-a74bb2f0792b",
            total_amount: 300,
          },
          {
            tax: {
              rate: 1000,
              amount: 40,
              description: "TVA",
            },
            name: "Saucisses v1",
            quantity: 1,
            description: "",
            reference_id: "d15e20c6-925c-491a-8381-153c9352aadd",
            total_amount: 400,
          },
          {
            tax: {
              rate: 1000,
              amount: 25,
              description: "TVA",
            },
            name: "Thé v1",
            quantity: 1,
            description: "",
            reference_id: "72b2479f-9210-44fc-8187-a4f40bc31ee6",
            total_amount: 250,
          },
        ],
        description: "",
        reference_id: "1c49ad5c-2610-4bd7-bbb5-e235639a0a42",
        total_amount: 850,
      },
    ],
    store: {
      store_name: "RESTAU TEST",
      siret: "66666666666666",
      billing_descriptor: "RESTAU TEST",
      address: {
        city: "Paris",
        number: 0,
        country: "FRANCE",
        postal_code: 75014,
        street_address: "17 rue du Smart Receipt",
      },
      code_ape: "4410",
      tva_intra: "FR 000 000 00",
      reference_id: "1",
    },
    table: "31",
    taxes: [
      {
        rate: 1000,
        amount: 85,
        description: "TVA",
      },
      {
        rate: 2000,
        amount: 190,
        description: "TVA",
      },
    ],
    amount: 871741,
    covers: 2,
    invoice: 1,
    currency: "EUR",
    merchant: {
      merchant_name: "Restaurant test",
      reference_id: "1234",
    },
    payments: [
      {
        bin: "0",
        amount: 871741,
        scheme: "",
        auth_code: "",
        last_four: "0",
        payment_type: "CB",
        transaction_id: "null",
        transaction_date: "2023-07-16T09:04:08",
      },
    ],
    partner_name: process.env.TEST_POS_PARTNER_NAME as string,
    reference_id: "1221554511",
  };
  const validPayload2 = {
    date: "2023-07-16T09:04:08",
    mode: "test",
    items: [
      {
        tax: {
          rate: 1000,
          amount: 85,
          description: "TVA",
        },
        name: "Salade ATCHOUM",
        price: 850,
        quantity: 1,
        subitems: [
          {
            tax: {
              rate: 1000,
              amount: 30,
              description: "TVA",
            },
            name: "Atchoum V1",
            price: 1555,
            quantity: 1,
            description: "",
            reference_id: "5df1e0fa-3bdc-461a-9170-a74bb2f0792b",
            total_amount: 300,
          },
          {
            tax: {
              rate: 1000,
              amount: 40,
              description: "TVA",
            },
            name: "Saucisses v1",
            quantity: 1,
            description: "",
            reference_id: "d15e20c6-925c-491a-8381-153c9352aadd",
            total_amount: 400,
          },
          {
            tax: {
              rate: 1000,
              amount: 25,
              description: "TVA",
            },
            name: "Thé v1",
            quantity: 1,
            description: "",
            reference_id: "72b2479f-9210-44fc-8187-a4f40bc31ee6",
            total_amount: 250,
          },
        ],
        description: "",
        reference_id: "1c49ad5c-2610-4bd7-bbb5-e235639a0a42",
        total_amount: 850,
      },
    ],
    store: {
      store_name: "RESTAU TEST",
      siret: "66666666666666",
      billing_descriptor: "RESTAU TEST",
      address: {
        city: "Paris",
        number: 0,
        country: "FRANCE",
        postal_code: 75014,
        street_address: "17 rue du Smart Receipt",
      },
      code_ape: "4410",
      tva_intra: "FR 000 000 00",
      reference_id: "1",
    },
    table: "31",
    taxes: [
      {
        rate: 1000,
        amount: 85,
        description: "TVA",
      },
      {
        rate: 2000,
        amount: 190,
        description: "TVA",
      },
    ],
    amount: 871741,
    covers: 2,
    invoice: 1,
    currency: "EUR",
    merchant: {
      merchant_name: "Restaurant test",
      reference_id: "1234",
    },
    payments: [
      {
        bin: "0",
        amount: 871741,
        scheme: "",
        auth_code: "",
        last_four: "0",
        payment_type: "CB",
        transaction_id: "null",
        transaction_date: "2023-07-16T09:04:08",
      },
    ],
    partner_name: process.env.TEST_POS_PARTNER_NAME as string,
    reference_id: "1221554511",
  };

  it("should throw an error - the payload is empty", async () => {
    expect(await sendReceipt("dev", {}, "hmac")).toStrictEqual(
      'Error: \"reference_id\" is required'
    );
  });

  it("should throw an error if the payload has invalid date format", async () => {
    expect(await sendReceipt("dev", invalidPayload, "hmac")).toStrictEqual(
      'Error: "date" with value "2023-07-16T09:04:08.823" fails to match the required pattern: /^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}$/'
    );
  });

  it("validation should pass but post fails because of wrong hmac ", async () => {
    expect(await sendReceipt("dev", validPayload, "hmac")).toStrictEqual(
      "Request failed with status code 401"
    );
  });

  it("validation and post should pass", async () => {
    const res = await sendReceipt(
      "dev",
      validPayload2,
      process.env.TEST_POS_HMAC as string
    );
    const status = res?.status;
    expect(status).toStrictEqual(200);
  });
});
