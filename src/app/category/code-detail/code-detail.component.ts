import { CodeDetailFilter } from './../../shared/models/filters/category/code-detail-filter';
import { Component, Injector, OnInit } from '@angular/core';
import { ModuleTypeConfig } from '@app/shared/configs/module-type-config';
import { CodeDetailDto } from '@app/shared/models/dtos/code-detail-dto';

import { BaseListComponent } from '../../base/crud/base-list-component';
import { TableActions } from '../../base/models/table-models/table-actions';
import { DataType, MatchMode, TableColumns } from '../../base/models/table-models/table-columns';

@Component({
  selector: 'app-code-detail',
  templateUrl: './code-detail.component.html',
  styleUrls: ['./code-detail.component.css']
})
export class CodeDetailComponent extends BaseListComponent<CodeDetailDto, CodeDetailFilter> implements OnInit {

    constructor(injector: Injector) {
        super(injector);
    }

    public model: CodeDetailDto = new CodeDetailDto();

    ngOnInit(): void {
        this.moduleType = ModuleTypeConfig.Category.CodeDetail ;
        this.tableColumns = this.getTableColumn();
        this.tableActions = this.getTableAction();
        this.filterModel = new CodeDetailFilter();
    }

    getTableColumn(): TableColumns[] {
        return [
            {
                field: 'Code',
                fieldDisplay: 'code',
                header: 'Mã chi phí',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isFilter: true,
                isShow: true,
                isSort: true,
                sortPriority: -1,
                width: '150px',
                isSetWidthAbsolute: true,
            },
            {
                field: 'Name',
                fieldDisplay: 'name',
                header: 'Tên chi phí',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isFilter: true,
                isSort: true,
                isShow: true,
                sortPriority: -1,
                isSetWidthAbsolute: true,
            },
            {
                field: 'Type',
                fieldDisplay: 'typeName',
                header: 'Loại chi phí',
                dataType: DataType.text,
                matchMode: MatchMode.contains,
                isFilter: true,
                isSort: false,
                isShow: true,
                sortPriority: -1,
                isSetWidthAbsolute: true,
            },
            {
                field: 'Active',
                fieldDisplay: 'activeName',
                header: 'Trạng thái',
                dataType: DataType.text,
                matchMode: MatchMode.equals,
                isSort: false,
                isShow: true,
                sortPriority: -1,
                width: '120px',
                isSetWidthAbsolute: true,
            },
        ];
    }

    getTableAction(): TableActions[] {
        return [
            {
                name: 'Cập nhật khoản mục chi phí',
                buttonType: 'primary',
                iconTemplateRef: this.iconEditTemplateRef,
                isShow: true,
                type: 'single',
                callBack: (record) => {
                    this.update(record);
                }
            },
            {
                name: 'Xóa khoản mục chi phí',
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
                        name: 'Xem chi tiết khoản mục chi phí',
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

