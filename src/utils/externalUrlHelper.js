import UUID from "uuid/v1.js";

export const openBankAuthUrl = (bank, consentId) => {
    const authUrl = `${
        bank.authorizeUrl
        }?response_type=code&scope=openid profile accounts&client_id=${
        bank.clientId
        }&redirect_uri=${bank.callbackUrl}&nonce=${UUID()}&consentId=${consentId}&state=${bank.bankId}&consentType=accounts`;
    console.log(encodeURI(authUrl));
    window.location.assign(encodeURI(authUrl));
};

export const openBankPaymentAuthUrl = (bank, consentId) => {
    if (bank) {
        const authUrl = `${bank.authorizeUrl}?response_type=code&scope=openid profile payments&client_id=${bank.clientId}&redirect_uri=${bank.callbackUrl}&state=${
            btoa(`{"bankid": "${bank.bankId}", "consentId":  "${consentId}"}`)
            }&consentId=${consentId}&consentType=payments`;
        console.log(encodeURI(authUrl));
        window.location.assign(encodeURI(authUrl));
    } else alert('Bank is missing')
};
