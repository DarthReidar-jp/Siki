export class Memo {
  public _id?: string;
  public title: string;
  public content: string;
  public vector: number[];
  public folderIds: string[];
  public score: number;

  constructor(title: string = '', content: string = '', vector: number[]) {
    this.title = title;
    this.content = content;
    this.vector = vector;
    this.folderIds = [];
    this.score = 0;
  }
}
