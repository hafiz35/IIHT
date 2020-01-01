import { Company } from './company.model';

export interface Sector{
    id?:number;
    name:string;
    brief:string;
    companies:Array<Company>;
}