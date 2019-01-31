import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//MATERIAL STUFF
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, 
        MatInputModule , 
        MatToolbarModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule,
} from '@angular/material';

//FIREBASE STUFF
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientComponent } from './patient/patient.component';
import { HistoryComponent } from './history/history.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent  },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Patient', component: PatientComponent },
  { path: 'Patient/History', component: HistoryComponent }           
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    PatientComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    //Material Imports
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}