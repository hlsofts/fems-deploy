import { Component, forwardRef, Injector, OnChanges, Provider, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseComboboxComponent } from '../../../../base/crud/base-combobox-component';
import { UrlApiConfig } from '../../../configs/url-api-config';
import { BankGetPagingFilter } from '../../../models/filters/category/bank-get-paging-filter';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BankComboboxComponent),
  multi: true,
};

@Component({
  selector: 'app-bank-combobox',
  templateUrl: './bank-combobox.component.html',
  styleUrls: ['./bank-combobox.component.css'],
  providers: [VALUE_ACCESSOR]
})

export class BankComboboxComponent extends BaseComboboxComponent<BankGetPagingFilter> implements OnChanges {

  constructor(injector: Injector) {
    super(injector);
    this.urlApi = UrlApiConfig.Category.Bank.GetPaging;
  }

  ngOnChanges(change: SimpleChanges) {
  }
}
