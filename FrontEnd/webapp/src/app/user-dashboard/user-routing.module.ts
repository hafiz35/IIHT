import { UserDashboardComponent } from './user-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewIPOsComponent } from './view-IPOs/view-ipos.component';
import { CompareCompaniesComponent } from './compare-companies/compare-companies.component';
import { CompareSectorsComponent } from './compare-sectors/compare-sectors.component';
import { ViewCompaniesComponent } from './view-companies/view-companies.component';
import { ViewCompanyDetailsComponent } from './view-company-details/view-company-details.component';
import { AuthGuard } from '../services/auth.guard';
import { RoleName } from '../models/user.model';

const routes: Routes = [{
    path: 'user-dashboard',
    component: UserDashboardComponent,
    children: [
        {
            path: '',
            redirectTo: 'view-companies',
            pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_USER
            }
        },
        {
            path: 'view-ipos',
            component: ViewIPOsComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_USER
            }
        },
        {
            path: 'compare-companies',
            component: CompareCompaniesComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_USER
            }
        },
        {
            path: 'compare-sectors',
            component: CompareSectorsComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_USER
            }
        },
        {
            path: 'view-companies',
            component: ViewCompaniesComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_USER
            }
        },
        {
            path: 'view-companies/:id/view',
            component: ViewCompanyDetailsComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {
                role: RoleName.ROLE_USER
            }
        }
    ]
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule { }