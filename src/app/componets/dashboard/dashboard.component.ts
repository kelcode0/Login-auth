import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  dataUser: any;
  constructor(private auth: AngularFireAuth,
    private router:Router ){

  }

  ngOnInit(): void {
       this.auth.currentUser
       .then((user) => {
         if(user && user.emailVerified){
          this.dataUser = user;

         }else{
          this.router.navigate(['/login'])
        }
       })
  }

  logout(){
    this.auth.signOut().then(()=>this.router.navigate(['/login']))

  }

}
