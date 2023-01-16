export type custumUser = {
    id: string
    name:string

    value?:number
};

export type DebitUser = custumUser &
    {
        debit:number
    };


export type CreditUser = custumUser &
    {
        credit:number
    };
