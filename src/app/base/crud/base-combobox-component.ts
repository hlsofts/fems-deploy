import { AfterViewInit, Directive, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as _ from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AppComponentBase } from '../../../shared/app-component-base';
import { ResponseResult } from '../../../shared/service-proxies/service-proxies';
import { StatusCodeEnums } from '../../base/models/enums/status-code-enums.enums';
import { StringHelper } from '../../shared/helpers/string-helper';
import { ISelectOption } from '../models/combobox/select-option';
import { BaseGetPagingFilter } from '../models/filters/base-get-paging-filter';

@Directive()
// tslint:disable-next-line: max-line-length
export class BaseComboboxComponent<TFilter extends BaseGetPagingFilter> extends AppComponentBase implements AfterViewInit, OnInit, OnChanges, ControlValueAccessor {
    @Input() isMultiple = false;
    @Input() isLoadDataFromServer = true;
    @Input() isAddSources = true;
    @Input() staticSources: any = [];
    @Input() isReadOnly = false;
    @Output() onItemSelected = new EventEmitter();

    urlApi = '';
    modalService: NzModalService;
    viewContainerRefAnt: ViewContainerRef;
    options$: Observable<ISelectOption[]> = of([]);
    filter: BaseGetPagingFilter = new BaseGetPagingFilter();
    maxResultCount = 40;
    isChangeFilter = false;
    textSearch: string = null;

    // tslint:disable-next-line: member-ordering
    _value: any;

    // tslint:disable-next-line: member-ordering
    _sources: ISelectOption[] = [];

    // tslint:disable-next-line: member-ordering
    _selectedItems: ISelectOption[] = [];

    constructor(injector: Injector) {
        super(injector);
        this.viewContainerRefAnt = injector.get(ViewContainerRef);
    }
    // tslint:disable-next-line: member-ordering
    @Input()
    get value() {
        return this._value;
    }

    // tslint:disable-next-line: member-ordering
    set value(v: any) {
        this._value = v;
    }
    // tslint:disable-next-line: member-ordering
    get sources() {
        return this._sources;
    }

    // tslint:disable-next-line: member-ordering
    @Input()
    set sources(values: ISelectOption[]) {
        this._sources = values;
        if (this._sources) {
            this.checkSelectedExists();
            this.options$ = of<ISelectOption[]>(this._sources);
        }

    }
    // tslint:disable-next-line: member-ordering
    @Input()
    get selectedItems() {
        return this._selectedItems;
    }

    set selectedItems(values: ISelectOption[]) {
        this._selectedItems = values;
        const selectedIds = _.map(values, (item: ISelectOption) => {
            return item.value;
        });
        this._value = this.isMultiple ? selectedIds : _.first(selectedIds);
        this.checkSelectedExists();
        this.options$ = of<ISelectOption[]>(this._sources);
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.sources) {
            this.buildSource();
        }

        if (changes.value && this.value) {
            this.isChangeFilter = true;
        }
    }

    ngOnInit(): void {

    }

    // tslint:disable-next-line: use-lifecycle-interface
    ngAfterViewChecked(): void {
        this.changeDetectorRef.detectChanges();
    }


    focus(value) {
        if (!value) {
            value = '';
        }
        this.search(value);
    }

    changeValue(event: any) {
        this.getItemSelected()?.subscribe((value) => {
            this.onItemSelected.emit(value);
        });
    }

    getItemSelected() {
        const value = this._value;
        if (!this.isMultiple) {
            const res = this._sources.find(x => x.value === value);
            return of(res);
        } else {
            const res = this._sources.filter(x => value.indexOf(x.value) > -1);
            this.onItemSelected.emit(res);
        }
    }

    search(value) {
        if (this.textSearch !== value) {
            this.textSearch = value;
            const filter = StringHelper.removeDau(value?.trim())?.toLowerCase();
            this.filter.textSearch = filter;
            this.filter.skipCount = 0;
            this.filter.maxResultCount = this.maxResultCount;

            if (this.isLoadDataFromServer) {
                this.loadDataFromServer();
            } else {
                this.loadDataFromSource();
            }
        }
    }

    buildSource() {
        this.options$ = of<ISelectOption[]>(this.sources.map((item: ISelectOption) => {
            return item;
        }));
    }

    loadDataFromServer() {
        this.baseSeriveProxy.postRequest(this.urlApi, { filter: this.filter })
            .pipe(
                finalize(() => {
                    this.isChangeFilter = false;
                }))
            .subscribe((result: ResponseResult) => {
                if (result.status === StatusCodeEnums.Success) {
                    this.sources = result.data?.items;
                    this.buildSource();
                }
            });
    }

    loadDataFromSource() {
        this.sources = this.staticSources;
        this.buildSource();
    }


    public checkSelectedExists() {
        if (this._selectedItems && this.isAddSources) {
            if (!this._sources || this._sources.length === 0) {
                _.each(this._selectedItems, (selectItem: ISelectOption) => {
                    this._sources.push(selectItem);
                });
            } else {
                _.each(this._selectedItems, (selectItem: ISelectOption) => {
                    const itemInfo = _.find(this._sources, (source: any) => {
                        return source.value === selectItem.value;
                    });

                    if (itemInfo) {
                        itemInfo.displayText = selectItem.displayText;
                    }

                    if (!itemInfo && selectItem.value) {
                        this._sources.push(selectItem);
                    }
                });
            }
        }
    }

    trackByIndex(index: number, el: any): number {
        if (el && el.id) {
            return el.id;
        }

        return index;
    }

    registerOnChange(fn: any): void {

    }
    registerOnTouched(fn: any): void {

    }
    setDisabledState?(isDisabled: boolean): void {

    }
    writeValue(obj: any): void {

    }
}
