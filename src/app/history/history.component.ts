import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  constructor(private db:AngularFireDatabase, private afAuth:AngularFireAuth){
    
  }
  name;
  appointments;
  ngOnInit() {
    
    
    this.afAuth.user.subscribe(user =>{
      this.db.object('users/'+ user.uid).valueChanges().subscribe(userData=>{
        this.name = userData["name"];
      })
      this.db.list('users/'+user.uid+"/appointments").valueChanges().subscribe(data=>{
        this.appointments = data.filter(d=>d["status"] == "past")
      })
    })
    
  }

}
