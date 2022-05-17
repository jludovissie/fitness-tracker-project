import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home.component';
import { NavBarComponent } from './NavBar/navbar.component';
import { SignupComponent } from './Sign-Up/signup.component';
import { ExerciseComponent } from './workout/exercise/exercise.component';
import { ExerciseListComponent } from './workout/exercise-list/exercise-list.component';
import { MyExerciseComponent } from './workout/my-exercise/my-exercise.component';

@NgModule({
  declarations: [
    AppComponent, 
    NavBarComponent,
    HomeComponent,
    SignupComponent,
    ExerciseComponent,
    ExerciseListComponent,
    MyExerciseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
