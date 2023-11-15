import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = new User();
  users = new Array<User>();

  isInvalid: boolean = false;
  isFound: boolean = false;
  isEnabled: boolean = false;
  code!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UsersService
  ) {}

  showDialog() {
    this.isEnabled = true;
  }

  ngOnInit(): void {
    this.userService.usersList().subscribe({
      next: (data) => {
        this.users = data;
        console.log(this.users);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onLoggedIn() {
    if (this.users.some((u) => u.username === this.user.username)) {
      this.isFound = true;
    } else {
      this.isInvalid = true;
    }
    this.authService.signIn(this.user).subscribe({
      next: (response) => {
        let jwt = response.headers.get('Authorization')!;
        this.authService.saveToken(jwt);
        this.authService.isLoggedIn = true;
        this.router.navigate(['/albums']);
      },
      error: (err: any) => {
        this.isEnabled = true;
      },
    });
  }

  onActivate() {
    this.userService.activateAccount(this.user.username, this.code).subscribe({
      next: (data) => {
        this.authService.signIn(this.user).subscribe({
          next: (response) => {
            let jwt = response.headers.get('Authorization')!;
            this.authService.saveToken(jwt);
            this.authService.isLoggedIn = true;
            this.router.navigate(['/albums']);
          },
          error: (err: any) => {
            this.isEnabled = true;
          },
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
