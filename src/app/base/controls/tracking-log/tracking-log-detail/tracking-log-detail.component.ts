import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../../../shared/app-component-base';
import { DataTypeConst } from '../models/enums/data-type-const.enums';
import * as _ from 'lodash';

@Component({
    selector: 'app-tracking-log-detail',
    templateUrl: './tracking-log-detail.component.html',
    styleUrls: ['./tracking-log-detail.component.css']
})
export class TrackingLogDetailComponent extends AppComponentBase implements OnInit {

    @Input() value: any;
    @Input() dataType: string;

    dataTypeConst = DataTypeConst;
    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
    }

    toDecimal(value) {
        if (value) {
            return _.round(parseFloat(_.replace(value, ',', '.')), 2);
        } else {
            return 0;
        }
    }

    toInteger(value) {
        if (value) {
            return parseInt(value);
        } else {
            return 0.00;
        }
    }
}

