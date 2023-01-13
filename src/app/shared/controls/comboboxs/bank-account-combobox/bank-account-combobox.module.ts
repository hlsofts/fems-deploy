import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountComboboxComponent } from './bank-account-combobox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  declarations: [BankAccountComboboxComponent],
  imports: [
    CommonModule,
    NzSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    BankAccountComboboxComponent
  ]
})
export class BankAccountComboboxModule { }
