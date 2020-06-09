import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostComponent } from '../shared/components/post/post.component';
import { PostPageComponent } from '../post-page/post-page.component';

describe('Postpage component', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent, PostPageComponent],
      imports: [
        TranslateModule.forRoot(),
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
    });

    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
  });
  it('should create post page component', () => {
    expect(component).toBeDefined();
  });
});
