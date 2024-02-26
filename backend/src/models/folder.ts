// folder.ts
export class Folder {
    public _id?:string;
    public name: string;
    public description: string;
    public memoIds: string[];

    constructor(name: string, description: string = '', memoIds: string[]) {
        this.name = name;
        this.description = description;
        this.memoIds = memoIds;
    }
}
