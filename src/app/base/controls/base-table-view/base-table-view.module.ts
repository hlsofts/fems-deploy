import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTableViewComponent } from './base-table-view.component';
import { AntDesignModule } from '@shared/modules/ant-design/ant-design.module';
import { FormsModule } from '@angular/forms';
import { SanitizeHtmlModule } from '../../pipes/sanitize-html/sanitize-html.module';
import { MomentFormatModule } from '../../pipes/moment-format/moment-format.module';
import { FormatNumberModule } from '../../pipes/format-number/format-number.module';


@NgModule({
    declarations: [BaseTableViewComponent],
    imports: [
        CommonModule,
        FormsModule,
        AntDesignModule,
        SanitizeHtmlModule,
        MomentFormatModule,
        FormatNumberModule
    ],
    exports: [
        BaseTableViewComponent
    ]
})
export class BaseTableViewModule { }
