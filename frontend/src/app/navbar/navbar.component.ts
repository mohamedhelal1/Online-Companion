import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../services/google-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth : GoogleAuthService) { }

  ngOnInit() {
  }

}
