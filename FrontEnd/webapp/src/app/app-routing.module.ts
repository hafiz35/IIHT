import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { LoginComponent } from './site/login/login.component';
import { SignUpComponent } from './site/sign-up/sign-up.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { RoleName } from './models/user.model';


const routes: Routes = [
  {
    path: '', redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'edit/password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      role: RoleName.ROLE_USER
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
