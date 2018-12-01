import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import {appConfig} from "../../app.config";

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
          provider: new GoogleLoginProvider(appConfig.googleClientId)
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
