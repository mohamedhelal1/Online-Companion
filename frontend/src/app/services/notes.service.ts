import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class NotesService {
  public notes =[];
   token = localStorage.getItem('Authentication');
  constructor(private http: HttpClient) { }

  getNotes(){
    //token 
    this.http.get('http://localhost:80/note/getNotes', this.token).subscribe((res: any) => {
     this.notes = res.data;

    });
  }

  createNote(titleIn,descriptionIn){
    var body = {
      title: titleIn,
      description: descriptionIn,
    }
    this.http.post(appConfig.apiUrl + 'http://localhost:80/note/createNote' ,this.token, body)
    .subscribe(res => {
       //worth it?
       this.getNotes();
    });
  }
  
  deleteNote(noteID) {
    this.http.delete('http://localhost:80/note/deleteNote/:' +noteID,this.token)
      .subscribe(res => {
        //worth it?
        this.getNotes();
    });
  }

  updateNote(noteID,titleIn,descriptionIn){
    var body = {
      title: titleIn,
      description: descriptionIn,
    }
    this.http.patch(appConfig.apiUrl + 'http://localhost:80/note/updateNote/:' +noteID,this.token , body)
    .subscribe(res => {
       //worth it?
       this.getNotes();
    });
  }
}
