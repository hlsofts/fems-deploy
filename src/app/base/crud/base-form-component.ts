import { ChangeDetectorRef, Directive, EventEmitter, Injector, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalEventBusService } from '@app/shared/services/local-event-bus.service';
import { ResponseResult } from '@shared/service-proxies/service-proxies';
import { Subscriber } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AppComponentBase } from '../../../shared/app-component-base';
import { TrackingLogComponent } from '../../base/controls/tracking-log/tracking-log.component';
import { BaseDto } from '../../base/models/dtos/base-dto';
import { StatusCodeEnums } from '../models/enums/status-code-enums.enums';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class BaseFormComponent<TDto extends BaseDto> extends AppComponentBase implements OnInit {
    @ViewChild('trackingLogComponent') trackingLogComponent: TrackingLogComponent;

    @Input() model: any;
    @Input() isReadOnly = false;
    @Output() onBackToListEvent = new EventEmitter<boolean>();

    public moduleType = '';
    public formBuilder: FormBuilder;
    public formGroup: FormGroup;
    public changeDetectorRef: ChangeDetectorRef;
    public id: number = 0;
    public localEventBusService: LocalEventBusService;
    private subscribers: any = {};

    protected constructor(injector: Injector) {
        super(injector);
        this.formBuilder = injector.get(FormBuilder);
        this.changeDetectorRef = injector.get(ChangeDetectorRef);
        this.localEventBusService = injector.get(LocalEventBusService);
    }    

    ngOnInit(): void {        
    }

    backToList() {
        this.id = 0;
        this.onBackToListEvent.emit(false);
    }

    getById() {
        abp.ui.setBusy();
        const request = {

        };
        this.baseSeriveProxy.postRequest(`/api/services/app/${this.moduleType}/GetById?id=${this.model.id}`, request)
            .pipe(
                finalize(() => {
                    abp.ui.clearBusy();
                }))
            .subscribe((result: ResponseResult) => {
                if (result.status === StatusCodeEnums.Success) {
                    abp.notify.success(result.message);
                    this.model = result.data;
                    this.formGroup.patchValue(this.model);
                } else {
                    abp.notify.error(result.message);
                }
            });
    }

    edit() {
        this.isReadOnly = false;
    }

    save() {
        // tslint:disable-next-line:forin
        for (const key in this.formGroup.controls) {
            this.formGroup.controls[key].markAsDirty();
            this.formGroup.controls[key].updateValueAndValidity();

            if (this.formGroup.controls[key].status !== 'VALID') {
                console.log(key, this.formGroup.controls[key]);
            }
        }

        if (this.formGroup.invalid) {
            const responseResult = new ResponseResult();
            responseResult.status = StatusCodeEnums.Error;
            return;
        }

        this.model = this.formGroup.value;
        const isCreate = this.model.id > 0 ? false : true;

        if (!this.formGroup.invalid) {
            abp.ui.setBusy();
            const request = {};
            this.baseSeriveProxy.postRequest(`/api/services/app/${this.moduleType}/Upsert`, this.model)
                .pipe(
                    finalize(() => {
                        abp.ui.clearBusy();
                    })
                ).subscribe((result: ResponseResult) => {
                    if (result.status === StatusCodeEnums.Success) {
                        abp.notify.success(result.message);
                        if (isCreate === true) {
                            this.backToList();
                        } else {
                            this.trackingLogComponent.getLog();
                        }
                    } else {
                        abp.notify.error(result.message);
                    }
                });
        } else {
            abp.notify.error('Vui lòng nhập dữ liệu bắt buộc');
        }
    }
}
