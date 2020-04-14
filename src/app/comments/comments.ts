import { OnInit, Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/shared/posts.service';
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

  @Output() messageToEmit = new EventEmitter<any>();
  @Input() auth = '';

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      message: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(80),
      ]),
    });
    this.form.get('message').valueChanges.subscribe((messageValue) => { });
  }

  processForm() {
    const data = {
      author: this.name,
      email: localStorage.getItem('email'),
      message: this.message,
    };
    this.messageToEmit.emit(data);

    if (this.form.invalid) {
      return;
    }

    const message: Messages = {
      message: this.form.value.message,
    };
    this.form.reset();
  }
}
