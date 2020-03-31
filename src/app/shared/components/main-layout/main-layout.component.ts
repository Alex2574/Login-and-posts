import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/admin/shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  constructor(public auth: AuthService, public translate: TranslateService) {}
  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
  }
  changeLang(language: string) {
    localStorage.setItem('locale', language);
    this.translate.use(language);
  }

  ngOnInit() {}
}
