import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Input() roundNo: String;
  constructor(private afAuth:AngularFireAuth) { }
  name:String;
  ngOnInit() {
    this.afAuth.user.subscribe(user=>{
      this.name = user.displayName
    })
  }
  logout(){
    this.afAuth.auth.signOut().then(()=>{
      window.location.href="";
    });
  }

}
