import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private db:AngularFireDatabase) { }
  loggedIn:boolean = false;
  users;
  ngOnInit() {
    this.db.list("users").valueChanges().subscribe(users=>{
      this.users = users;
      console.log(this.users);
    })
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

}
