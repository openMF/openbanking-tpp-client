export const SERVER_URL = 'http://paymenthub.mifos.io/channel/transactions';
export const API_URL = 'http://api.lion.mifos.io/api';

export const getServerUrl = (bank) => {
    switch(bank) {
        case 'dfsp1payer':
            return `https://paymenthub.mifos.io/channel/transactions`;
        case 'dfsp1payee':
            return `https://paymenthub.mifos.io/channel/transactions`;
        case 'dfsp2payer':
            return `https://paymenthubcn.mifos.io/channel/transactions`;
        case 'dfsp2payee':
            return `https://paymenthubcn.mifos.io/channel/transactions`;
        default:
            return `https://paymenthub.mifos.io/channel/transactions`;
    }
}

export const getTenantId = (bank) => {
    switch (bank) {
        case 'dfsp1payer':
            return 'tn01';
        case 'dfsp1payee':
            return 'tn02';
        case 'dfsp2payer':
            return 'tn03';
        case 'dfsp2payee':
            return 'tn04';
        default:
            return 'tn01';
    }
};

export const MAX_POLL_RETRY = 200;
export const POLL_INTERVAL = 3000;
