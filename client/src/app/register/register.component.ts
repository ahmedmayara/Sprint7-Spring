import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UsersService, private router: Router) {}

  user: User = new User();
  confirmPassword!: string;
  emailError!: boolean;
  passwordMismatchError!: boolean;
  isLoading!: boolean;
  messages: Message[] = [];

  ngOnInit(): void {}

  register() {
    if (this.user.password !== this.confirmPassword) {
      this.passwordMismatchError = true;
      return;
    }
    console.log(this.user);
    this.isLoading = true;
    this.userService.registerUser(this.user).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.messages = [
          {
            severity: 'success',
            summary: 'Success',
            detail:
              'Sign up successful, a verification code has been sent to ' +
              this.user.email +
              '.',
          },
        ];
      },
      error: (error: any) => {
        console.log(error);
        this.emailError = true;
      },
    });
  }
}
