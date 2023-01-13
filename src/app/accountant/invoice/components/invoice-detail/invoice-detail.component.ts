import { InvoiceDetailFilter } from './../../../../shared/models/filters/accountant/invoice-detail-filter';
import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseListComponent } from '@app/base/crud/base-list-component';
import { TableColumns, DataType, MatchMode } from '@app/base/models/table-models/table-columns';
import { ModuleTypeConfig } from '@app/shared/configs/module-type-config';
import { InvoiceDetailDto } from '@app/shared/models/dtos/invoice-detail-dto';
import * as _ from 'lodash';
import { TableActions } from '@app/base/models/table-models/table-actions';



@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceDetailComponent extends BaseListComponent<InvoiceDetailDto, InvoiceDetailFilter> implements OnInit, OnChanges, AfterViewChecked {
  @Input() invoiceId = 0;

  constructor(injector: Injector,
    public changeDetectorRef: ChangeDetectorRef) {
    super(injector);
  }
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.invoiceId && this.invoiceId > 0) {
      this.filterModel.invoiceId = this.invoiceId;
      this.filterModel.maxResultCount = 100000;
    }
  }

  public model: InvoiceDetailDto = new InvoiceDetailDto();
  public filterModel: InvoiceDetailFilter = new InvoiceDetailFilter();
  data: InvoiceDetailDto[] = [];

  ngOnInit(): void {
    this.moduleType = ModuleTypeConfig.Accountant.InvoiceDetail;
    this.tableColumns = this.getTableColumn();
    this.tableActions = this.getTableAction();
  }

  getTableColumn(): TableColumns[] {
    return [
      {
        field: 'Content',
        fieldDisplay: 'content',
        header: 'Nội dung',
        dataType: DataType.text,
        matchMode: MatchMode.contains,
        isFilter: true,
        isSort: false,
        isShow: true,
        sortPriority: -1,
        width: '100px',
        isSetWidthAbsolute: false
      },
      {
        field: 'Amount',
        fieldDisplay: 'amount',
        header: 'Giá trị (vnđ)',
        dataType: DataType.number,
        matchMode: MatchMode.equals,
        isFilter: true,
        isSort: false,
        isShow: true,
        sortPriority: -1,
        exponent: '2',
        width: '200px',
        isSetWidthAbsolute: false,
        align: 'right'
      }
    ];
  }

  getTableAction(): TableActions[] {
    return [
      {
        name: 'Xóa hóa đơn',
        buttonType: 'danger',
        iconTemplateRef: this.iconDeleteTemplateRef,
        isShow: true,
        type: 'single',
        callBack: (record) => {
          this.delete(record);
        }
      }
    ];
  }

  add() {
    super.add();
    this.filterModel.invoiceId = 0;
  }

  changeAmount(event) {
    try {
      this.onChange.emit(this.baseTableEdit.datasource);
    }
    catch (err) {
      abp.notify.error(err);
    }
  }

  dataSourceOnChange(data: InvoiceDetailDto[]) {
    debugger
    this.data = data;
    this.baseTableEdit.data = data;
    this.changeDetectorRef.markForCheck();
  }
}
