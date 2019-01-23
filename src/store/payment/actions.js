export const SEND_PAYMENT_REQUEST = 'SEND_PAYMENT_REQUEST';

export const sendPaymentRequest = (amount, description) => ({
   type: SEND_PAYMENT_REQUEST, payload: {amount: amount, description: description}
});