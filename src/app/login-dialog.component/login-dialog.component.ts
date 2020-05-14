import { Component, OnInit, NgModule, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { PostsService } from '../shared/posts.service';
import { Post, CommentBlock } from '../shared/interfaces';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
@NgModule({
  imports: [ReactiveFormsModule, FormGroup, FormsModule, Validators],
})
export class LoginDialogComponent implements OnInit {
  @Input() showButton = false;
  @Input() buttonText = '';
  @Input() showLink = false;
  form: FormGroup;
  submitted = false;
  message: string;
  closeResult: string;
  modalOptions: NgbModalOptions;

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Пожалуйста, введите данные';
      } else if (params['authFailed']) {
        this.message = 'Сессия истекла. Введите данные заного';
      }
    });
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.login(user).subscribe(
      () => {
        this.modalService.dismissAll();
        this.form.reset();

        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }
  open(modalRef: any) {
    this.modalService.open(modalRef, this.modalOptions).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
