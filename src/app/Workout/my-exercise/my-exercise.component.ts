import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-my-exercise',
  templateUrl: './my-exercise.component.html',
  styleUrls: ['./my-exercise.component.css'],
})
export class MyExerciseComponent implements OnInit {
  myExercises: Exercise[] = [];
  subscription: Subscription;

  constructor(private exerciseService: ExerciseService) {}
  
  ngOnInit(): void {
    this.myExercises = this.exerciseService.getMyExercises();
    // this.subscription = this.exerciseService.myExerciseSubject.subscribe(
    //   (myExercises) => {
    //     // if myExerciss exist
    //     if (myExercises) {
    //       // push myExercises to myExercises
    //       // this.myExercises.push(myExercises)
    //       this.myExercises = myExercises;
    //     } else {
    //       // reset array of my exercises to empty arrays
    //       this.myExercises = [];
    //     }
    //   }
    // );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
