import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';  

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    public translate: TranslateService
  ) {
  }
  
  changeLang(language: string) {  
    localStorage.setItem('locale', language);  
    this.translate.use(language);  }

  

  ngOnInit() {
  }

}
