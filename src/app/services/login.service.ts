import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../API/api-config';
import { API_END_POINTS } from '../API/api-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private GET_API_URL = ApiUrl.baseUrl+API_END_POINTS.getUser.url;
  private LOGIN_URL = ApiUrl.baseUrl+API_END_POINTS.userLogin.url;

  public getUserWithMobile(phone:string) :Observable<any>{
    return this.http.get<any>(`${this.GET_API_URL+phone}`);
  }

  public userLogin(data:any) : Observable<any>{
    return this.http.post<any>(this.LOGIN_URL,data);
  }
}
