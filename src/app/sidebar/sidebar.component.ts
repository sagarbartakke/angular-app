import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() childMessage: string;
  term: string;
  authenticated: boolean;
  constructor(private authService: AuthService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.authenticated = true;
    console.log(this.childMessage);
    this.dataService.currentMessage.subscribe(term => this.term = term)
    this.authService.changeAuthStatus(true)
    this.authService.authenticated.subscribe(authenticated =>
      this.authenticated = authenticated
    )
  }

  onSearchChange(value: string) {
    this.dataService.changeTerm(value);
  }

  logout() {
    this.authService.changeAuthStatus(false)
    this.authService.setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    this.router.navigate(['']);
  }


}
