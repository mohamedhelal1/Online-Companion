import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {appConfig} from "../../../app.config";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

constructor(private http: HttpClient) { }
token = localStorage.getItem('Authentication');
public notes;

httpOptions = {
headers: new HttpHeaders({
  'Content-Type':  'application/json',
  'Authorization': this.token
})
};


  ngOnInit() {
    this.notes = [];
    this.getNotes();
  }




  getNotes(){
    this.http.get(appConfig.backendUrl+'note/getNotes', this.httpOptions).subscribe((res: any) => {
     this.notes = res.data;
    });
  }

  createNewNote(title,description)
  {
    var body = {
      title: title,
      description: description,
    }
    this.http.post(appConfig.backendUrl+'note/createNote' ,body,this.httpOptions).subscribe(res => {
      //worth it?
      console.log(res)

      this.getNotes();
  });
  }


  deleteNote(noteID) {
    this.http.delete(appConfig.backendUrl+'note/deleteNote/' +noteID,this.httpOptions)
      .subscribe(res => {
        //worth it?
        console.log(res)

        this.getNotes();
    });
  }

  updateNote(noteID,titleIn,descriptionIn){
    var body = {
      title: titleIn,
      description: descriptionIn,
    }
    this.http.patch(appConfig.backendUrl+'note/updateNote/' +noteID,body,this.httpOptions)
    .subscribe(res => {
       //worth it?
       console.log(res)

       this.getNotes();
    });
  }

}
