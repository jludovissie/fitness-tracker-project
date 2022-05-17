import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
   myExerciseSubject = new Subject<any>();

  allExercises: Exercise[] = [
    new Exercise('Bench Press', 'Flat Bench & Barbell', ''),
    new Exercise('squat', 'Squat Rack & Barbell', ''),
    new Exercise('Bench Press', 'Flat Bench & Barbell', ''),
    new Exercise('squat', 'Squat Rack & Barbell', ''),
    new Exercise('Bench Press', 'Flat Bench & Barbell', ''),
    new Exercise('squat', 'Squat Rack & Barbell', ''),
  ];

  // my exercsies property
  myExercises: Exercise[] = [];

  getExercises(){
   return this.allExercises.slice();
  }

  getMyExercises(){
    return this.myExercises.slice();
  }

  addExercise(exercise): Observable<any> {
    // push exercise to myExercises
    this.myExercises.push(exercise)
    console.log(this.myExercises)
    // alert the subscribes hence update the view
   this.myExerciseSubject.next(this.myExercises.slice())
   return this.myExerciseSubject.asObservable()
  }
}
