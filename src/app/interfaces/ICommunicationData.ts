export interface ICommunicationData {
    command: string;
    data: any;
}

export interface ICommSet {
    service: string;
    keyPair: Array<KeyValuePair>;
}

interface KeyValuePair {
    key: string;
    value: string;
}
