// models/page.ts
export class Page {
  public _id?: string;
  public userId: string; // ユーザーIDフィールドを追加
  public title: string;
  public content: string;
  public vector: number[];
  public folderIds: string[];
  public score: number;

  constructor(userId: string, title: string = '', content: string = '', vector: number[] = []) {
    this.userId = userId; // コンストラクタでユーザーIDを設定
    this.title = title;
    this.content = content;
    this.vector = vector;
    this.folderIds = [];
    this.score = 0;
  }
}
