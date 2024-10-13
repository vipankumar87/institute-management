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
}
