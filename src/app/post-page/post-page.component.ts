import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormsModule } from '@angular/forms';
import { PostsService } from '../shared/posts.service';
import { Subscription, from } from 'rxjs';
import { Post, CommentBlock, Questionnaire } from '../shared/interfaces';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { QuestService } from 'src/app/questionnaire/questservice';
import { AlertService } from '../admin/shared/services/alert.service';

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
  questionnaire$: Subscription;
  questionnaire: Questionnaire[] = [];

  constructor(
    private router: Router,
    public auth: AuthService,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private questService: QuestService,
    private alert: AlertService
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

  ngOnInit() {}

  getMessage(msg: CommentBlock) {
    if (msg !== undefined) {
      this.commentsInfo.push(msg);
      this.post.comments = this.commentsInfo;
      this.postsService.update(this.post).subscribe(() => {
        console.log('done');
      });
    }
  }

  getQuestionnaire() {
    this.questionnaire$ = this.questService
      .getAll()
      .subscribe((questionnaires) => {
        let questData = [];
        if (questionnaires) {
          questData = questionnaires;
        }
        const isEmailExists = questData.find(
          (questionnaire) =>
            questionnaire.email === localStorage.getItem('email')
        );
        if (isEmailExists) {
          this.alert.danger('You filled questionnaire already');
        } else {
          this.router.navigate(['/questionnaire']);
        }
      });
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
}
