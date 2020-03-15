import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts.service';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  noPostMessage: string = "Loading posts";
  posts$: Subscription;
  dSub: Subscription;
  posts: Post[] = [];
  searchStr = '';
  titlePost : string;  
  closeResult: string;
  modalOptions:NgbModalOptions;
  postid: string;
 


  constructor(  
    private modalService: NgbModal,
    private postsService: PostsService,
    private alert: AlertService,
    public translate: TranslateService) {  

      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }

    translate.addLangs(['en', 'ru']);  
    if (localStorage.getItem('locale')) {  
      const browserLang = localStorage.getItem('locale');  
      translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');  
    } else {  
      localStorage.setItem('locale', 'en');  
      translate.setDefaultLang('en');  
    }  
  }  
  ngOnInit() {
    const target = this;
    this.posts$ = this.postsService.getAll()
      .subscribe(posts => {
        {
          if (posts === null) {
            target.noPostMessage = "No post created"
          } else {
            target.posts = posts;
          }
        
        };
      })
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(this.postid).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.modalService.dismissAll()
      this.alert.warning('Пост был удален')
      if (this.posts.length === 0) {
        this.noPostMessage = "No post created"
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
  open(post,content) {
    console.log(post)
    this.postid = post.id;
    this.titlePost = post.title;
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}
