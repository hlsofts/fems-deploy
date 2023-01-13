import { BankFilter } from './../../shared/models/filters/category/bank-filter';
import { Component, Injector, OnInit } from '@angular/core';
import { ModuleTypeConfig } from '@app/shared/configs/module-type-config';
import { BankDto } from '@app/shared/models/dtos/bank-dto';

import { TableActions } from '../../base/models/table-models/table-actions';
import { DataType, MatchMode, TableColumns } from '../../base/models/table-models/table-columns';
import { BaseListComponent } from '../../base/crud/base-list-component';

@Component({
    selector: 'app-bank',
    templateUrl: './bank.component.html',
    styleUrls: ['./bank.component.css']
})
export class BankComponent extends BaseListComponent<BankDto, BankFilter> implements OnInit {

    constructor(injector: Injector) {
        super(injector);
    }

    public model: BankDto = new BankDto();
    public filterModel: BankFilter = new BankFilter();

    ngOnInit(): void {
        this.moduleType = ModuleTypeConfig.Category.Bank;
        this.tableColumns = this.getTableColumn();
        this.tableActions = this.getTableAction();
    }

    getTableColumn(): TableColumns[] {
        return [
            {
                field: 'Code',
                fieldDisplay: 'code',
                header: 'Mã ngân hàng',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isFilter: true,
                isShow: true,
                isSort: true,
                sortPriority: 2,
                width: '150px',
                isSetWidthAbsolute: true
            },
            {
                field: 'Name',
                fieldDisplay: 'name',
                header: 'Tên ngân hàng',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isFilter: true,
                isSort: true,
                isShow: true,
                sortPriority: 1,
                isSetWidthAbsolute: true
            },
            {
                field: 'Active',
                fieldDisplay: 'active',
                header: 'Trạng thái',
                dataType: DataType.boolean,
                matchMode: MatchMode.equals,
                isSort: false,
                isShow: true,
                sortPriority: -1,
                width: '120px',
                isSetWidthAbsolute: true,
                align: 'center'
            },
        ];
    }

    getTableAction(): TableActions[] {
        return [
            {
                name: 'Cập nhật ngân hàng',
                buttonType: 'primary',
                iconTemplateRef: this.iconEditTemplateRef,
                isShow: true,
                type: 'single',
                callBack: (record) => {
                    this.update(record);
                }
            },
            {
                name: 'Xóa ngân hàng',
                buttonType: 'danger',
                iconTemplateRef: this.iconDeleteTemplateRef,
                isShow: true,
                type: 'single',
                callBack: (record) => {
                    this.delete(record);
                }
            },
            {
                name: '',
                buttonType: 'danger',
                iconTemplateRef: this.iconDeleteTemplateRef,
                isShow: true,
                type: 'multiple',
                subActions: [
                    {
                        name: 'Xem chi tiết ngân hàng',
                        buttonType: 'danger',
                        isShow: true,
                        type: 'single',
                        callBack: (record) => {
                            this.view(record);
                        }
                    },
                ]
            }
        ];
    }
}
