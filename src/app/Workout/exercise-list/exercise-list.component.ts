import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
})
export class ExerciseListComponent implements OnInit {
  allExercises: Exercise[] = [];

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.allExercises = this.exerciseService.getExercises()
  }
  onAddExercise(exercise){
    console.log(exercise)
    this.exerciseService.addExercise(exercise)
  }
}

// Exercise list component has to communicate with my-exercise component
//

//
