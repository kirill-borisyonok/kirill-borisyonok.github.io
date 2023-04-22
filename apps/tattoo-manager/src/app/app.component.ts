import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopPanelComponent } from '@tattoo-manager/shared/ui-components/top-panel/top-panel.component';
@Component({
  standalone: true,
  imports: [RouterModule, TopPanelComponent],
  selector: 'tattoo-manager-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
