import UUID from "uuid/v1.js";

export const openBankAuthUrl = (bank, consentId) => {
  const authUrl = `${
    bank.authorizeUrl
  }?response_type=code&scope=openid profile accounts&client_id=${
    bank.clientId
  }&redirect_uri=${bank.callbackUrl}&nonce=${UUID()}&consentId=${consentId}`;
  console.log(encodeURI(authUrl));
  window.location.assign(encodeURI(authUrl));
};
