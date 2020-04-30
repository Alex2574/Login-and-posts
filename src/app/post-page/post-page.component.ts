import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { PostsService } from '../shared/posts.service';
import { Subscription } from 'rxjs';
import { Post, CommentBlock } from '../shared/interfaces';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
@NgModule({
  imports: [ReactiveFormsModule, FormGroup, FormsModule, Validators],
})
export class PostPageComponent implements OnInit {
  form: FormGroup;
  post: Post;
  submitted = false;
  message: string;
  searchStr = '';
  posts: Post[] = [];
  msg: CommentBlock;
  comments: Post[];
  closeResult: string;
  modalOptions: NgbModalOptions;
  post$: Subscription;
  commentsInfo: CommentBlock[] = [];
  private showCommentCount: boolean;
  private showCommentLess: boolean;
  amount = 5;
  less = 6;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private postsService: PostsService
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };

    this.post$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params.id);
        })
      )
      .subscribe((postData) => {
        if (postData) {
          this.post = postData;
          if (this.post.comments !== undefined) {
            this.commentsInfo = this.post.comments;
          }
        }
      });
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
  getMessage(msg: CommentBlock) {
    if (msg !== undefined) {
      this.commentsInfo.push(msg);
      this.post.comments = this.commentsInfo;
      this.postsService.update(this.post).subscribe(() => {
        console.log('done');
      });
    }
  }
  btnShowCommentCount() {
    if (this.commentsInfo.length > 5) {
      this.showCommentCount = !this.showCommentCount;
      this.amount = this.commentsInfo.length;
    }
  }

  btnShowCommentLess() {
    if (this.commentsInfo.length > 6) {
      this.showCommentLess = !this.showCommentLess;
      this.amount = 5;
    }
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
