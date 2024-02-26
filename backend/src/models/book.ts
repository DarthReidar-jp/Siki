//models/book.ts
export class Book {
    public _id?: string;
    public title: string;
    public content: string;
    public vector: number[];
  
    constructor(title: string = '') {
      this.title = title;
      this.content = '';
      this.vector = [];
    }
  }