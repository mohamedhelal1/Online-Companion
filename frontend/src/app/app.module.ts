import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';

import {
  AuthServiceConfig,
  GoogleLoginProvider,
  SocialLoginModule
} from "angular5-social-login";



// Configs
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("1056543646824-gj2qrem1jjrq55vmjo86adrqnip6aol5.apps.googleusercontent.com")
        },
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,

    ],
    providers: [
        {
          provide: AuthServiceConfig,
          useFactory: getAuthServiceConfigs
        }
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
