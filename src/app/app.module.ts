import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from "./auth/auth.guard";
import { ReadingComponent } from './reading/reading.component';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "dashboard", canActivate: [AuthGuard], component: DashboardComponent },
  { path: "reading/:filename", canActivate: [AuthGuard], component: ReadingComponent }
  // { path: "dashboard", component: DashboardComponent },
  // { path: "reading/:filename", component: ReadingComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ReadingComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
