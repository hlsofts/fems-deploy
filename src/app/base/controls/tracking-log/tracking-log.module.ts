import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatNumberModule } from '../../pipes/format-number/format-number.module';
import { MomentFormatModule } from '../../pipes/moment-format/moment-format.module';
import { SanitizeHtmlModule } from '../../pipes/sanitize-html/sanitize-html.module';
import { TrackingLogComponent } from './tracking-log.component';
import { AntDesignModule } from '../../../../shared/modules/ant-design/ant-design.module';
import { TrackingLogDetailComponent } from './tracking-log-detail/tracking-log-detail.component';
import { BaseSeriveProxy } from '../../../../shared/service-proxies/base-serive-proxy.service';


@NgModule({
    declarations: [
        TrackingLogComponent,
        TrackingLogDetailComponent
    ],
    imports: [
        CommonModule,
        AntDesignModule,
        SanitizeHtmlModule,
        FormatNumberModule,
        MomentFormatModule
    ],
    exports: [
        TrackingLogComponent
    ],
    providers: [
        BaseSeriveProxy
    ]
})
export class TrackingLogModule { }
