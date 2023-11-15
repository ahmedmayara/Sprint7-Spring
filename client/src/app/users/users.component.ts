import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UsersService } from '../users.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UsersService,
    public authService: AuthService
  ) {
    this.users = [];
  }

  deleteUser(user: User) {
    let conf = confirm('Are you sure you want to delete this user?');
    if (conf) {
      this.userService.deleteUser(user.user_id).subscribe((data) => {
        console.log('User deleted');
        this.loadUsers();
      });
    }
  }

  loadUsers() {
    this.userService.usersList().subscribe((users) => {
      this.users = users;
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }
}
