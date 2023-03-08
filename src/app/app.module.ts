import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{AngularFireModule}from '@angular/fire/compat'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componets/login/login.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { RegisterComponent } from './componets/register/register.component';
import { VerifyComponent } from './componets/verify/verify.component';
import { RecoverPasswComponent } from './componets/recover-passw/recover-passw.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    VerifyComponent,
    RecoverPasswComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
