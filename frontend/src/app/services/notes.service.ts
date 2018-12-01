import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class NotesService {
  public notes =[];
   token = localStorage.getItem('Authentication');
  constructor(private http: HttpClient) { }

  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': this.token
  })
};

  getNotes(){
    //token
    this.http.get('http://localhost:80/note/getNotes', this.httpOptions).subscribe((res: any) => {
     this.notes = res.data;

    });
  }

  createNote(titleIn,descriptionIn){
    var body = {
      title: titleIn,
      description: descriptionIn,
    }
    this.http.post('http://localhost:80/note/createNote' ,body,this.httpOptions)
    .subscribe(res => {
       //worth it?
       this.getNotes();
    });
  }

  deleteNote(noteID) {
    this.http.delete('http://localhost:80/note/deleteNote/:' +noteID,this.httpOptions)
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
    this.http.patch('http://localhost:80/note/updateNote/:' +noteID,body,this.httpOptions)
    .subscribe(res => {
       //worth it?
       this.getNotes();
    });
  }
}
