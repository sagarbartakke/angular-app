import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatDialogModule, MatSnackBarModule } from "@angular/material";
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AppRoutingModule } from './app-routing.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersComponent, DialogAddPost } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { UserSearchPipe } from './pipes/user-search.pipe';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    DashboardComponent,
    SidebarComponent,
    UsersComponent,
    PostsComponent,
    UserSearchPipe,
    DialogAddPost
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  entryComponents: [DialogAddPost],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
