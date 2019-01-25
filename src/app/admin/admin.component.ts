import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private db:AngularFireDatabase) { }
  loggedIn:boolean = true;
  users;
  currentRound;
  completedParticipants1;
  completedParticipants2;
  completedParticipants3;
  users1Q;
  users2Q;
  users3Q;
  sortedUsers;
  ngOnInit() {
    this.db.list("users").valueChanges().subscribe(users=>{
      
      this.users1Q = users.filter(user=>(user["currentQuestion"]==1));
      this.users1Q.sort(function(user1,user2){
        return (user1.answers.a1+user1.answers.a2+user1.answers.a3) - (user2.answers.a1+user2.answers.a2+user2.answers.a3);
      })
      this.users2Q = users.filter(user=>(user["currentQuestion"]==2));
      this.users2Q.sort(function(user1,user2){
        return (user1.answers.a1+user1.answers.a2+user1.answers.a3) - (user2.answers.a1+user2.answers.a2+user2.answers.a3);
      })
      this.users3Q = users.filter(user=>(user["currentQuestion"]==3));
      this.users3Q.sort(function(user1,user2){
        return (user1.answers.a1+user1.answers.a2+user1.answers.a3) - (user2.answers.a1+user2.answers.a2+user2.answers.a3);
      })
      this.sortedUsers = this.users3Q.concat(this.users2Q.concat(this.users1Q));
      
      
      this.db.object("noOfPart").valueChanges().subscribe(no=>{
        this.sortedUsers = this.sortedUsers.filter((user,idx) => idx < no)  
      })
    })
    this.db.object("currentRound").valueChanges().subscribe(currentRound=>{
      this.currentRound = currentRound;
      console.log(this.currentRound);
    })
    this.db.list("round2/1").valueChanges().subscribe(completedParticipants=>{
      this.completedParticipants1 = completedParticipants;
    })
    this.db.list("round2/2").valueChanges().subscribe(completedParticipants=>{
      this.completedParticipants2 = completedParticipants;
    })
    this.db.list("round2/3").valueChanges().subscribe(completedParticipants=>{
      this.completedParticipants3 = completedParticipants;
    })
    
  }
  setNoOfQualifiers(no){
    no = parseInt(no,10);
    this.db.object('noOfPart').set(no);
  }
  changeRound(roundNo){
    this.db.object('currentRound').set(roundNo);
  }
  adminLogin(password){
    this.db.object('adminPassword').valueChanges().subscribe(adminPassword=>{
      console.log(adminPassword);
      console.log(password);
      if(password==adminPassword){
        this.loggedIn = true;
      }
    })
    
  }
  enterName(name,questionNo){
    this.db.list('round2/'+questionNo).push({
      'name':name,
      'time':Date.now()
    });
  }

}
