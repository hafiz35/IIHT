import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { ViewIPOsComponent } from './view-IPOs/view-ipos.component';
import { CompareSectorsComponent } from './compare-sectors/compare-sectors.component';
import { CompareCompaniesComponent } from './compare-companies/compare-companies.component';
import { ChartsComponent } from './charts/charts.component';
import * as FusionCharts from 'fusioncharts';
import { FusionChartsModule } from 'angular-fusioncharts';
import { ViewCompaniesComponent } from './view-companies/view-companies.component';
import { ViewCompanyDetailsComponent } from './view-company-details/view-company-details.component';



@NgModule({
  declarations: [
    ViewIPOsComponent,
    CompareSectorsComponent,
    CompareCompaniesComponent,
    ChartsComponent,
    ViewCompaniesComponent,
    ViewCompanyDetailsComponent],
  imports: [
    CommonModule,
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserRoutingModule,
    FusionChartsModule
  ],
  entryComponents: [ChartsComponent]
})
export class UserDashboardModule { }
