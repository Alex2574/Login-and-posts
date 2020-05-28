import { HttpClient } from '@angular/common/http';
import { Questionnaire, FbCreateResponse } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Injectable, Input } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class QuestService {

  constructor(private http: HttpClient) {}

  create(questionnaire: Questionnaire): Observable<Questionnaire> {
    return this.http
      .post(`${environment.fbDbUrl}/questionnaire.json`, questionnaire)
      .pipe(
        map((response: FbCreateResponse) => {
          return {
            ...questionnaire,
            id: response.name,
            date: new Date(questionnaire.date),
          };
        })
      );
  }
  getAll(): Observable<Questionnaire[]> {
    return this.http.get(`${environment.fbDbUrl}/questionnaire.json`).pipe(
      map((response: { [key: string]: any }) => {
        return response
          ? Object.keys(response).map((key) => ({
              ...response[key],
              id: key,
              date: new Date(response[key].date),
            }))
          : null;
      })
    );
  }
}

