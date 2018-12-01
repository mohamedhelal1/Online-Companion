import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

constructor(private notes : NotesService,private weather : WeatherService) { }

  ngOnInit() {
  }

}
