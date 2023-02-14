import Member from "./member";

export type walletUser = Member & {
    amount: number
};

export type Transaction = {
    amount:number,
    creditor: string,
    debtor: string,
    groupId:number,
    id: number,
    uuid:string
};

export type AggregateTransaction = {
    amount:number,
    creditor: string,
    debtor: string[],
    uuid:string,
    transactionList: Transaction[]|undefined
}

