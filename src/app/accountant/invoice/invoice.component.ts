import { InvoiceFilter } from './../../shared/models/filters/accountant/invoice-filter';
import { Component, Injector, OnInit } from '@angular/core';
import { ModuleTypeConfig } from '@app/shared/configs/module-type-config';
import { UrlApiConfig } from '@app/shared/configs/url-api-config';
import { InvoiceDto } from '@app/shared/models/dtos/invoice-dto';

import { BaseListComponent } from '../../base/crud/base-list-component';
import { TableActions } from '../../base/models/table-models/table-actions';
import { DataType, MatchMode, TableColumns } from '../../base/models/table-models/table-columns';
import { InvoiceStateEnum } from '@app/shared/models/enums/invoice-state-enum.enums';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent extends BaseListComponent<InvoiceDto, InvoiceFilter> implements OnInit {

    constructor(injector: Injector) {
        super(injector);
    }

    public model: InvoiceDto = new InvoiceDto();

    ngOnInit(): void {
        this.moduleType = ModuleTypeConfig.Accountant.Invoice;
        this.overrideUrlApi = UrlApiConfig.Accountant.Invoice.GetGroupPaging;
        this.tableColumns = this.getTableColumn();
        this.tableActions = this.getTableAction();
        this.filterModel = new InvoiceFilter();
    }

    getTableColumn(): TableColumns[] {
        return [
            {
                field: 'Code',
                fieldDisplay: 'code',
                header: 'Mã hóa đơn',
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
                header: 'Tên hóa đơn',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isFilter: true,
                isSort: true,
                isShow: true,
                sortPriority: 1,
                isSetWidthAbsolute: true
            },
            {
                field: 'InvoiceDate',
                fieldDisplay: 'invoiceDate',
                header: 'Ngày hóa đơn',
                dataType: DataType.date,
                matchMode: MatchMode.equals,
                isFilter: true,
                isSort: true,
                isShow: true,
                sortPriority: 1,
                isSetWidthAbsolute: true,
                momentFormatOutput: 'DD/MM/YYYY',
                align: 'center'
            },
            {
                field: 'TotalAmount',
                fieldDisplay: 'totalAmount',
                header: 'Giá trị (vnđ)',
                dataType: DataType.number,
                matchMode: MatchMode.equals,
                isFilter: true,
                isSort: true,
                isShow: true,
                sortPriority: 1,
                exponent: '2',
                isSetWidthAbsolute: true,
                align: 'right'
            },
            {
                field: 'BankAccountName',
                fieldDisplay: 'bankAccountName',
                header: 'Tài khoản chi',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isFilter: true,
                isSort: true,
                isShow: true,
                sortPriority: 1,
                isSetWidthAbsolute: true,
            },
            {
                field: 'Note',
                fieldDisplay: 'note',
                header: 'Ghi chú',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isFilter: true,
                isSort: false,
                isShow: true,
                sortPriority: 1,
                isSetWidthAbsolute: true
            },
            {
                field: 'State',
                fieldDisplay: 'stateName',
                header: 'Trạng thái',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isSort: false,
                isShow: true,
                sortPriority: -1,
                width: '120px',
                isSetWidthAbsolute: true,
                align: 'center',
                render: (record: InvoiceDto) => {
                    const stateName  = record.stateName;
                    switch (record.state) {
                        case InvoiceStateEnum.Draft: return `<span class="badge badge-secondary">${stateName}</span>`;
                        case InvoiceStateEnum.Confirm: return `<span class="badge badge-primary">${stateName}</span>`;
                        case InvoiceStateEnum.Complete: return `<span class="badge badge-success">${stateName}</span>`;
                        case InvoiceStateEnum.Cancel: return `<span class="badge badge-danger">${stateName}</span>`;
                        default: return `<span class="badge badge-warning">${stateName}</span>`;
                    }
                }
            },
        ];
    }

    getTableAction(): TableActions[] {
        return [
            {
                name: 'Cập nhật hóa đơn',
                buttonType: 'primary',
                iconTemplateRef: this.iconEditTemplateRef,
                isShow: true,
                type: 'single',
                callBack: (record) => {
                    this.update(record);
                }
            },
            {
                name: 'Xóa hóa đơn',
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
                        name: 'Xem chi tiết hóa đơn',
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
