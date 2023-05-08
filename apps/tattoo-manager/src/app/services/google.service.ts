import { Injectable } from '@angular/core';

@Injectable()
export class GoogleService {
  public client!: any;
  public access_token!: string;

  public initClient() {
    // @ts-ignore
    this.client = google.accounts.oauth2.initTokenClient({
      client_id:
        '983930191842-hpcrf4ec9h5pdc6l6vdjn69omsfdpjmk.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/spreadsheets',
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
}
