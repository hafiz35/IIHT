import { CompanyStockExchange } from './company-stock-exchange.model';

export interface StockExchange {
    id?: number;
    name: string;
    brief: string;
    contactAddress: string;
    remarks: string;
    companyList?: Array<CompanyStockExchange>;
}