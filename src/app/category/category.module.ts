import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseTableViewModule } from '@app/base/controls/base-table-view/base-table-view.module';
import { ValidationMessagesModule } from '@app/base/controls/validation-messages/validation-messages.module';
import { TrackingLogModule } from '@app/base/controls/tracking-log/tracking-log.module';
import { AntDesignModule } from '../../shared/modules/ant-design/ant-design.module';
import { BaseSeriveProxy } from '../../shared/service-proxies/base-serive-proxy.service';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { BankFormComponent } from './bank/bank-form/bank-form.component';
import { BankComponent } from './bank/bank.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CodeDetailComponent } from './code-detail/code-detail.component';
import { CodeComponent } from './code/code.component';
import { FamilyComponent } from './family/family.component';
import { HouseComponent } from './house/house.component';
import { BankAccountFormComponent } from './bank-account/bank-account-form/bank-account-form.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { BankComboboxModule } from '../shared/controls/comboboxs/bank-combobox/bank-combobox.module';
import { CodeDetailTypeComboboxModule } from '../shared/controls/comboboxs/code-detail-type-combobox/code-detail-type-combobox.module';
import { CodeDetailFormComponent } from './code-detail/code-detail-form/code-detail-form.component';

const maskConfig: Partial<IConfig> = {
    validation: false,
};

@NgModule({
    declarations: [
        BankComponent,
        BankAccountComponent,
        CodeComponent,
        CodeDetailComponent,
        FamilyComponent,
        HouseComponent,
        BankFormComponent,
        BankAccountFormComponent,
        CodeDetailFormComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CategoryRoutingModule,
        AntDesignModule,
        BaseTableViewModule,
        ValidationMessagesModule,
        TrackingLogModule,
        NgxMaskModule.forRoot(maskConfig),
        BankComboboxModule,
        CodeDetailTypeComboboxModule
    ],
    providers: [
        BaseSeriveProxy
    ]
})
export class CategoryModule { }
