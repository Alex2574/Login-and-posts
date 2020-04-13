import { OnInit, Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.html',
  styleUrls: ['./comments.scss']
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  message: string;

  @Output() messageToEmit = new EventEmitter<any>();
  @Input() auth = '';

  constructor(
  ) {
    
  }

  ngOnInit() {}

  processForm() {
    const data = {
      author: this.name,
      email: localStorage.getItem('email'),
      message: this.message
    };
    this.messageToEmit.emit(data);
  }
}
