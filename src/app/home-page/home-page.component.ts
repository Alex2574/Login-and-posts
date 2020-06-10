import { Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/posts.service';
import { Subscription } from 'rxjs';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  posts$: Subscription;
  posts: Post[] = [];
  noPostMessage: string = 'Loading posts';

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.posts$ = this.postsService
      .getAll()
      .subscribe((posts) => {
        if (posts === null) {
          this.noPostMessage = 'No post created';
        } else {
          this.posts = posts;
        }
        console.log('hide');
      });
  }
}
