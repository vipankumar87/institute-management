import { Injectable } from '@angular/core';

const USER = 'c_user';
const TOKEN = "caji_token"
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  saveUser(user: any) {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  }
  saveToken(token: any){
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  }

  static isAdminLogin(): boolean {
    if(this.getToken() == null) {
      return false;
    }
    const role:string = this.getUserRole()
    return role === "ADMIN";
  }

  static isStudentLogin():boolean {
    if(this.getToken() == null) {
      return false;
    }
    const role:string = this.getUserRole()
    return role === "STUDENT";
  }

  private static getToken() {
    return localStorage.getItem(TOKEN)
  }

  private static getUserRole() {
    const user = this.getUser();
    if(user == null) {
      return ''
    }
    return user.role;
  }

  private static getUser():any{
    // @ts-ignore
    const parse = JSON.parse(localStorage.getItem(USER));
    return parse;
  }
}
