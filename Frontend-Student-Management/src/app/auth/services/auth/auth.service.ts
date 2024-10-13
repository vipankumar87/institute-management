import { Injectable } from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {StorageService} from "../storage-service/storage.service";

const BASE_URL : string[] = [ 'http://localhost:8585/' ];

export const AUTH_HEADER:string = "authorization";
@Injectable({
  providedIn: 'root',
  deps: [HttpHandler]
})
export class AuthService {

  constructor(private http: HttpClient, private storage:StorageService) { }
  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'authenticate', loginRequest, {observe: 'response'})
      .pipe(
        tap(res => console.log(res)),
        map(res=>{
          this.storage.saveUser(res.body)
          const tokenLength = res.headers.get(AUTH_HEADER)?.length;
          const bearerToken = res.headers.get(AUTH_HEADER)?.substr(7, tokenLength);
          this.storage.saveToken(bearerToken);
          return res;
        })
      )
  }
  log(message:string){
    console.log(message)
  }
}
