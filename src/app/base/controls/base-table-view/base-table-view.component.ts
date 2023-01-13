import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseGetPagingFilter } from '@app/base/models/filters/base-get-paging-filter';
import { AppConsts } from '@shared/AppConsts';
import * as _ from 'lodash';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize, filter } from 'rxjs/operators';

import { BaseSeriveProxy } from '../../../../shared/service-proxies/base-serive-proxy.service';
import { ResponseResult } from '../../../../shared/service-proxies/service-proxies';
import { StatusCodeEnums } from '../../models/enums/status-code-enums.enums';
import { TableActions } from '../../models/table-models/table-actions';
import { DataType, TableColumns } from '../../models/table-models/table-columns';
import { RowItemDto } from '../../models/dtos/row-item-dto';

@Component({
    selector: 'app-base-table-view',
    templateUrl: './base-table-view.component.html',
    styleUrls: ['./base-table-view.component.css']
})
export class BaseTableViewComponent<TFilter extends BaseGetPagingFilter> implements OnInit {
    @Input() moduleType: string = '';
    @Input() tableColumns: TableColumns[] = [];
    @Input() isShowCheckedBox = true;
    @Input() tableActions: TableActions[] = [];
    @Input() overrideUrlApi: string;
    @Input() isFrontPagination: boolean = false;
    @Input() isGrouping: boolean = false;
    @Input() filterModel: TFilter;
    @Output() onRowClick = new EventEmitter();

    constructor(protected baseSeriveProxy: BaseSeriveProxy) {
    }

    public textSearch: string = '';
    public datasource: any[] = [];
    public pageIndex = 1;
    public pageSize = 10;
    public pageNumber = 1;
    public totalPages = 1;
    public totalItems: number = 0;

    public checked = false;
    public indeterminate = false;
    public listOfCurrentPageData: readonly any[] = [];
    public listOfData: readonly any[] = [];
    public setOfCheckedId = new Set<number>();
    public dataType = DataType;
    public listSort: string[] = [];

    ngOnInit(): void {
    }

    updateCheckedSet(id: number, checked: boolean): void {
        if (checked) {
            this.setOfCheckedId.add(id);
        } else {
            this.setOfCheckedId.delete(id);
        }
    }

    onItemChecked(id: number, checked: boolean): void {
        this.updateCheckedSet(id, checked);
        this.refreshCheckedStatus();
    }

    onAllChecked(value: boolean): void {
        this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
        this.refreshCheckedStatus();
    }

    onCurrentPageDataChange($event: readonly any[]): void {
        this.listOfCurrentPageData = $event;
        this.refreshCheckedStatus();
    }

    refreshCheckedStatus(): void {
        this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
        this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
    }

    onPageSizeChange(pageSize: number) {
        this.pageSize = pageSize;
    }

    /**
     * Thông tin dữ liệu filter, phân trang, sort thay đổi thì load lại dữ liệu
     * @param params 
     */
    onQueryParamsChange(params: NzTableQueryParams): void {
        const { pageSize, pageIndex, sort, filter } = params;
        const currentSort = sort.find((item) => item.value !== null);
        const sortField = (currentSort && currentSort.key) || null;
        const sortOrder = (currentSort && currentSort.value) || null;

        /// Xử lý sorting theo thứ tự ưu tiên
        this.listSort = [];
        params.sort.forEach((item) => {
            const stringSort = this.getSort(item);
            if (stringSort)
                this.listSort.push(stringSort);
        });
        if (this.listSort?.length === 0)
            this.listSort.push('id desc');


        this.pageIndex = pageIndex;
        this.search();
    }

    /**
     * Lấy danh sách dữ liệu của các row được checked
     * @returns 
     */
    getListDataChecked() {
        const listIdChecked = this.getListIdChecked();
        if (this.listOfCurrentPageData?.length > 0 && this.setOfCheckedId.size > 0) {
            return _.filter(this.listOfCurrentPageData, (item: any) => {
                return _.findIndex(listIdChecked, (id: number) => { return item.id === id }) >= 0;
            });
        }
        return [];
    }

    /**
     * Lấy danh sách id các row được checked
     * @returns 
     */
    getListIdChecked() {
        let listIdChecked = [];
        this.setOfCheckedId.forEach(function (id: number) {
            listIdChecked.push(id);
        });
        return listIdChecked;
    }

    /**
     * Lấy thông tin sort
     * @param sort 
     * @returns 
     */
    getSort(sort: { key: string; value: string }) {
        if (sort.value === 'ascend') {
            return sort.key + ' asc';
        } else if (sort.value === 'descend') {
            return sort.key + ' desc';
        } else {
            return null;
        }

    }

    /**
     * Lấy thông tin trang hiện tại
     * @param pageIndex 
     * @returns 
     */
    getSkipCount(pageIndex?: number): number {
        if (pageIndex)
            this.pageIndex = pageIndex;
        return (this.pageIndex - 1) * this.pageSize;
    }

    /**
     * Lấy tổng số bản ghi 1 trang
     * @returns 
     */
    getMaxResultCount(): number {
        return this.pageSize;
    }

    refresh() {
        this.textSearch = '';
        this.listSort = [];
        this.pageIndex = 1;
        this.getPaging();
    }

    search() {
        this.getPaging();
    }

    deleteMultiple() {
        const listDataChecked = this.getListIdChecked();
        if (listDataChecked?.length === 0)
            abp.notify.error("Vui lòng chọn bản ghi");

        abp.message.confirm(`Bạn chắc chắn muốn xóa bản ghi`, `Xác nhận`,
            isConfirmed => {
                if (isConfirmed) {
                    abp.ui.setBusy();
                    this.baseSeriveProxy.postRequest(`/api/services/app/${this.moduleType}/Delete`, listDataChecked)
                        .pipe(
                            finalize(() => {
                                abp.ui.clearBusy();
                            }))
                        .subscribe((result: ResponseResult) => {
                            if (result.status === StatusCodeEnums.Success) {
                                abp.notify.success(result.message);
                                this.refresh();
                            } else {
                                abp.notify.error(result.message);
                            }
                        });
                }
            });
    }

    protected getPaging() {
        if (this.moduleType) {
            abp.ui.setBusy();

            this.filterModel.textSearch = this.textSearch?.trim()?.toLowerCase();
            this.filterModel.maxResultCount = this.getMaxResultCount();
            this.filterModel.skipCount = this.getSkipCount(this.pageIndex);
            this.filterModel.sorting = this.listSort;
            this.filterModel.tableColumns = this.tableColumns;

            let urlApi = `/api/services/app/${this.moduleType}/GetPaging`;
            if (!_.isEmpty(this.overrideUrlApi)) {
                urlApi = this.overrideUrlApi;
            }

            this.baseSeriveProxy.postRequest(urlApi, this.filterModel)
                .pipe(
                    finalize(() => {
                        abp.ui.clearBusy();
                    }))
                .subscribe((result: ResponseResult) => {
                    if (result.status === StatusCodeEnums.Success) {
                        abp.notify.success(result.message);
                        this.datasource = result.data?.items;
                        this.totalItems = result.data.totalCount;
                        this.totalPages = ((this.totalItems - (this.totalItems % this.pageSize)) / this.pageSize) + 1;
                    } else {
                        abp.notify.error(result.message);
                    }

                });
        }
        else {
            this.datasource = [];
            abp.notify.warn('url api không được để trống');
        }
    }

    trackByIndex(index: number, el: any): number {
        if (el && el.id) {
            return el.id;
        }

        return index;
    }

    actionClick(record, callBackFunc) {
        callBackFunc(record);
    }

    onClick(index: number, data: any) {
        this.onRowClick.emit(new RowItemDto(index, data));
    }

    export() {
        abp.ui.setBusy();
        const request = {
            textSearch: this.textSearch?.trim()?.toLowerCase(),
            maxResultCount: this.getMaxResultCount(),
            skipCount: this.getSkipCount(this.pageIndex),
            sorting: this.listSort,
            tableColumns: this.tableColumns
        };

        this.baseSeriveProxy.postRequest(`/api/services/app/${this.moduleType}/Export`, request)
            .pipe(
                finalize(() => {
                    abp.ui.clearBusy();
                }))
            .subscribe((result: ResponseResult) => {
                if (result.status === StatusCodeEnums.Success) {
                    abp.notify.success(result.message);
                    const fileViewModel = result.data;
                    const url = `${AppConsts.remoteServiceBaseUrl}/File/DownloadTempFile?fileToken=${fileViewModel.fileToken}&fileType=${fileViewModel.fileType}`;
                    location.href = url;
                } else {
                    abp.notify.error(result.message);
                }
            });
    }
}
