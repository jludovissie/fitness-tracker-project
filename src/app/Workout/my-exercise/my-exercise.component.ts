import { HttpClient } from '@angular/common/http';
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
  value: number = 50;
  diffuculty: null; 
  duration: null; 
  thoughts: null; 
  clicked= false; 
  timeLeft: number; 
  timerInterval: any; 
  Date= new Date();

  todaysJournal= [
    {Diffuculty: "", 
     Duration: "", 
     Thoughts:""
    }
  ]
  constructor(private exerciseService: ExerciseService,
              private http:HttpClient) {}
  
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
  onAddJournal(){
    this.todaysJournal.push({Diffuculty:this.diffuculty, Duration: this.duration, Thoughts: this.thoughts})
  }
  startRest(){
    if (this.timerInterval) clearInterval(this.timerInterval)
     this.timeLeft = 60
     this.timerInterval = setInterval(() => {
      this.timeLeft--
    if (this.timeLeft === 0) clearInterval(this.timerInterval)
     },1000)
  }
  slider(){
    this.value = parseFloat((<HTMLInputElement>document.getElementById("myRange")).value)
  }
  onSubmitWorkout(){
    this.http.post('https://codelabs-fitness-api.herokuapp.com/api/v1/users/create', this.myExercises)
    .subscribe(resData =>{
    console.log(resData);
    if (resData){
      this.exerciseService.saveWorkout()
    }
    })
  }
  onDelete(i){
    this.myExercises.splice(i,1)
  }
}
