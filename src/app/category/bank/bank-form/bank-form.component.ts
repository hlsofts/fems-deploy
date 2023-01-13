import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { PatternEnums } from '@app/base/models/enums/pattern-enums.enums';

import { ModuleTypeConfig } from '../../../shared/configs/module-type-config';
import { BaseFormComponent } from '../../../base/crud/base-form-component';
import { BankDto } from '@app/shared/models/dtos/bank-dto';

@Component({
    selector: 'app-bank-form',
    templateUrl: './bank-form.component.html',
    styleUrls: ['./bank-form.component.css']
})
export class BankFormComponent extends BaseFormComponent<BankDto> implements OnInit {

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.moduleType = ModuleTypeConfig.Category.Bank;
        this.buildForm();
        if (this.model && this.model.id > 0) {
            this.getById();
        }
    }    

    private buildForm() {
        this.formGroup = this.formBuilder.group({
            id: [this.model.id, []],
            code: [this.model.code, [Validators.required, Validators.maxLength(64), Validators.pattern(PatternEnums.whiteSpace)]],
            name: [this.model.name, [Validators.required, Validators.maxLength(250)]],
        });
    }
}
