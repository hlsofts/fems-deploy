import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ISelectOption } from '@app/base/models/combobox/select-option';
import { PatternEnums } from '@app/base/models/enums/pattern-enums.enums';
import { CodeDetailDto } from '@app/shared/models/dtos/code-detail-dto';

import { BaseFormComponent } from '../../../base/crud/base-form-component';
import { ModuleTypeConfig } from '../../../shared/configs/module-type-config';

@Component({
    selector: 'app-code-detail-form',
    templateUrl: './code-detail-form.component.html',
    styleUrls: ['./code-detail-form.component.css']
})
export class CodeDetailFormComponent extends BaseFormComponent<CodeDetailDto> implements OnInit {
    public model: CodeDetailDto = new CodeDetailDto();

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.moduleType = ModuleTypeConfig.Category.CodeDetail;
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
            type: [this.model.type, [Validators.required, Validators.maxLength(250)]],
            typeName: [this.model.typeName, [Validators.required, Validators.maxLength(250)]],
        });
    }

    typeItemSelected(item: ISelectOption) {
        this.model.type = item.value;
        this.model.typeName = item.displayText;
        this.formGroup.patchValue(this.model);
    }
}
