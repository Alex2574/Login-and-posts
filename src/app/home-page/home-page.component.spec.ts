import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomePageComponent } from './home-page.component';
import { PostComponent } from '../shared/components/post/post.component';
import { PostsService } from '../shared/posts.service';
import { of } from 'rxjs';

describe('Homepage component', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let postsService: PostsService;
  const postMock = [
    {
      author: 'Mikro',
      comments: [],
      date: 'Wed Mar 25 2020 10:23:08',
      id: '-M3FmQy1BjEM9069EZv_',
      text: 'fake text',
      title: 'fake title',
      updateTime: '2020-04-13T12:12:44.435Z',
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent, PostComponent],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [PostsService],
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    postsService = TestBed.get(PostsService);
  });
  it('should create home component', () => {
    expect(component).toBeDefined();
  });
  it('should display "no post created"', () => {
    spyOn(postsService, 'getAll').and.returnValue(of(null));
    component.ngOnInit();
    expect(component.noPostMessage).toBe('No post created');
  });
  it('should get posts', () => {
    spyOn(postsService, 'getAll').and.returnValue(of(postMock as any));
    component.ngOnInit();
    expect(component.posts).toBe(postMock as any);
  });
});
