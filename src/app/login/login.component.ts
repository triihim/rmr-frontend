import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn.subscribe(loggedIn => {
      if(loggedIn) {
        this.router.navigate(["/dashboard"])
      }
    })
  }

  private noSpaces(str): boolean {
    const result =  str && str.indexOf(" ") === -1;
    return result;
  }

  private validateEmail(email): boolean {
    const result = this.noSpaces(email) && /^\w+@\w+\.\w{2,3}$/.test(email);
    return result;
  }

  private validatePassword(password): boolean {
    const result = this.noSpaces(password) && password.length >= 8 && password.length <= 16;
    return result;
  }

  login(): void {
    this.errorMessage = "";
    if(this.validateEmail(this.email) && this.validatePassword(this.password)) {
      this.authService.login(this.email, this.password).then(result => {
        if (result === true) {
          this.router.navigate(["/dashboard"]);
        } else {
          this.errorMessage = "Login failed";
        }
      })
    } else {
      this.errorMessage = "Login failed";
    }
  }

}
