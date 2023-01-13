export class GroupResult {
    readonly key!: any | undefined;
    readonly count!: number;
    readonly items!: any[] | undefined;
    readonly subgroups!: GroupResult[] | undefined;
}
