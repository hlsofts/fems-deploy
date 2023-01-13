import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CodeDetailTypeComboboxComponent } from '../../comboboxs/code-detail-type-combobox/code-detail-type-combobox.component';

@NgModule({
  declarations: [
    CodeDetailTypeComboboxComponent
  ],
  imports: [
    CommonModule,
    NzSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CodeDetailTypeComboboxComponent
  ]
})
export class CodeDetailTypeComboboxModule { }
