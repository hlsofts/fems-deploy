import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseSeriveProxy } from '@shared/service-proxies/base-serive-proxy.service';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountFooterComponent } from './layout/account-footer.component';
import { AccountHeaderComponent } from './layout/account-header.component';
import { AccountLanguagesComponent } from './layout/account-languages.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TenantChangeDialogComponent } from './tenant/tenant-change-dialog.component';
// tenants
import { TenantChangeComponent } from './tenant/tenant-change.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SharedModule,
        ServiceProxyModule,
        AccountRoutingModule,
        ModalModule.forChild()
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        RegisterComponent,
        AccountLanguagesComponent,
        AccountHeaderComponent,
        AccountFooterComponent,
        // tenant
        TenantChangeComponent,
        TenantChangeDialogComponent,
    ],
    entryComponents: [
        // tenant
        TenantChangeDialogComponent
    ],
    providers: [
        BaseSeriveProxy
    ]
})
export class AccountModule {

}
