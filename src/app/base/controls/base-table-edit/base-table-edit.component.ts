import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BaseDto } from '@app/base/models/dtos/base-dto';
import { BaseGetPagingFilter } from '@app/base/models/filters/base-get-paging-filter';
import * as _ from 'lodash';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize, filter } from 'rxjs/operators';
import { AppConsts } from '../../../../shared/AppConsts';

import { BaseSeriveProxy } from '../../../../shared/service-proxies/base-serive-proxy.service';
import { ResponseResult } from '../../../../shared/service-proxies/service-proxies';
import { StatusCodeEnums } from '../../models/enums/status-code-enums.enums';
import { TableActions } from '../../models/table-models/table-actions';
import { DataType, TableColumns } from '../../models/table-models/table-columns';

@Component({
    selector: 'app-base-table-edit',
    templateUrl: './base-table-edit.component.html',
    styleUrls: ['./base-table-edit.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTableEditComponent<TFilter extends BaseGetPagingFilter, TDto extends BaseDto> implements OnInit, OnChanges, AfterViewChecked {
    @Input() moduleType: string = '';
    @Input() tableColumns: TableColumns[] = [];
    @Input() isShowCheckedBox = true;
    @Input() tableActions: TableActions[] = [];
    @Input() overrideUrlApi: string;
    @Input() isFrontPagination: boolean = false;
    @Input() isShowPagination: boolean = true;
    @Input() isGrouping: boolean = false;
    @Input() filterModel: TFilter;
    @Input() isCustomContent: boolean = false;
    @Input() isGetDataSourceFromServer: boolean = false;
    @Input() isPaging: boolean = false;
    @Input() isShowActionColumn: boolean = true;

    @Input()
    set data(values: any) {
        if (values && values.length > 0) {
            this.datasource = [];
            this.datasource = [...this.datasource, ...values];
            this.pageIndex = 1;
            this.totalItems = this.totalItems;
        } else {
            this.datasource = [];
        }
    }
    get data() {
        return this.datasource;
    }

    @Output() onChange = new EventEmitter();

    public textSearch: string = '';
    public datasource: any[] = [];
    public pageIndex = 1;
    public pageSize = 10;
    public pageNumber = 1;
    public totalPages = 1;
    public totalItems: number = 0;
    public tableLoading: boolean = false;

    public checked = false;
    public indeterminate = false;
    public listOfCurrentPageData: readonly any[] = [];
    public listOfData: readonly any[] = [];
    public setOfCheckedId = new Set<number>();
    public dataType = DataType;
    public listSort: string[] = [];
    public index = -1;

    constructor(protected baseSeriveProxy: BaseSeriveProxy,
        protected changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data) {
            this.datasource = this.data;
        }
    }

    ngAfterViewChecked(): void {
        this.changeDetectorRef.detectChanges();
    }

    ngOnInit(): void {
        if (this.isGetDataSourceFromServer === true) {
            this.search();
        }
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

    updateSourceCurrentPageData(listSource: any[], listDestination: any[]) {
        const dataDifference = _.differenceBy(listSource, listDestination, 'id');
        return dataDifference;
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
        //this.search();
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
        return this.isPaging === true ? this.pageSize : 1000000;
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

    addRow() {
        this.datasource = [
            ...this.datasource,
            {
                id: this.index,
                isDeleted: false
            }
        ];
        this.index--;
    }

    deleteRow(id: number): void {
        this.datasource = this.datasource.filter(d => d.id !== id);
        this.onChange.emit(this.datasource);
    }

    updateValueModel() {
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
        try {
            if (this.moduleType) {
                this.tableLoading = true;

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
                            this.tableLoading = false;
                        }))
                    .subscribe((result: ResponseResult) => {
                        if (result.status === StatusCodeEnums.Success) {
                            this.datasource = result.data?.items;
                            this.totalItems = result.data.totalCount;
                            this.totalPages = ((this.totalItems - (this.totalItems % this.pageSize)) / this.pageSize) + 1;
                        }
                    });
            }
            else {
                this.datasource = [];
                abp.notify.warn('url api không được để trống');
            }
        }
        catch {
            this.tableLoading = false;
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