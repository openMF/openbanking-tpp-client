export class TransactionMerchant {
    constructor(partyIdInfo, name, merchantCode = '0000') {
        if(typeof partyIdInfo === 'object') {
            this.id = partyIdInfo.partyIdentifier;
            this.idType = partyIdInfo.partyIdType;
        } else {
            const decodedPartyIdInfo = partyIdInfo.split('::');
            this.id = decodedPartyIdInfo[1];
            this.idType = decodedPartyIdInfo[0];
            console.log(`decode partyID`, partyIdInfo, decodedPartyIdInfo);
        }
        this.name = name;
        this.code = merchantCode;
    }
}
