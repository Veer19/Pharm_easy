import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private db:AngularFireDatabase, private afAuth:AngularFireAuth){
    
  }
  isDoctor;
  isPharmacy;
  isPatient;
  patients;
  patient;
  symptoms = [];
  prescriptions = [];
  appointments;
  ngOnInit() {
    
    
    
    
    this.afAuth.user.subscribe(user =>{
      this.db.object('users/'+ user.uid).valueChanges().subscribe(userData=>{
        if(userData['userType']=="doctor"){
          this.isDoctor = true;
        }
        else if(userData['userType']=="pharmacy"){
          this.isPharmacy = true;

        }
        else if(userData['userType']=="patient"){
          this.isPatient = true;
        }
      })
    })
    
  }
  searchUser(userEmail){
    this.db.list("users/").valueChanges().subscribe(allUsers=>{
      this.patient = allUsers.filter(user => user["email"] == userEmail)[0];
      console.log(this.patient);
      this.db.list('users/'+this.patient.userId+"/appointments").valueChanges().subscribe(appointments=>{
        this.appointments = appointments
      })
    })
  }
  addSymptom(symptom){
    if(this.symptoms.length == 0){
      this.symptoms = [symptom];
    }
    else{
      this.symptoms.push(symptom);
    }
    
  }
  addPrescription(prescription){
    if(this.prescriptions.length == 0){
      this.prescriptions = [prescription];
    }
    else{
      this.prescriptions.push(prescription);
    }
    
  }
  submitData(reason,date){
    this.db.list("users/"+this.patient.userId+"/appointments").push({
      'reason':reason,
      'symptoms':this.symptoms,
      'prescription':this.prescriptions,
      'date':date,
      'status':'current'
    })
  }

}
