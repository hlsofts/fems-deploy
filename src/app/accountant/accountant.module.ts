import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountantRoutingModule } from '@app/accountant/accountant-routing.module';
import { BaseTableViewModule } from '@app/base/controls/base-table-view/base-table-view.module';
import { BaseTableEditModule } from '@app/base/controls/base-table-edit/base-table-edit.module';
import { TrackingLogModule } from '@app/base/controls/tracking-log/tracking-log.module';
import { ValidationMessagesModule } from '@app/base/controls/validation-messages/validation-messages.module';
import { FormatNumberModule } from '@app/base/pipes/format-number/format-number.module';
import { BankComboboxModule } from '@app/shared/controls/comboboxs/bank-combobox/bank-combobox.module';
import { CodeDetailTypeComboboxModule } from '@app/shared/controls/comboboxs/code-detail-type-combobox/code-detail-type-combobox.module';
import { CodeDetailComboboxModule } from '@app/shared/controls/comboboxs/code-detail-combobox/code-detail-combobox.module';
import { BankAccountComboboxModule } from '@app/shared/controls/comboboxs/bank-account-combobox/bank-account-combobox.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { AntDesignModule } from '../../shared/modules/ant-design/ant-design.module';
import { InvoiceFormComponent } from './invoice/components/invoice-form/invoice-form.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceDetailComponent } from './invoice/components/invoice-detail/invoice-detail.component';

const maskConfig: Partial<IConfig> = {
    validation: false,
};

@NgModule({
    declarations: [
        InvoiceComponent,
        InvoiceFormComponent,
        InvoiceDetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AccountantRoutingModule,
        AntDesignModule,
        BaseTableViewModule,
        ValidationMessagesModule,
        TrackingLogModule,
        NgxMaskModule.forRoot(maskConfig),
        BankComboboxModule,
        CodeDetailTypeComboboxModule,
        CodeDetailComboboxModule,
        FormatNumberModule,
        BaseTableEditModule,
        BankAccountComboboxModule
    ]
})
export class AccountantModule { }
