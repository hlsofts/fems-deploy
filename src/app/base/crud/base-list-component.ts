import { BaseGetPagingFilter } from './../models/filters/base-get-paging-filter';
import { Directive, Injector, TemplateRef, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { AppComponentBase } from '../../../shared/app-component-base';
import { ResponseResult } from '../../../shared/service-proxies/service-proxies';
import { BaseTableEditComponent } from '../controls/base-table-edit/base-table-edit.component';
import { BaseDto } from '../models/dtos/base-dto';
import { StatusCodeEnums } from '../models/enums/status-code-enums.enums';
import { TableActions } from '../models/table-models/table-actions';
import { TableColumns } from '../models/table-models/table-columns';
import { BaseTableViewComponent } from '../controls/base-table-view/base-table-view.component';
import { RowItemDto } from '../models/dtos/row-item-dto';
import { LocalEventBusService } from '../../shared/services/local-event-bus.service';
import * as _ from 'lodash';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class BaseListComponent<TDto extends BaseDto, TFilter extends BaseGetPagingFilter> extends AppComponentBase {
    @ViewChild('iconEditTemplateRef', { static: true }) iconEditTemplateRef: TemplateRef<any>;
    @ViewChild('iconDeleteTemplateRef', { static: true }) iconDeleteTemplateRef: TemplateRef<any>;
    @ViewChild('baseTableView', { static: false }) baseTableView: BaseTableViewComponent<TFilter>;
    @ViewChild('baseTableEdit', { static: false }) baseTableEdit: BaseTableEditComponent<TFilter, TDto>;

    @Input() isCustomContent: boolean = false;
    @Output() onChange = new EventEmitter();

    public moduleType = '';
    public tableColumns: TableColumns[] = [];
    public tableActions: TableActions[] = [];
    public isViewForm = false;
    public model: any;
    public isReadOnly = false;
    public overrideUrlApi: string;
    public filterModel: TFilter;
    public localEventBusService: LocalEventBusService;
    public data: TDto[] = [];

    constructor(injector: Injector) {
        super(injector);
        this.localEventBusService = injector.get(LocalEventBusService);
    }

    add() {
        this.isViewForm = true;
        this.model = new BaseDto();
    }

    backToListEvent(value: boolean) {
        this.isViewForm = value;
        this.isReadOnly = false;
    }

    onRowClick(rowItem: RowItemDto) {
        this.isViewForm = true;
        this.model = rowItem.data;
        this.isReadOnly = true;
    }

    delete(record: any) {
        if (!record) {
            abp.notify.error('Vui lòng chọn bản ghi');
        }
        this.message.confirm(`Bạn chắc chắn muốn xóa bản ghi`, `Xác nhận`,
            isConfirmed => {
                if (isConfirmed) {
                    abp.ui.setBusy();
                    this.baseSeriveProxy.postRequest(`/api/services/app/${this.moduleType}/Delete`, [record.id])
                        .pipe(
                            finalize(() => {
                                abp.ui.clearBusy();
                            }))
                        .subscribe((result: ResponseResult) => {
                            if (result.status === StatusCodeEnums.Success) {
                                abp.notify.success(result.message);
                                this.baseTableEdit.refresh();
                            } else {
                                abp.notify.error(result.message);
                            }
                        });
                }
            });
    }

    removeRow(record: TDto) {
        record.isDeleted = true;
        let newData = [];
        _.forEach(this.data, (item) => {
            if (item.id !== record.id) {
                newData.push(item);
            }
        });
        this.data = newData;

        // this.baseTableEdit.deleteRow(record.id);
        // if (!record) {
        //     abp.notify.error('Vui lòng chọn bản ghi');
        // }
        // this.message.confirm(`Bạn chắc chắn muốn xóa dòng`, `Xác nhận`,
        //     isConfirmed => {
        //         if (isConfirmed) {
        //             // record.isDeleted = true;
        //             // let data = [];
        //             // _.forEach(this.baseTableEdit.datasource, (item) => {
        //             //     if (item.id !== record.id) {
        //             //         data.push(item);
        //             //     }
        //             // });
        //             // debugger
        //             // this.data = data;
        //             this.baseTableEdit.deleteRow(record.id);
        //         }
        //     });
    }

    view(record: any) {
        this.isViewForm = true;
        this.model = record;
        this.isReadOnly = true;
    }

    update(record: any) {
        this.isViewForm = true;
        this.model = record;
        this.isReadOnly = false;
    }
}
