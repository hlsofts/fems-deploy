import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormComponent } from '@app/base/crud/base-form-component';
import { ISelectOption } from '@app/base/models/combobox/select-option';
import { ModuleTypeConfig } from '@app/shared/configs/module-type-config';
import { InvoiceDetailDto } from '@app/shared/models/dtos/invoice-detail-dto';
import { InvoiceDto } from '@app/shared/models/dtos/invoice-dto';
import * as _ from 'lodash';
import { InvoiceDetailComponent } from '../invoice-detail/invoice-detail.component';

@Component({
    selector: 'app-invoice-form',
    templateUrl: './invoice-form.component.html',
    styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent extends BaseFormComponent<InvoiceDto> implements OnInit {
    @ViewChild('invoiceDetailComponent', { static: false }) invoiceDetailComponent: InvoiceDetailComponent;

    public model: InvoiceDto = new InvoiceDto();

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.moduleType = ModuleTypeConfig.Accountant.Invoice;
        this.buildForm();
        if (this.model && this.model.id > 0) {
            this.getById();
        } else {
            this.model = new InvoiceDto();
            this.model.invoiceDate = new Date();
            this.formGroup.patchValue(this.model);
        }
    }

    private buildForm() {
        this.formGroup = this.formBuilder.group({
            id: [this.model.id, []],
            code: [this.model.code, []],
            name: [this.model.name, []],
            invoiceDate: [this.model.invoiceDate, [Validators.required]],
            codeDetailId: [this.model.codeDetailId, [Validators.required]],
            codeDetailName: [this.model.codeDetailName, [Validators.required]],
            sourceBankAccountId: [this.model.sourceBankAccountId, [Validators.required]],
            sourceBankAccountName: [this.model.sourceBankAccountName, [Validators.required]],
            destinationBankAccountId: [this.model.destinationBankAccountId, []],
            destinationBankAccountName: [this.model.destinationBankAccountName, []],
            totalAmount: [this.model.totalAmount, [Validators.required]],
            note: [this.model.note, []],
            listInvoiceDetailDto: [this.model.listInvoiceDetailDto, []]
        });
    }

    codeDetailItemSelected(item: ISelectOption) {
        this.model.codeDetailId = item.value;
        this.model.codeDetailName = item.displayText;
        this.formGroup.patchValue(this.model);
    }

    sourceBankAccountItemSelected(item: ISelectOption) {
        this.model.sourceBankAccountId = item.value;
        this.model.sourceBankAccountName = item.displayText;
        this.formGroup.patchValue(this.model);
    }

    destinationBankAccountItemSelected(item: ISelectOption) {
        this.model.destinationBankAccountId = item.value;
        this.model.destinationBankAccountName = item.displayText;
        this.formGroup.patchValue(this.model);
    }

    invoiceDetailOnChange(data: InvoiceDetailDto[]) {
        this.model.listInvoiceDetailDto = data;
        this.calculateTotalAmount();
        this.formGroup.patchValue(this.model);
    }

    private calculateTotalAmount() {
        let totalAmount = 0;
        _.forEach(this.model.listInvoiceDetailDto, (item) => {
            let amount = _.toNumber(item.amount);
            totalAmount += amount;
        });

        this.model.totalAmount = totalAmount;
    }

    save(): void {
        this.model.listInvoiceDetailDto = this.invoiceDetailComponent.baseTableEdit.datasource;
        this.formGroup.patchValue(this.model);
        super.save();
    }
}
