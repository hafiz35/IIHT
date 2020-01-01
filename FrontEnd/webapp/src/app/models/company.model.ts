import { Sector } from './sector.model';
import { CompanyStockExchange } from './company-stock-exchange.model';

export interface Company {
    id?: number;
    name: string;
    turnover: number;
    ceo: string;
    boardOfDirectors: string;
    brief: string;
    sector?: Sector;
    sectorId?: number;
    active: boolean;
    stockCodes: Array<CompanyStockExchange>;
}
