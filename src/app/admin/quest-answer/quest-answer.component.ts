import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Questionnaire } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { QuestService } from 'src/app/questionnaire/questservice';

@Component({
  selector: 'app-quest-answer',
  templateUrl: './quest-answer.component.html',
  styleUrls: ['./quest-answer.component.scss'],
})
export class QuestAnswerComponent implements OnInit {
  private questionnairesSub$: Subscription;
  questionnaires: Questionnaire[] = [];
  searchStr = '';
  noPostMessage = 'Loading questionnaire answers';

  constructor(private http: HttpClient, private questService: QuestService) {}

  ngOnInit() {
    this.questionnairesSub$ = this.questService
      .getAll()
      .subscribe((questionnaires) => {
        if (questionnaires === null) {
          this.noPostMessage = 'No questionnaire filled yet.';
        } else {
          this.questionnaires = questionnaires;
        }
      });
  }
}
