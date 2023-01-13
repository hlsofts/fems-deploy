import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            { path: 'home', component: HomeComponent, canActivate: [AppRouteGuard] },
            { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
            { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
            { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
            { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
            { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
            {
                path: 'category',
                loadChildren: () => import('app/category/category.module').then(m => m.CategoryModule),
            },
            {
                path: 'accountant',
                loadChildren: () => import('app/accountant/accountant.module').then(m => m.AccountantModule),
            }
        ]
    },
];


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
