import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { ManageCompaniesComponent } from './manage-companies/manage-companies.component';
import { ManageStockExchangesComponent } from './manage-stock-exchanges/manage-stock-exchanges.component';
import { UpdateIpoComponent } from './update-ipo/update-ipo.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddCompanyComponent } from './manage-companies/add-company/add-company.component';
import { AddIpoComponent } from './update-ipo/add-ipo/add-ipo.component';
import { EditIpoComponent } from './update-ipo/edit-ipo/edit-ipo.component';
import { AddStockExchangeComponent } from './manage-stock-exchanges/add-stock-exchange/add-stock-exchange.component';



@NgModule({
  declarations: [
    ManageCompaniesComponent,
    UpdateIpoComponent,
    ManageStockExchangesComponent,
    UpdateIpoComponent,
    AddCompanyComponent,
    AddIpoComponent,
    EditIpoComponent,
    AddStockExchangeComponent],
  imports: [
    CommonModule,
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
