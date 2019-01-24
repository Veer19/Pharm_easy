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
  login(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(user =>{
      this.db.object('users/'+ user.user.uid).update({
        email:user.user.email,
        name:user.user.displayName,
        answers:{}
      }).then(()=>{
        window.location.href="Questions";
      })
      
    })
    .catch(err=>{
      this.error = err;
    })
  }
  ngOnInit() {
  }

}
