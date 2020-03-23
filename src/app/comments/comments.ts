import { OnInit, Component, EventEmitter, Output } from "@angular/core";
import { commentBlock } from '../shared/interfaces';

@Component({
  selector: "app-comments",
  templateUrl: "./comments.html",
  styleUrls: ["./comments.scss"]
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  message: string;


  @Output() messageToEmit = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  processForm() {

    const data = {
      author: this.name,
      email: this.email,
      message: this.message
    };
    this.messageToEmit.emit(data);
  }
}
