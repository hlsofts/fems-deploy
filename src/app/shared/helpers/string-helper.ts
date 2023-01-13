import * as _ from 'lodash';

export class StringHelper {


    static removeDau(value: string): string {
        if (_.isEmpty(value)) {
            return value;
        }
        value = value.toLowerCase();
        value = value.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        value = value.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        value = value.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        value = value.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        value = value.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        value = value.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        value = value.replace(/đ/g, 'd');
        value = value.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
        value = value.replace(/ + /g, ' ');
        value = value.trim();
        return value;
    }
}
