import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { ExerciseListComponent } from './workout/exercise-list/exercise-list.component';
import { ExerciseComponent } from './workout/exercise/exercise.component';
import { MyExerciseComponent } from './workout/my-exercise/my-exercise.component';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full"},
  { path: "exercise", component: ExerciseListComponent},
  { path: "my-exercise", component: MyExerciseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
