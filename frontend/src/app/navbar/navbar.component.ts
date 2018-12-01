import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider} from 'angular5-social-login';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth : AuthService,
               private http: HttpClient) { }


  token:string;

  ngOnInit() {
  }
  public socialSignIn() {

     let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;


    this.auth.signIn(socialPlatformProvider).then(
      (userData) => {
        this.http.post("http://localhost:80/auth/login", { token: userData.idToken } )
        .subscribe((res: any) => {
          this.token=res.data.token
        });
      }
    );
  }
}
