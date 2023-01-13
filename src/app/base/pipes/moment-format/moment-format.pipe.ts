import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
    name: 'momentFormat'
})
export class MomentFormatPipe implements PipeTransform {
    transform(value: moment.MomentInput, formatOutPut: string, formatInput?: string) {
        if (!value) {
            return '';
        }

        const isValid = moment(value).isValid();
        if (isValid) {
            return moment(value, formatInput).format(formatOutPut);
        } else {
            return value;
        }
    }
}
