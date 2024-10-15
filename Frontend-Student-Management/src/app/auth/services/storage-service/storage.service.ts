import {Injectable} from '@angular/core';
import {Observable, Subscriber} from "rxjs";

const USER = 'c_user';
const TOKEN = "caji_token"
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  saveUser(user: any) {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }
  saveToken(token: any){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
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
    return window.localStorage.getItem(TOKEN)
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
    const parse = JSON.parse(window.localStorage.getItem(USER));
    return parse;
  }
  public static logOut(){
    // @ts-ignore
    return new Observable<boolean>( (subscriber): boolean => {
      window.localStorage.removeItem(USER);
      subscriber.next(true);
      subscriber.complete();
    });
  }
}
