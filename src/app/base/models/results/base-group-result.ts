import { GroupResult } from "./group-result";

export class BaseGroupResult {
    stt!: number;
    name!: string | undefined;
    keyName!: string | undefined;
    count!: number;
    key!: string | undefined;
    items!: any[] | undefined;
    subgroups!: GroupResult[] | undefined;
}
