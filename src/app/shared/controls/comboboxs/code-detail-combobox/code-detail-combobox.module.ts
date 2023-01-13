import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CodeDetailComboboxComponent } from './code-detail-combobox.component';

@NgModule({
  declarations: [
    CodeDetailComboboxComponent
  ],
  imports: [
    CommonModule,
    NzSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CodeDetailComboboxComponent
  ]
})
export class CodeDetailComboboxModule { }
