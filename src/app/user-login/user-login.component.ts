import { Component, OnInit } from '@angular/core';
import { User } from "../models/User";
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  title = 'Login';
  user: User = new User();
  userForm: FormGroup;
  options: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.buildForm(this.formBuilder);
    this.authService.changeAuthStatus(false)
  }

  buildForm(formBuilder: FormBuilder): void {
    this.userForm = formBuilder.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });
  }

  public login(userDetails): void {
    this.user.name = userDetails.username;
    this.user.password = userDetails.password;
    if (this.authService.authenticateUser(this.user)) {
      this.authService.setLoggedIn(true);
      this.router.navigate(['/users']);
    } else {
      alert('Invalid');
    }
  }

  register() {
    this.router.navigate(['/register']);
  }

}
