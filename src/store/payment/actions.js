export const SEND_PAYMENT_REQUEST = 'SEND_PAYMENT_REQUEST';
export const APPROVE_PAYMENT_REQUEST = 'APPROVE_PAYMENT_REQUEST';

export const sendPaymentRequest = (amount, description) => ({
   type: SEND_PAYMENT_REQUEST, payload: {amount: amount, description: description}
});

export const approvePaymentRequest = () => ({
    type: APPROVE_PAYMENT_REQUEST
});