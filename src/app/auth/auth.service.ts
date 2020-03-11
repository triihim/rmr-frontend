import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _token: string;

  constructor(private http: HttpClient) { }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get("http://localhost:3000/auth/validate", {
        headers: new HttpHeaders({"authorization": "Bearer " + this.token})
      }).subscribe(result => {
        resolve(result["valid"]);
      }, error => {
        resolve(false);
      })
    })
  }

  get isUserLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get token() {
    return this._token;
  }

  login(email, password): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post("http://localhost:3000/auth/login", {
        "email": email,
        "password": password
      }).subscribe(response => {
        this._token = response["token"];
        this.loggedIn.next(true);
        resolve(true);
      }, error => {
        this.loggedIn.next(false);
        resolve(false);
      })
    })
  }

  logout(): void {
    this.loggedIn.next(false);
    this._token = "";
  }

}
