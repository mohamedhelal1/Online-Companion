import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { appConfig } from "../../../app.config";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  constructor(private http: HttpClient, private modalService: NgbModal) {}
  public notes;
  closeResult: string;
  weather;
  httpOptions;
  quote;

  getToken() {
    return localStorage.getItem("Authentication");
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.getToken()
      })
    };
  }

  ngOnInit() {
    this.notes = [];

    if (this.getToken()) {
      this.httpOptions = this.getHeaders();
      this.getNotes();
    }
    this.getRandomQuote();
    this.getWeather();
  }

  getRandomQuote() {
    this.http
      .get(appConfig.backendUrl + "getRandomQuote")
      .subscribe((res: any) => {
        this.quote = res.data;
      });
  }

  getWeather() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.http
            .get(
              appConfig.backendUrl +
                "getWeather/" +
                position.coords.longitude +
                "/" +
                position.coords.latitude
            )
            .subscribe((res: any) => {
              this.weather = res.data;
            });
        },
        error => {
          console.log(error);
          this.http
            .get(appConfig.backendUrl + "getWeather/31/30")
            .subscribe((res: any) => {
              this.weather = res.data;
            });
        }
      );
    }
  }

  getNotes() {
    this.httpOptions = this.getHeaders();

    this.http
      .get(appConfig.backendUrl + "note/getNotes", this.httpOptions)
      .subscribe((res: any) => {
        this.notes = res.data;
      });
  }

  createNewNote(title, description) {

    this.httpOptions = this.getHeaders();

if(title.trim() && description.trim())
{

    var body = {
      title: title,
      description: description
    };
    this.http
      .post(appConfig.backendUrl + "note/createNote", body, this.httpOptions)
      .subscribe(res => {
        this.getNotes();
      });
    }
  }

  deleteNote(noteID) {
    this.httpOptions = this.getHeaders();

    this.http
      .delete(
        appConfig.backendUrl + "note/deleteNote/" + noteID,
        this.httpOptions
      )
      .subscribe(res => {
        this.getNotes();
      });
  }

  updateNote(noteID, titleIn, descriptionIn) {
    this.httpOptions = this.getHeaders();
    if(titleIn.trim() && descriptionIn.trim())
    {
    var body = {
      title: titleIn,
      description: descriptionIn
    };
    this.http
      .patch(
        appConfig.backendUrl + "note/updateNote/" + noteID,
        body,
        this.httpOptions
      )
      .subscribe(res => {
        this.modalService.dismissAll();
        this.getNotes();
      });
    }
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
