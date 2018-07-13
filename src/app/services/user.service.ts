import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ADMIN = 'admin';
  constructor(private http: HttpClient) { }

  userAuth(user: User) {
    if (user.name === this.ADMIN && user.password === this.ADMIN) {
      return true;
    } else {
      return false;
    }
  }

  getUsers() {
    return this.http.get<User[]>("https://jsonplaceholder.typicode.com/users")
      .pipe(catchError(this.errorHandler));
  }

  getUser(id) {
    return this.http.get("https://jsonplaceholder.typicode.com/users/" + id);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }

}
