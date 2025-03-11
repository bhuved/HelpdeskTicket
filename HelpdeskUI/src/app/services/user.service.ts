import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usermodel } from '../model/usermodel';

@Injectable({
  providedIn: 'root'
})
export class UserService{
private URL = "https://localhost:7138/api/Users"
  constructor(private http: HttpClient) { }

  createUser(user: Usermodel){
    return this.http.post(this.URL, user);
  }
}
