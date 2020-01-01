export interface IPO{
    id?:number;
    company:string;
    stockExchange:string;
    price:number;
    totalShares:number;
    openDate:Date;
    remarks:string;
}