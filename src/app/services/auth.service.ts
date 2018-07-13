import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticatedSource = new BehaviorSubject<boolean>(false);
  authenticated = this.authenticatedSource.asObservable();

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(private userService: UserService) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    this.changeAuthStatus(value)
    localStorage.setItem('loggedIn', 'true');
  }

  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  authenticateUser(user: User) {
    return this.userService.userAuth(user);
  }

  changeAuthStatus(status: boolean) {
    this.authenticatedSource.next(status);
  }
}
