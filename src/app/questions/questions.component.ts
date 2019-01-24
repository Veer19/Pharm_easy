import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private db:AngularFireDatabase, private afAuth:AngularFireAuth) { }
  currentRoundNumber;
  ngOnInit() {
    this.db.object("currentRound").valueChanges().subscribe(round=>{
      this.currentRoundNumber = round
    })
    
  }
  wrongAnswer;
  areAnswersCorrect = {
    "1":false,
    "2":false,
    "3":false,
    "4":false,
    "5":false
  };
  submitAns(ans,questionNo){
    this.db.object('answers/').valueChanges().subscribe(answers=>{
      if(ans==answers[questionNo]){        
        this.afAuth.user.subscribe(userData=>{
          this.db.object("users/"+userData.uid+"/answers/a"+questionNo).set(ans);
          this.areAnswersCorrect[questionNo] = true;
        })
      }
      else{
        alert("Wrong Answer")
      }
    });
  }


}
