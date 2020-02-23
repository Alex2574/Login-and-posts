import { Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/posts.service';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../shared/interfaces';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$: Subscription;
  posts: Post[] = [];
  nopost: string = "Loading posts"


  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    const target = this;
    this.posts$ = this.postsService.getAll()
    //Repaired error - when posts not created,and returned null.Now show, what no post are created
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

}