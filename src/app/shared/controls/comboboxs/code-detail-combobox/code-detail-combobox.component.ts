import { Component, forwardRef, Injector, Provider } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComboboxComponent } from '../../../../base/crud/base-combobox-component';
import { UrlApiConfig } from '../../../configs/url-api-config';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CodeDetailComboboxComponent),
  multi: true,
};

@Component({
  selector: 'app-code-detail-combobox',
  templateUrl: './code-detail-combobox.component.html',
  styleUrls: ['./code-detail-combobox.component.css'],
  providers: [VALUE_ACCESSOR]
})

export class CodeDetailComboboxComponent extends BaseComboboxComponent<any> {

  constructor(injector: Injector) {
    super(injector);
    this.urlApi = UrlApiConfig.Category.CodeDetail.GetPaging;
  }
}

