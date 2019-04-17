export const SERVER_URL = 'https://payments.dpc.hu/in01/channel/transactions';

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
    }
};
