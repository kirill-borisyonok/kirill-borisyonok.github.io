import { Injectable } from '@angular/core';

@Injectable()
export class GoogleService {
  public client: any;
  public access_token: any;

  public initClient() {
    // @ts-ignore
    this.client = google.accounts.oauth2.initTokenClient({
      client_id:
        '983930191842-hpcrf4ec9h5pdc6l6vdjn69omsfdpjmk.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      callback: (tokenResponse: { access_token: any }) => {
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

  public loadCalendar() {
    console.log(this.access_token);
    // @ts-ignore
    console.log(google.accounts.oauth2);
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'https://sheets.googleapis.com/v4/spreadsheets/16VkFH-YVB0iSkebBJmQVeFwzBnN7uHk4AWpw-j5D2TY/values/Characters'
    );
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
    xhr.send();
  }
}
