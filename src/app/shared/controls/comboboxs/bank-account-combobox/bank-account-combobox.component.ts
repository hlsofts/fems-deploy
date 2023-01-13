import { Component, forwardRef, Injector, OnChanges, Provider, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseComboboxComponent } from '../../../../base/crud/base-combobox-component';
import { UrlApiConfig } from '../../../configs/url-api-config';
import { BankAccountGetPagingFilter } from '../../../models/filters/category/bank-account-get-paging-filter';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BankAccountComboboxComponent),
  multi: true,
};

@Component({
  selector: 'app-bank-account-combobox',
  templateUrl: './bank-account-combobox.component.html',
  styleUrls: ['./bank-account-combobox.component.css'],
  providers: [VALUE_ACCESSOR]
})

export class BankAccountComboboxComponent extends BaseComboboxComponent<BankAccountGetPagingFilter> implements OnChanges {

  constructor(injector: Injector) {
    super(injector);
    this.urlApi = UrlApiConfig.Category.BankAccount.GetPaging;
  }

  ngOnChanges(change: SimpleChanges) {
  }
}

