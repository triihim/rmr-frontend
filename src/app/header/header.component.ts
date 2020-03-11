import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  showLogoutButton$: Observable<boolean>;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.showLogoutButton$ = this.authService.isUserLoggedIn;
  }

  logout(): void {
    this.authService.logout();
    this.route.navigate(["/"]);
  }

}
