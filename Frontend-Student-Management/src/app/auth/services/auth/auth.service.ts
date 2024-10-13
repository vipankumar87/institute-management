import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHandler} from "@angular/common/http";

const BASE_URL : string[] = [ 'http://localhost:8585/' ];

@Injectable({
  providedIn: 'root',
  deps: [HttpHandler]
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'authenticate', loginRequest)
  }
}
