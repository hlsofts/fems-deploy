import { BaseDto } from "@app/base/models/dtos/base-dto";

export class CodeDetailDto extends BaseDto {
    code: string;
    name: string;
    type: string;
    typeName: string;
}