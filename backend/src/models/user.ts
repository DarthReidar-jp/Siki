// models/User.ts
export class User {
    public _id?: string;
    public username: string;
    public email: string;
    public password: string; // これはハッシュ化されたパスワードを保持します
  
    constructor(username: string = '', email: string = '', password: string = '') {
      this.username = username;
      this.email = email;
      this.password = password;
    }
  }
  