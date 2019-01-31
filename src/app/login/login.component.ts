import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private db:AngularFireDatabase, private afAuth:AngularFireAuth){
    
  }
  error:String;
  userType;
  login(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(user =>{
      this.db.object('users/'+user.user.uid).update({
        email:user.user.email,
        name:user.user.displayName,
        userType:this.userType,
        userId : user.user.uid
      }).then(()=>{
        if(this.userType=="patient"){
          window.location.href="Patient";
        }
        else{
          window.location.href="Dashboard";
        }
        
      })
      
    })
    .catch(err=>{
      this.error = err;
    })
  }
  ngOnInit() {
    this.db.object("stuff").update({
      'name':"veer"
    })
    this.db.object("stuff").valueChanges().subscribe(data=>{
      console.log(data);
    })
  }

}
