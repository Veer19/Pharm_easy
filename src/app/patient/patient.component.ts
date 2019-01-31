import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
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
        this.appointments = data.filter(d=>d["status"] == "current")
        console.log(this.appointments);
      })
    })
    
  }
  makePast(id){
    this.afAuth.user.subscribe(user =>{
      this.db.list('users/'+user.uid+"/appointments").valueChanges().subscribe(data=>{
        data.forEach(d=>{
          console.log(d["id"])
          if(d['reason']==this.appointments[id]['reason']){
            console.log(d['reason']);
            console.log(this.appointments[id]['reason']);
            this.db.object('users/'+user.uid+"/appointments/status").set('past');
          }
        })
      })
    })
  }

}
