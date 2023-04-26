import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopPanelComponent } from '@tattoo-manager/shared/ui-components/top-panel/top-panel.component';
import { API_KEY, GoogleSheetsDbService } from 'ng-google-sheets-db';
@Component({
  standalone: true,
  imports: [RouterModule, TopPanelComponent, HttpClientModule],
  selector: 'tattoo-manager-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: API_KEY,
      useValue: 'AIzaSyBnwNPwEzCYoFvVzsox74DQ_RrJj1KVyQY',
    },
    GoogleSheetsDbService,
  ],
})
export class AppComponent {}
