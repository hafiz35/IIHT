import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import * as ExcelExport from 'fusioncharts/fusioncharts.excelexport';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { ImportDataComponent } from './admin/import-data/import-data.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { AuthService } from './services/auth.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { UserService } from './services/user.service';
import { HeaderComponent } from './site/header/header.component';
import { LoginComponent } from './site/login/login.component';
import { SignUpComponent } from './site/sign-up/sign-up.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { UserRoutingModule } from './user-dashboard/user-routing.module';
import {FileSaverModule} from 'ngx-filesaver';
FusionChartsModule.fcRoot(FusionCharts, ExcelExport, Charts, TimeSeries);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    AdminComponent,
    ImportDataComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FusionChartsModule,
    AdminModule,
    AdminRoutingModule,
    UserRoutingModule,
    UserDashboardModule,
    FileSaverModule
  ],

  providers: [UserService, AuthService, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
