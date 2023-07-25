import Joi from 'joi';
//used in date validation: date().format('YYYY-MM-DDTHH:mm:ssZ')
// import joiDate from "@joi/date";

const transactionPayloadSchema = Joi.object({
    bank_id: Joi.string().min(36).max(36).required(),
    callback_url: Joi.string().required(),
    receipt_format: Joi.string().valid('JSON','PDF','SVG','PNG').insensitive().required(),
    transaction: Joi.object({
        reference_id: Joi.string().required(),
        amount: Joi.number().positive().required(),
        customer_id: Joi.string().required(),
        transaction_date: Joi.date().required(),
        store_name: Joi.string().required(),
        billing_descriptor: Joi.string().required(),
        siret: Joi.string().pattern(/^[0-9]+$/, 'numbers'),
        payment: Joi.object({
            bin: Joi.string().allow(''),
            last_four: Joi.string().allow(''),
            auth_code: Joi.string().allow(''),
            scheme: Joi.string().allow(''),
            transaction_id: Joi.string().allow(''),
        }),
        currency: Joi.string().valid('EUR','USD'),
        merchant_name: Joi.string()
    })
});

const ReceiptPayloadSchema = Joi.object({
    reference_id: Joi.string().required(),
    amount: Joi.number().required(),
    total_tax_amount: Joi.number(),
    currency: Joi.string().valid('EUR','USD').required(),
    date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/).required(),
    covers: Joi.number(),
    table: Joi.string(),
    invoice: Joi.number(),
    total_discount: Joi.number(),
    mode: Joi.string(),
    partner_name: Joi.string().required(),
    merchant: Joi.object({
        merchant_name: Joi.string(),
        reference_id: Joi.string().required(),
        merchant_id: Joi.number()
    }).required(),
    store: Joi.object({
        store_name: Joi.string().required(),
        reference_id: Joi.string().required(),
        billing_descriptor: Joi.string().required(),
        siret : Joi.string().min(14).max(14).required(),
        code_ape: Joi.string(),
        tva_intra: Joi.string(),
        address: Joi.object({
            postal_code: Joi.number().required(),
            street_address: Joi.string(),
            country: Joi.string(),
            city: Joi.string(),
            full_address: Joi.string(),
            number: Joi.number(),
        })        
    }).required(),
    taxes: Joi.array().items(Joi.object({
        description: Joi.string(),
        amount: Joi.number().required(),
        rate: Joi.number().valid(550,1000,2000).required()
    })),
    items: Joi.array().items(Joi.object({
        reference_id: Joi.string(),
        name: Joi.string().required(),
        description: Joi.string().allow(''),
        type: Joi.string(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
        discount: Joi.number(),
        total_amount: Joi.number(),
        tax:Joi.object({
            description: Joi.string().allow(''),
            amount: Joi.number().required(),
            rate: Joi.number().valid(550,1000,2000).required()
        }),
        subitems: Joi.array().items(Joi.object({
            reference_id: Joi.string(),
            name: Joi.string().required(),
            description: Joi.string().allow(''),
            quantity: Joi.number(),
            price: Joi.number(),
            discount: Joi.number(),
            total_amount: Joi.number(),
            tax:Joi.object({
                description: Joi.string().allow(''),
                amount: Joi.number().required(),
                rate: Joi.number().valid(550,1000,2000).required()
            })
        }))
    })).required(),
    payments: Joi.array().items(Joi.object({
        bin: Joi.string().allow(''),
        last_four: Joi.string().allow(''),
        auth_code: Joi.string().allow(''),
        scheme: Joi.string().allow(''),
        amount: Joi.number().required(),
        transaction_date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/).required(),
        transaction_id: Joi.string().allow(''),
        payment_type: Joi.string().allow('')

    })).required()
});

export const validateTransactionPayload = (payload:any) => {
    try {
        if (!payload) throw new Error('No payload to validate');
        const {error} = transactionPayloadSchema.validate(payload);
        if (error === undefined) return true;
        return new Error(error?.details[0]?.message);
    } catch (error) {
        return error;
    }
};

export const validateReceiptPayload = (payload:any) => {
    try {
        if (!payload) throw new Error('No payload to validate');
        const {error} = ReceiptPayloadSchema.validate(payload);
        if (error === undefined) return true;
        return new Error(error?.details[0]?.message);
    } catch (error) {
        return error;
    }
};