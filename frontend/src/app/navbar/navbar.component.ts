import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider} from 'angular5-social-login';
import { HttpClient } from '@angular/common/http';
import {appConfig} from "../../../app.config";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth : AuthService,
               private http: HttpClient) { }


  logged = false;
  name:string;
  ngOnInit() {
  }
  public socialSignIn() {

     let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;


    this.auth.signIn(socialPlatformProvider).then(
      (userData) => {
        this.name=userData.name;
        console.log(userData.token);
        this.http.post(appConfig.backendUrl+"auth/login", { access_token: userData.token } )
        .subscribe((res: any) => {
          console.log(res.token)
          localStorage.setItem("Authentication", res.token);
          this.logged =true;
        });
      }
    );
  }
  public socialSignOut(){
    localStorage.setItem("Authentication", null);
    this.logged =false;
  }
}
