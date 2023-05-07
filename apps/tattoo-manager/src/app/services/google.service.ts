import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GoogleService {
  public client!: any;
  public access_token!: string;

  constructor(private http: HttpClient) {}

  public initClient() {
    // @ts-ignore
    console.log(google);
    // @ts-ignore
    this.client = google.accounts.oauth2.initTokenClient({
      client_id:
        '983930191842-hpcrf4ec9h5pdc6l6vdjn69omsfdpjmk.apps.googleusercontent.com',
      scope:
        'https://www.googleapis.com/auth/spreadsheets',
      callback: (tokenResponse: { access_token: string }) => {
        this.access_token = tokenResponse.access_token;
      },
    });
  }

  public getToken(): void {
    this.client.requestAccessToken();
  }

  public revokeToken() {
    // @ts-ignore
    google.accounts.oauth2.revoke(this.access_token, () => {
      console.log('access token revoked');
    });
  }

  public loadSheet(): Observable<any> {
    // @ts-ignore
    console.log(google.accounts.oauth2);
    const headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${this.access_token}`);
    return this.http.get(
      'https://sheets.googleapis.com/v4/spreadsheets/16VkFH-YVB0iSkebBJmQVeFwzBnN7uHk4AWpw-j5D2TY/values/Characters?key=AIzaSyBnwNPwEzCYoFvVzsox74DQ_RrJj1KVyQY',
      {
        headers,
      }
    );
  }

  public addNewValue() {
    console.log(this.access_token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.access_token}`,
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
