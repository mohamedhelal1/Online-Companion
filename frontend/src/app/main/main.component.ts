import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {appConfig} from "../../../app.config";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

constructor(private http: HttpClient,private modalService: NgbModal) { }
public notes;
closeResult: string;

httpOptions = {
headers: new HttpHeaders({
  'Content-Type':  'application/json',
  'Authorization': localStorage.getItem('Authentication')
})
};


  ngOnInit() {
    this.notes = [];
    this.getNotes();
    this.getRandomQuote();
    //this.getWeather();
  }


  getRandomQuote(){
    this.http.get(appConfig.backendUrl+'getRandomQuote').subscribe((res: any) => {
      console.log(res.data);
     });
  }

  getWeather(){
    this.http.get(appConfig.backendUrl+'getWeather').subscribe((res: any) => {
      console.log(res.data);
     });
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
    console.log(this.httpOptions);
    
    this.http.post(appConfig.backendUrl+'note/createNote' ,body,this.httpOptions).subscribe(res => {
      //worth it?
      this.getNotes();
  });
  }


  deleteNote(noteID) {
    this.http.delete(appConfig.backendUrl+'note/deleteNote/' +noteID,this.httpOptions)
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
    this.http.patch(appConfig.backendUrl+'note/updateNote/' +noteID,body,this.httpOptions)
    .subscribe(res => {
       //worth it?
       this.modalService.dismissAll();
       this.getNotes();
    });
  }

  open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
  }
