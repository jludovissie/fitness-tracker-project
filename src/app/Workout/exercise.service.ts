import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  myExerciseSubject = new Subject<any>();

  allExercises: Exercise[] = [
    new Exercise('Bench Press', 'Flat Bench & Barbell', 'Chest'),
    new Exercise('Squat', 'Squat Rack & Barbell', 'Lower Body'),
    new Exercise('Chest Flys', 'Flat Bench & Dumbells', 'Chest'),
    new Exercise('Push Ups', 'Body Weight Movement', 'Chest'),
    new Exercise('Chest Presses', 'Flat Bench & Dumbells', 'Chest'),
    new Exercise('One Arm Row', 'Dumbell', 'Back'),
    new Exercise('Lat Pull Downs', 'Pull down Machine', 'Back'),
    new Exercise('Reverse Flys', 'Flat Bench & Dumbells', 'Back'),
    new Exercise('Back Extenstions', 'Bench', 'Back'),
    new Exercise('Overhead Press', 'Dumbells or Barbell', 'Shoulders'),
    new Exercise('Lateral Rise', 'Cable or Dumbell', 'Shouders'),
    new Exercise('Front Raise', 'Cable or Dumbell', 'Shoulders'),
    new Exercise('Upright Row', 'Dumbells or Barbell', 'Shoulder'),
    new Exercise('Curls', 'Dumbell & Barbell', 'Bicep'),
    new Exercise('Hammer Curls', 'Dumbells', 'Bicep'),
    new Exercise('Concentration Curl', 'Barbell or Dumbell', 'Bicep'),
    new Exercise('Lunges', 'Body Weight or Dumbells', 'Legs'),
    new Exercise('Deadlift', 'Barbell', 'Back & Legs'),
    new Exercise('Calf Raises', 'Dumbell', 'Legs'),
    new Exercise('Leg Presses', 'Machine', 'Legs'),
    new Exercise('Step Ups', 'Body Weight or Dumbells', 'Legs'),
    new Exercise('Ball Crunches', 'Medicine Ball', 'Abdominal'),
    new Exercise('Planks', 'Body Weight', 'Abdominal'),
    new Exercise('Knee Tucks', 'Body Weight', 'Adominal'),
    new Exercise('Deadlift', 'Barbell', 'Back & Legs'),
    new Exercise('Calf Raises', 'Dumbell', 'Legs'),
  ];

  // my exercsies property
  myExercises: Exercise[] = [];

  constructor(private httpClient: HttpClient){}

  getExercises() {
    return this.allExercises.slice();
  }

  getMyExercises() {
    return this.myExercises.slice();
  }

  addExercise(exercise): Observable<any> {
    // push exercise to myExercises
    this.myExercises.push(exercise);
    console.log(this.myExercises);
    // alert the subscribes hence update the view
    this.myExerciseSubject.next(this.myExercises.slice());
    return this.myExerciseSubject.asObservable();
  }
  saveWorkout(){}
}  

