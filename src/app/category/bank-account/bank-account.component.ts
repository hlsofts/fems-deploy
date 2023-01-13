import { BankAccountFilter } from './../../shared/models/filters/category/bank-account-filter';
import { Component, Injector, OnInit } from '@angular/core';
import { ModuleTypeConfig } from '@app/shared/configs/module-type-config';
import { BankAccountDto } from '@app/shared/models/dtos/bank-account-dto';

import { BaseListComponent } from '../../base/crud/base-list-component';
import { TableActions } from '../../base/models/table-models/table-actions';
import { DataType, MatchMode, TableColumns } from '../../base/models/table-models/table-columns';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent extends BaseListComponent<BankAccountDto, BankAccountFilter> implements OnInit {

    constructor(injector: Injector) {
        super(injector);
    }

    public model: BankAccountDto = new BankAccountDto();

    ngOnInit(): void {
        this.moduleType = ModuleTypeConfig.Category.BankAccount;
        this.tableColumns = this.getTableColumn();
        this.tableActions = this.getTableAction();
        this.filterModel = new BankAccountFilter();
    }

    getTableColumn(): TableColumns[] {
        return [
            {
                field: 'Code',
                fieldDisplay: 'code',
                header: 'Mã tài khoản',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isFilter: true,
                isShow: true,
                isSort: true,
                sortPriority: 1,
                width: '150px',
                isSetWidthAbsolute: true
            },
            {
                field: 'UnaccentLowName',
                fieldDisplay: 'name',
                header: 'Tên tài khoản',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isFilter: true,
                isSort: true,
                isShow: true,
                sortPriority: 2,
                isSetWidthAbsolute: true
            },
            {
                field: 'BankUnaccentLowName',
                fieldDisplay: 'bankName',
                header: 'Ngân hàng',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isFilter: true,
                isSort: true,
                isShow: true,
                sortPriority: 3,
                isSetWidthAbsolute: true
            },
            {
                field: 'Holders',
                fieldDisplay: 'holders',
                header: 'Chủ tài khoản',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isFilter: true,
                isSort: true,
                isShow: true,
                sortPriority: -1,
                isSetWidthAbsolute: true
            },
            {
                field: 'Number',
                fieldDisplay: 'number',
                header: 'Số tài khoản',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isFilter: true,
                isSort: true,
                isShow: true,
                sortPriority: -1,
                isSetWidthAbsolute: true
            },
            {
                field: 'Branch',
                fieldDisplay: 'branch',
                header: 'Chi nhánh',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isFilter: true,
                isSort: true,
                isShow: true,
                sortPriority: -1,
                isSetWidthAbsolute: true
            },
            {
                field: 'Balance',
                fieldDisplay: 'balance',
                header: 'Số dư (vnđ)',
                dataType: DataType.number,
                matchMode: MatchMode.contains,
                isFilter: true,
                isSort: true,
                isShow: true,
                sortPriority: -1,
                isSetWidthAbsolute: true,
                exponent: '2',
                align: 'right'
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
                name: 'Cập nhật tài khoản ngân hàng',
                buttonType: 'primary',
                iconTemplateRef: this.iconEditTemplateRef,
                isShow: true,
                type: 'single',
                callBack: (record) => {
                    this.update(record);
                }
            },
            {
                name: 'Xóa tài khoản ngân hàng',
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
                        name: 'Xem chi tiết tài khoản ngân hàng',
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

