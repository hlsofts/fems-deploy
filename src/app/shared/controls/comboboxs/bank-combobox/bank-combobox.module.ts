import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { BankComboboxComponent } from '../bank-combobox/bank-combobox.component';

@NgModule({
  declarations: [
    BankComboboxComponent
  ],
  imports: [
    CommonModule,
    NzSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    BankComboboxComponent
  ]
})
export class BankComboboxModule { }
