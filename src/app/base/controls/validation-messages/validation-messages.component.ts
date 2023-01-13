import { Component, Input } from '@angular/core';
import { AppLocalizationService } from '@app/shared/common/localization/app-localization.service';
import * as _ from 'lodash';

class ErrorDef {
    error: string;
    localizationKey: string;
    errorProperty: string;
}

@Component({
    selector: 'app-validation-messages',
    templateUrl: './validation-messages.component.html',
    styleUrls: ['./validation-messages.component.css']
})
export class ValidationMessagesComponent {
    @Input() formCtrl;
    readonly standartErrorDefs: ErrorDef[] = [
        { error: 'required', localizationKey: 'ThisFieldIsRequired' } as ErrorDef,
        {
            error: 'minlength',
            localizationKey: 'PleaseEnterAtLeastNCharacter',
            errorProperty: 'requiredLength',
        } as ErrorDef,
        {
            error: 'maxlength',
            localizationKey: 'PleaseEnterNoMoreThanNCharacter',
            errorProperty: 'requiredLength',
        } as ErrorDef,
        { error: 'min', localizationKey: 'PleaseEnterNoMoreThan', errorProperty: 'min' } as ErrorDef,
        { error: 'max', localizationKey: 'PleaseEnterAtLeast', errorProperty: 'max' } as ErrorDef,
        { error: 'email', localizationKey: 'InvalidEmailAddress' } as ErrorDef,
        { error: 'pattern', localizationKey: 'InvalidPattern', errorProperty: 'pattern' } as ErrorDef,
        { error: 'invalid', localizationKey: 'InvalidPattern', errorProperty: 'pattern' } as ErrorDef,
    ];

    constructor(
        private appLocalizationService: AppLocalizationService,
    ) {
    }

    _errorDefs: ErrorDef[] = [];

    @Input() set errorDefs(value: ErrorDef[]) {
        this._errorDefs = value;
    }

    get errorDefsInternal(): ErrorDef[] {
        let standarts = _.filter(this.standartErrorDefs, (ed) => !_.find(this._errorDefs, (edC) => edC.error === ed.error));
        let all = <ErrorDef[]>_.concat(standarts, this._errorDefs);

        return all;
    }

    getErrorDefinitionIsInValid(errorDef: ErrorDef): boolean {
        return !!this.formCtrl.errors[errorDef.error];
    }

    getErrorDefinitionMessage(errorDef: ErrorDef): string {
        let errorRequirement = this.formCtrl.errors[errorDef.error][errorDef.errorProperty];
        return !!errorRequirement
            ? this.appLocalizationService.l(errorDef.localizationKey, errorRequirement)
            : this.appLocalizationService.l(errorDef.localizationKey);
    }
}
