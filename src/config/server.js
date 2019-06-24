export const SERVER_URL = 'https://payments.dpc.hu/in01/channel/transactions';
// export const API_URL = 'http://localhost:4000';
export const API_URL = 'https://acefintech.mlabs.dpc.hu';

export const getServerUrl = (bank) => `https://${bank}.mlabs.dpc.hu/api/transactions`;

export const getTenantId = (bank) => {
    switch (bank) {
        case 'buffalo':
            return 'tn01';
        case 'lion':
            return 'tn02';
        case 'rhino':
            return 'tn03';
        case 'elephant':
            return 'tn04';
        default:
            return 'tn01';
    }
};

export const MAX_POLL_RETRY = 200;
export const POLL_INTERVAL = 3000;
