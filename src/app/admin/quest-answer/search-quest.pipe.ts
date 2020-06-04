import { Pipe, PipeTransform } from '@angular/core';
import { Questionnaire } from '../../shared/interfaces';

@Pipe({
  name: 'searchQuestionnaire',
})

export class SearchQuestPipe implements PipeTransform {
  transform(questionnaires: Questionnaire[], search = ''): Questionnaire[] {
    if (!search.trim()) {
      return questionnaires;
    }

    return questionnaires.filter((questionnaire) => {
      return questionnaire.email.toLowerCase().includes(search.toLowerCase());
    });
  }
}


