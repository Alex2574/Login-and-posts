import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts.service';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  nopost: string = "Loading posts";
  posts$: Subscription;
  dSub: Subscription;
  posts: Post[] = [];
  searchStr = '';

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {     
  }

  ngOnInit() {
    const target = this;
    this.posts$ = this.postsService.getAll()
      .subscribe(posts => {

        setTimeout(function () {
          if (posts === null) {
            target.nopost = "No post created"
          } else {
            target.posts = posts;
          
          }
          console.log('hide');
        }, 2000);

      })
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.warning('Пост был удален')
      if (this.posts.length === 0) {
        this.nopost = "No post created"
      } 
    
    })
  }

  ngOnDestroy() {
    if (this.posts$) {
       this.posts$.unsubscribe()
    }

    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}
