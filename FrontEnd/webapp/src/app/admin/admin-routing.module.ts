import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleName } from '../models/user.model';
import { AuthGuard } from '../services/auth.guard';
import { AdminComponent } from './admin.component';
import { ImportDataComponent } from './import-data/import-data.component';
import { AddCompanyComponent } from './manage-companies/add-company/add-company.component';
import { ManageCompaniesComponent } from './manage-companies/manage-companies.component';
import { AddStockExchangeComponent } from './manage-stock-exchanges/add-stock-exchange/add-stock-exchange.component';
import { ManageStockExchangesComponent } from './manage-stock-exchanges/manage-stock-exchanges.component';
import { AddIpoComponent } from './update-ipo/add-ipo/add-ipo.component';
import { UpdateIpoComponent } from './update-ipo/update-ipo.component';
import { EditIpoComponent } from './update-ipo/edit-ipo/edit-ipo.component';







const routes: Routes = [{
    path: 'admin-dashboard',
    component: AdminComponent,
    children: [
        {
            path: '',
            redirectTo: 'import-data',
            pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_ADMIN
            }
        },
        {
            path: 'import-data',
            component: ImportDataComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_ADMIN
            }
        },
        {
            path: 'manage-companies',
            component: ManageCompaniesComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_ADMIN
            }
        },
        {
            path: 'manage-stock-exchanges', component: ManageStockExchangesComponent, pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_ADMIN
            }
        },
        {
            path: 'manage-stock-exchanges/add', component: AddStockExchangeComponent, pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_ADMIN
            }
        },
        {
            path: 'update-ipo', component: UpdateIpoComponent, pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_ADMIN
            }
        },
        {
            path: 'update-ipo/add',
            component: AddIpoComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_ADMIN
            }
        },
        {
            path: 'update-ipo/:id/edit',
            component: EditIpoComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_ADMIN
            }
        },
        {
            path: 'manage-companies/add', component: AddCompanyComponent,
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_ADMIN
            }
        },
    ]
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
