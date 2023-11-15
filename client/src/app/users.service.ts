import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { HttpClient } from '@angular/common/http';
import { Role } from './model/role.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl: string = 'http://localhost:8222/AUTH-SERVICE/users';

  users: User[] = [];
  user!: User;
  roles: Role[] = [];
  role!: Role;

  constructor(private http: HttpClient) {
    this.users = [];
    this.roles = [];
  }

  usersList() {
    return this.http.get<User[]>(this.apiUrl + '/allUsers');
  }

  registerUser(user: User) {
    return this.http.post<User>(this.apiUrl + '/addUser', user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.apiUrl + '/delete/' + id);
  }

  getUserById(id: number) {
    return this.http.get<User>(this.apiUrl + '/user/' + id);
  }

  getAllRoles() {
    return this.http.get<Role[]>(this.apiUrl + '/allRoles');
  }

  addRoleToUser(id: number, role: Role) {
    const url = `${this.apiUrl}/addRole/${id}`;
    return this.http.post(url, role);
  }

  removeRoleFromUser(id: number, role: Role) {
    const url = `${this.apiUrl}/removeRole/${id}`;
    return this.http.post(url, role);
  }

  getRoleById(id: number) {
    return this.http.get<Role>(this.apiUrl + '/role/' + id);
  }

  getUserRolesById(id: number) {
    return this.http.get<Role[]>(this.apiUrl + '/userRoles/' + id);
  }

  activateAccount(username: string, code: string) {
    return this.http.get(this.apiUrl + '/activate/' + username + '/' + code);
  }
}
