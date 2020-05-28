import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AlertComponent } from '../admin/shared/components/alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    QuillModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [HttpClientModule, QuillModule, TranslateModule, AlertComponent],
})
export class SharedModule {}
