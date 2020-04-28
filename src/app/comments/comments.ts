import { OnInit, Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Messages } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.html',
  styleUrls: ['./comments.scss'],
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  form: FormGroup;
  message: Messages;
  date: Date;

  @Output() messageToEmit = new EventEmitter<any>();
  @Input() auth = '';
 

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      message: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(80),
      ]),
    });
  }

  processForm() {
    if (this.form.invalid) {
      return;
    }
    const data = {
      author: this.name,
      email: localStorage.getItem('email'),
      message: this.message,
      date: new Date(),
    };
    this.messageToEmit.emit(data);

    const message: Messages = {
      message: this.form.value.message,
    };
    this.form.reset();
  }
}
