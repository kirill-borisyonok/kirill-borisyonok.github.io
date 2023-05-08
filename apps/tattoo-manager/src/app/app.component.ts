import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopPanelComponent } from '@tattoo-manager/shared/ui-components/top-panel/top-panel.component';
import { GoogleService } from './services/google.service';

@Component({
  standalone: true,
  imports: [RouterModule, TopPanelComponent, HttpClientModule],
  selector: 'tattoo-manager-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GoogleService],
})
export class AppComponent {}
