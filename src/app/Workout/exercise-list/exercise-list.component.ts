import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';


@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
})
export class ExerciseListComponent implements OnInit {
  submitted = false; 
  allExercises: Exercise[] = [];
  message;
  modal= "Your Log has been updated"
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.allExercises = this.exerciseService.getExercises();
  }
  onAddExercise(exercise) {
    console.log(exercise);
    this.exerciseService.addExercise(exercise);

  }
  onSubmit(formObj: NgForm){
    this.submitted = true; 

    this.exerciseService.addExercise(formObj.value.name); 
    this.exerciseService.addExercise(formObj.value.desc) 
  

    formObj.reset();
  }
}

// Exercise list component has to communicate with my-exercise component
//

//
