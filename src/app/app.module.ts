import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home.component';
import { NavBarComponent } from './NavBar/navbar.component';
import { ExerciseComponent } from './workout/exercise/exercise.component';
import { ExerciseListComponent } from './workout/exercise-list/exercise-list.component';
import { MyExerciseComponent } from './workout/my-exercise/my-exercise.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DropdownDirective } from './shared/dropdown.directive';
import { AlertComponent } from './shared/alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ExerciseComponent,
    ExerciseListComponent,
    MyExerciseComponent,
    AuthComponent,
    DropdownDirective,
    AlertComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, NgbModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
