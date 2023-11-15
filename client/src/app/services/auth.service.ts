import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL: string = 'http://localhost:8081/users';
  token!: string;
  private helper = new JwtHelperService();

  public LoggedUser!: string;
  public isLoggedIn: boolean = false;
  public roles!: string[];

  constructor(private router: Router, private http: HttpClient) {}

  logout() {
    this.isLoggedIn = false;
    this.LoggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', this.isLoggedIn.toString());
    this.router.navigate(['/login']);
  }

  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.token);
  }

  signIn(user: User) {
    return this.http.post<User>(this.apiURL + '/login', user, {
      observe: 'response',
    });
  }

  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
    this.token = jwt;
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
    this.decodeToken();
  }

  decodeToken() {
    if (this.token == undefined) return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    console.log(this.roles);
    this.LoggedUser = decodedToken.sub;
  }

  loadToken() {
    this.token = localStorage.getItem('token')!;
    this.decodeToken();
  }

  getToken(): string {
    return this.token;
  }

  isAdmin(): Boolean {
    if (!this.roles) return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }

  isUser(): Boolean {
    if (!this.roles) return false;
    return this.roles.indexOf('USER') > -1;
  }

  getIsLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn')!);
  }
}
