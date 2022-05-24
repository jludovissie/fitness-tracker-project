import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './Home/home.component';
import { SessionGuard } from './auth/session.guard';
import { ExerciseListComponent } from './workout/exercise-list/exercise-list.component';
import { ExerciseComponent } from './workout/exercise/exercise.component';
import { MyExerciseComponent } from './workout/my-exercise/my-exercise.component';

const routes: Routes = [
  { path: "", redirectTo: 'home', pathMatch: "full"},
  { path: "exercise", component: ExerciseListComponent},
  { path: "my-exercise", component: MyExerciseComponent},
  { 
    path: "auth", 
    canActivate:[SessionGuard],
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
