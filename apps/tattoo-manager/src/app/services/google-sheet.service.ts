import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GoogleService } from './google.service';
import { GoogleSheetMapper } from './google-sheet.mapper';
import { ExcelResponse } from '@tattoo-manager/shared/interfaces/common.interfaces';

@Injectable()
export class GoogleSheetService {
  private readonly http = inject(HttpClient);
  private readonly googleService = inject(GoogleService);

  public loadSheet(): Observable<Record<string, string>[]> {
    return this.http
      .get<ExcelResponse>(
        'https://sheets.googleapis.com/v4/spreadsheets/16VkFH-YVB0iSkebBJmQVeFwzBnN7uHk4AWpw-j5D2TY/values/Characters?key=AIzaSyBnwNPwEzCYoFvVzsox74DQ_RrJj1KVyQY'
      )
      .pipe(
        map((data: ExcelResponse) => GoogleSheetMapper.getExcelDataMap(data))
      );
  }

  public addNewValue(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.googleService.access_token}`,
      Accept: 'application/json',
    });

    return this.http.post(
      'https://sheets.googleapis.com/v4/spreadsheets/16VkFH-YVB0iSkebBJmQVeFwzBnN7uHk4AWpw-j5D2TY/values/Characters:append?valueInputOption=RAW',
      {
        values: [['asdfasdf']],
      },
      {
        headers: headers,
      }
    );
  }
}
