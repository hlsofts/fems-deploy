import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ISelectOption } from '@app/base/models/combobox/select-option';
import { BankAccountDto } from '@app/shared/models/dtos/bank-account-dto';

import { BaseFormComponent } from '../../../base/crud/base-form-component';
import { ModuleTypeConfig } from '../../../shared/configs/module-type-config';

@Component({
  selector: 'app-bank-account-form',
  templateUrl: './bank-account-form.component.html',
  styleUrls: ['./bank-account-form.component.css']
})
export class BankAccountFormComponent extends BaseFormComponent<BankAccountDto> implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.moduleType = ModuleTypeConfig.Category.BankAccount;
    this.buildForm();
    if (this.model && this.model.id > 0) {
      this.getById();
    }
  }

  bankItemSelected(item: ISelectOption) {
    this.model.bankId = item?.value;
    this.model.bankName = item?.displayText;
    this.formGroup.patchValue(this.model);
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      id: [this.model.id, []],
      code: [this.model.code, []],
      name: [this.model.name, [Validators.required, Validators.maxLength(250)]],
      bankId: [this.model.bankId, [Validators.required]],
      bankName: [this.model.bankName, [Validators.required]],
      holders: [this.model.holders, [Validators.required, Validators.maxLength(250)]],
      branch: [this.model.branch, [Validators.required, Validators.maxLength(250)]],
      number: [this.model.number, [Validators.required, Validators.maxLength(25)]],
      balance: [this.model.balance, [Validators.required]]
    });
  }
}
