import { FormatNumberModule } from './../../pipes/format-number/format-number.module';
import { SanitizeHtmlModule } from './../../pipes/sanitize-html/sanitize-html.module';
import { MomentFormatModule } from './../../pipes/moment-format/moment-format.module';
import { AntDesignModule } from '../../../../shared/modules/ant-design/ant-design.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseTableEditComponent } from './base-table-edit.component';


@NgModule({
  declarations: [
    BaseTableEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AntDesignModule,
    SanitizeHtmlModule,
    MomentFormatModule,
    FormatNumberModule
  ],
  exports: [
    BaseTableEditComponent
  ]
})
export class BaseTableEditModule { }
