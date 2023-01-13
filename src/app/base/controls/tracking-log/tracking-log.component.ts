import { Component, OnInit, OnChanges,  Injector, SimpleChanges, ViewEncapsulation, Input } from '@angular/core';
import * as _ from 'lodash';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { TrackingLogFilter } from './models/filters/tracking-log-filter';
import { finalize } from 'rxjs/operators';
import { BaseGroupResult } from '../../models/results/base-group-result';
import { ResponseResult } from '../../../../shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
    selector: 'app-tracking-log',
    templateUrl: './tracking-log.component.html',
    styleUrls: ['./tracking-log.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TrackingLogComponent extends AppComponentBase implements OnInit, OnChanges {
    @Input() moduleType: string;
    @Input() referenceId: number;
    dataSource: BaseGroupResult[];

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ((changes.referenceId && this.referenceId > 0) || (changes.moduleType && this.moduleType)) {
            this.getLog();
        }
    }

    ngOnInit(): void {
    }


    getLog() {
        if (this.referenceId) {
            this.referenceId = parseInt(this.referenceId?.toString());
        }

        if (this.referenceId > 0 && this.moduleType) {
            const filter = new TrackingLogFilter();
            filter.referenceId = this.referenceId;
            filter.moduleType = this.moduleType;
            filter.maxResultCount = 100;
            filter.skipCount = 0;
            abp.ui.setBusy();
            this.baseSeriveProxy.postRequest(`/api/services/app/TrackingLog/GetGroupPaging`, filter)
                .pipe(finalize(() => {
                    abp.ui.clearBusy();
                }))
                .subscribe((result: ResponseResult) => {
                    if (result.data?.length > 0) {
                        this.dataSource = result.data;
                        this.dataSource?.forEach((item: BaseGroupResult) => {
                            if (item.items && item.items.length > 0) {
                                _.each(item.items, (itemTracking: any) => {
                                    if (itemTracking && itemTracking.trackingValue) {
                                        itemTracking.listValue = JSON.parse(itemTracking.trackingValue);
                                    }
                                });
                                item.items = item.items.reverse();
                            }
                        });
                    }
                });
        }
    }

    getFormatVietnamDate(date: Date) {
        let strDateAfterFormat = moment(date).format('DD/MM/YYYY');
        let arrDate = strDateAfterFormat.split('/');
        return (arrDate[0] + ' tháng ' + arrDate[1] + ' năm ' + arrDate[2]);
    }
}